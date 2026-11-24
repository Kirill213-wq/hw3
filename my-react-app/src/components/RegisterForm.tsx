
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../api/baseApi.ts";

type RegisterValues = {
  email: string;
  password: string;
};

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<RegisterValues>({
    mode: "onChange",
  });

  const [registerUser] = useRegisterMutation();

  async function onSubmit(data: RegisterValues) {
    try {
      const result = await registerUser(data).unwrap();

      alert(`Користувач ${result.email} зареєструвався!`);
      reset();
    } catch (error) {
      const serverError = error as {
        status?: number;
        data?: { error?: string; message?: string };
      };

      if (serverError.status === 409) {
        setError("email", {
          type: "server",
          message: "Ця електронна пошта вже зайнята",
        });
      } else {
        setError("root", {
          type: "server",
          message:
            serverError.data?.error ??
            serverError.data?.message ??
            "Не вдалося зареєструватися",
        });
      }
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Реєстрація</h3>

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

      <button type="submit">Зареєструватися</button>
    </form>
  );
}
