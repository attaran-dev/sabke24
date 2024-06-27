import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignupForm() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (password !== repeatPassword) {
      toast.error("تکرار رمز عبور و رمز عبور تفاوت دارد");
      return;
    }

    axios
      .post("/api/auth/register", { username, password, email })
      .then((response) => toast.success(response.data.message))
      .catch((error) => toast.error(error.response.data.message));
      setTimeout(() => {
        router.replace("/dashboard");
      }, 2000);
      return
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col border-8 p-8 rounded-2xl w-1/3 mx-auto gap-4 mt-8">
      <label htmlFor="username">نام کاربری</label>
      <input
        type="username"
        name="username"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} className="border-4 border-teal-600 rounded p-2 focus:border-black"
      />
      <label htmlFor="email">ایمیل</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} className="border-4 border-teal-600 rounded p-2 focus:border-black"
      />
      <label htmlFor="password">رمز عبور</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} className="border-4 border-teal-600 rounded p-2 focus:border-black"
      />
      <label htmlFor="repeatPassword">تکرار رمز عبور</label>
      <input
        type="password"
        name="repeatPassword"
        id="repeatPassword"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)} className="border-4 border-teal-600 rounded p-2 focus:border-black"
      />
      <button className="bg-teal-600 font-black rounded w-fit mx-auto p-2 text-white my-4">ثبت نام</button>
      <p className="text-center text-sm">قبلاً ثبت نام کرده‌اید؟ از <Link href={'/login'} className="underline decoration-teal-600 decoration-4 underline-offset-8 decoration-dotted">اینجا</Link> وارد شوید.</p>
    </form>
  );
}

export default SignupForm;
