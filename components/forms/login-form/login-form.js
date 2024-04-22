import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log("email:", email);
    // console.log("password:", password);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });
      if (result.error) {
        toast.error("نام کاربری یا رمز عبور اشتباه است");
        return;
      }
      router.replace("/dashboard");
    } catch (error) {
      // console.log(error);
    }
  }

  return (
    <form
      className="flex flex-col border-8 p-8 rounded-2xl lg:w-1/3 md:w-2/3 m-auto gap-4  "
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="text-right">
        ایمیل
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-4 rounded p-2 focus:border-black"
      />
      <label htmlFor="password" className="text-right">
        رمز عبور
      </label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-4 rounded p-2 focus:border-black"
      />
      <button className="rounded p-4 my-3 bg-gray-200">ورود</button>
    </form>
  );
}

export default LoginForm;
