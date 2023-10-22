import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <main id="register" className="mb-20 container px-4 mx-auto">
      <h1 className="font-bold text-5xl text-center my-10">Register</h1>
      <RegisterForm />
    </main>
  );
}
