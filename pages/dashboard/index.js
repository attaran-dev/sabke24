import { useSession, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import GeneralContext from "@/context/GeneralContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { connectToDatabase } from "@/utils/db";
import AdminMenu from "@/components/menu/admin-dashboard-menu";
import UserMenu from "@/components/menu/user-dashboard-menu";

export default function Dashboard({user}) {
  const { data:session, status } = useSession();
  const { generalContext, setGeneralContext } = useContext(GeneralContext);
  const router = useRouter();

  useEffect(()=>{

    if (status === "loading") {
    return <div>در حال احراز هویت ...</div>;
  }
  if (status === "unauthenticated") {
    setGeneralContext({
      ...generalContext,
      user: null,
    });
   return router.replace("/");
    
  }

    if (status === "authenticated" && !generalContext.user) {
      setGeneralContext({
        ...generalContext,
        user: user,
      });
    }
  }, [generalContext, setGeneralContext,user,status, router])


  const {username, email, isActive, role, creationDate, cart, comments, counsels, favorites, tickets} = user;
  return (
    <div className="my-12 flex flex-col gap-6">
      
          <div className="m-auto rounded bg-gray-200 p-1 inline-block">
            <h1>داشبورد</h1>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col items-center justify-between gap-6 m-2 p-4">
              
            {isActive && role === "admin" && (
<AdminMenu />)}
{isActive && role === "user" && (
  <UserMenu />)}
            <div className="flex flex-col gap-4 items-start justify-center">
              <h2 className="text-teal-800">مشخصات حساب کاربری</h2>
              <h3 className="text-sm text-teal-800 self-start">نام کاربری:</h3>
              <div className="text-sm">{username}</div>
              <h3 className="text-sm text-teal-800 self-start">ایمیل:</h3>
              <div className="text-sm">{email}</div>
              <button
                onClick={() => signOut()}
                className="bg-red-400 rounded p-1 text-white self-center w-full"
              >
                خروج
              </button>
            </div>
            </div>
            <div className="flex-1 flex flex-row justify-center items-start gap-4 p-8">
              {!isActive &&
              (<div>
                حساب کاربری شما هنوز فعال نشده است. برای فعال‌سازی روی لینک فعال‌سازی ارسال‌شده به ایمیلتان کلیک کنید. 
              </div>)
              }

<div className="flex flex-col flex-1 justify-start items-center border-2 rounded h-full p-4 gap-4" dir="rtl">
  <h4 className="text-sm text-white p-2 rounded bg-teal-800">
آخرین نظرات شما  </h4>
<div>
{comments.length === 0 &&
<p>هنوز نظری نداده‌اید.</p>
}
</div>
</div>
<div className="flex flex-col flex-1 justify-start items-center border-2 rounded h-full p-4 gap-4">
<h4 className="text-sm text-white p-2 rounded bg-teal-800">آخرین مشاوره‌های شما</h4>
<div>
{counsels.length === 0 &&
<p>هنوز مشاوره‌ای برای شما ثبت نشده است.</p>
}
</div>
</div>
{/* <div className="flex flex-col">
<h4>آخرین تیکت‌ها</h4>
<div>
  
</div>
</div> */}

            </div>
          </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions
  );
  console.log(`session: ${session}`)
  const client = await connectToDatabase();
  const db = client.db();
  const user = await db.collection("users").findOne({ email: session?.user.email });
  console.log(`user: ${user}`)
  client.close();

  return {
    props: {
      user: JSON.parse(JSON.stringify(user))
    },
  }
}