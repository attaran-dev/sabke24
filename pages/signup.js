import SignupForm from "@/components/forms/signup-form/signup-form";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "unauthenticated") {
    router.replace("/");
    return;
  }

  if (status === "authenticated") {
    return (
      <div>
        <Head>
          <title>ثبت نام</title>
        </Head>
        <SignupForm />
      </div>
    );
  }
}
