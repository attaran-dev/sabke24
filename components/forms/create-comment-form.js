import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function CreateCommentForm({ user, postid }) {
  const router = useRouter()
  const [comment, setComment] = useState("");
  const handleSubmit = (e) =>{
    e.preventDefault()
    axios
    .patch(`/api/comments/${postid}`, { username: user.username, creationDate: Date.now(), comment })
    .then((response) => toast.success(response.data.message))
    .catch((error) => toast.error(error.response.data.message));
    setTimeout(() => {
      router.reload();
    }, 2000);
    return
  }
  return (
    <div
      className="flex flex-col gap-4 items-center h-full bg-white p-4 rounded-lg text-right"
      dir="rtl"
    >
      <h2 className="text-sm text-white p-2 rounded bg-teal-800">ثبت نظر جدید</h2>
      {user && user.isActive && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full h-full">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border rounded [resize:none] p-2 text-sm h-full"
            rows={10}
          />
          <button className="bg-teal-600 text-white p-2 rounded">ثبت</button>
        </form>
      )}
      {user && !user.isActive &&
      <div>
        <p>لطفاً با لینک ارسال‌شده به ایمیلتان حسابتان را فعال کنید. </p>
        </div>
      }
      {!user && (
        <div>
          <p>
            برای ثبت نظر ابتدا باید{" "}
            <Link
              href="/login"
              className="underline decoration-teal-600 decoration-4 underline-offset-8 decoration-dotted"
            >
              وارد
            </Link>{" "}
            شوید.
          </p>
          <p>
            اگر هنوز عضو نشده‌اید، از{" "}
            <Link
              href="/signup"
              className="underline decoration-teal-600 decoration-4 underline-offset-8 decoration-dotted"
            >
              اینجا
            </Link>{" "}
            ثبت نام کنید.
          </p>
        </div>
      )}
    </div>
  );
}
