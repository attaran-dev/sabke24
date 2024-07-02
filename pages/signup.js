import SignupForm from "@/components/forms/signup-form/signup-form";
import Head from "next/head";

export default function Signup() {
    return (
      <div>
        <Head>
          <title>ثبت نام</title>
        </Head>
        <SignupForm />
      </div>
    );
  }
