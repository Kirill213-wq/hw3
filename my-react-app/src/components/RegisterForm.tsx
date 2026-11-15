import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../api/baseApi.ts";

type RegisterValues = {
  email: string;
  password: string;
};

export function RegisterForm() {
  const { register, handleSubmit, reset } = useForm<RegisterValues>();
  const [registerUser] = useRegisterMutation();

  async function onSubmit(data: RegisterValues) {
    const result = await registerUser(data);

    if (result.data) {
      alert(`Користувач ${result.data.email} зареєструвався!`);
      reset();
    } else {
      const error = result.error as { data?: { error?: string } };
      alert(`Помилка реєстрації: ${error?.data?.error ?? "щось пішло не так"}`);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Реєстрація</h3>
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
      <button>Зареєструватися</button>
    </form>
  );
}