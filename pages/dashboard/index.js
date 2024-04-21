import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // console.log(session);
  if (status === "loading") {
    return <div>در حال احراز هویت ...</div>;
  }
  if (status === "unauthenticated") {
    router.replace("/");
    return;
  }
  return (
    <div className="my-12 flex flex-col gap-6">
      {session && (
        <>
          <div className="m-auto rounded bg-gray-200 p-1 inline-block">
            <h1>داشبورد</h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex flex-row gap-4">
              <Link
                href={`/dashboard/pages`}
                className="rounded bg-gray-100 hover:bg-gray-200 p-1"
              >
                مدیریت صفحات
              </Link>
              <Link
                href={`/dashboard/posts`}
                className="rounded bg-gray-100 hover:bg-gray-200 p-1"
              >
                مدیریت پست‌ها
              </Link>
              <Link
                href={`/dashboard/change-password`}
                className="rounded bg-gray-100 hover:bg-gray-200 p-1"
              >
                تغییر رمز عبور
              </Link>
            </div>
            <div className="flex flex-col gap-4 items-center justify-center">
              <div>حساب کاربری:</div>
              <div>{session.user.email}</div>
              <button
                onClick={() => signOut()}
                className="bg-red-400 rounded p-1 text-white"
              >
                خروج
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
