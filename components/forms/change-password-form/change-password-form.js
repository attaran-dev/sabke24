import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";

export default function ChangePasswordForm() {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    axios
      .patch("/api/user/change-password", { oldPassword, newPassword })
      .then((response) => toast.success(response.data.message))
      .catch((error) => toast.error(error.response.data.message));
      setTimeout(() => {
        router.replace("/dashboard");
      }, 2000);
      return
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col border-8 p-8 rounded-2xl lg:w-1/3 md:w-2/3 m-auto gap-4">
      <label htmlFor="oldPass">رمز عبور قبلی</label>
      <input type="password" id="oldPass" ref={oldPasswordRef} className="border-4 rounded p-2 focus:border-black"/>
      <label htmlFor="newPass">رمز عبور جدید</label>
      <input type="password" id="newPass" ref={newPasswordRef} className="border-4 rounded p-2 focus:border-black"/>
      <button>تغییر رمز</button>
    </form>
  );
}
