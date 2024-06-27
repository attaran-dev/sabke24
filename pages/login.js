import LoginForm from "@/components/forms/login-form/login-form";
import Head from "next/head";

function Login() {
  return (
    <div>
      <Head>
        <title>ورود</title>
      </Head>
      <LoginForm />
    </div>
  );
}

export default Login;
