import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <main id="login" className="container px-4 mx-auto">
      <h1 className="font-bold text-5xl text-center my-10">Login</h1>
      <LoginForm />
    </main>
  );
}
