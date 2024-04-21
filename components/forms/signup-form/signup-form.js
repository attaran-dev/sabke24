import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function SignupForm() {
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
      .post("/api/auth/signup", { username, password, email })
      .then((response) => toast.success(response.data.message))
      .catch((error) => toast.error(error.response.data.message));
      setTimeout(() => {
        router.replace("/dashboard");
      }, 2000);
      return
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col border-8 p-8 rounded-2xl w-1/3 m-auto gap-4">
      <label htmlFor="username">نام کاربری</label>
      <input
        type="username"
        name="username"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} className="border-4 rounded p-2 focus:border-black"
      />
      <label htmlFor="email">ایمیل</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} className="border-4 rounded p-2 focus:border-black"
      />
      <label htmlFor="password">رمز عبور</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} className="border-4 rounded p-2 focus:border-black"
      />
      <label htmlFor="repeatPassword">تکرار رمز عبور</label>
      <input
        type="password"
        name="repeatPassword"
        id="repeatPassword"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)} className="border-4 rounded p-2 focus:border-black"
      />
      <button>ثبت نام</button>
    </form>
  );
}

export default SignupForm;
