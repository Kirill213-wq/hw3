import { useForm } from "react-hook-form";
import { useLoginMutation } from "../api/baseApi.ts";

type LoginValues = {
  email: string;
  password: string;
};

export function LoginForm() {
  const { register, handleSubmit, reset } = useForm<LoginValues>();
  const [loginUser] = useLoginMutation();

  async function onSubmit(data: LoginValues) {
    const result = await loginUser(data);

    if (result.data) {
      alert(`Користувач ${result.data.email} авторизувався!`);
      reset();
    } else {
      const error = result.error as { data?: { error?: string } };
      alert(`Помилка авторизації: ${error?.data?.error ?? "щось пішло не так"}`);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Авторизація</h3>
      <input
        type="email"
        placeholder="Електронна пошта"
        required
        {...register("email")}
      />
      <input
        type="password"
        placeholder="Пароль"
        required
        {...register("password")}
      />
      <button>Увійти</button>
    </form>
  );
}