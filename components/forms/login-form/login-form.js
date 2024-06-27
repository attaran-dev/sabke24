import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";

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
      className="flex flex-col border-8 p-8 rounded-2xl lg:w-1/3 md:w-2/3 mx-auto gap-4 mt-8 "
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
        className="border-4 border-teal-600 rounded p-2 focus:border-black"
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
        className="border-4 border-teal-600 rounded p-2 focus:border-black"
      />
      <button className="bg-teal-600 font-black rounded w-fit mx-auto p-2 text-white my-4">ورود</button>
      <p className="text-center text-sm">هنوز ثبت نام نکرده‌اید؟ از <Link href={'/signup'} className="underline decoration-teal-600 decoration-4 underline-offset-8 decoration-dotted">اینجا</Link> ثبت نام کنید.</p>
    </form>
  );
}

export default LoginForm;
