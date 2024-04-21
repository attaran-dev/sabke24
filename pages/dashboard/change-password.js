import ChangePasswordForm from "@/components/forms/change-password-form/change-password-form";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ChangePassword() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>در حال احراز هویت ...</div>;
  }
  
  if (status === "unauthenticated") {
    router.replace("/");
    return
  }

  return (
    <div className="my-12 flex flex-col justify-center items-center gap-6">
      {session && (
        <>
        <div className="rounded bg-gray-200 p-1">
            <h1>تغییر رمز عبور</h1>
        </div>
          <ChangePasswordForm />
          <Link href={'/dashboard'} className="rounded bg-gray-100 hover:bg-gray-200 p-1">بازگشت به داشبورد</Link>
        </>
      )}
    </div>
  );
}
