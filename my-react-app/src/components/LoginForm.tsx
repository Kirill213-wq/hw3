
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../api/baseApi.ts";

type LoginValues = {
  email: string;
  password: string;
};

export function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<LoginValues>({
    mode: "onChange",
  });

  const [loginUser] = useLoginMutation();

  async function onSubmit(data: LoginValues) {
    try {
      const result = await loginUser(data).unwrap();

      alert(`Користувач ${result.email} авторизувався!`);
      reset();
    } catch (error) {
      const serverError = error as {
        status?: number | string;
        data?: { error?: string; message?: string };
      };

      if (serverError.status === "FETCH_ERROR") {
        setError("root", {
          type: "network",
          message: "Проблема зі з'єднанням. Спробуйте ще раз.",
        });
        return;
      }

      if (serverError.status === 401) {
        setError("root", {
          type: "server",
          message: "Неправильний email або пароль",
        });
        return;
      }

      setError("root", {
        type: "server",
        message:
          serverError.data?.error ??
          serverError.data?.message ??
          "Помилка сервера при авторизації",
      });
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Авторизація</h3>

      <input
        type="email"
        placeholder="Електронна пошта"
        {...register("email", {
          required: "Введіть електронну пошту",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Некоректна електронна пошта",
          },
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Пароль"
        {...register("password", {
          required: "Введіть пароль",
          minLength: {
            value: 6,
            message: "Пароль повинен містити мінімум 6 символів",
          },
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      {errors.root && <p>{errors.root.message}</p>}

      <button type="submit">Увійти</button>
    </form>
  );
}
