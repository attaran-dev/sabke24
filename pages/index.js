import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center  bg-[url('/images/night-sky-2.jpg')] bg-cover bg-center">
      <div className="sm:p-20 md:p-32 lg:p-36 rounded-xl">
        <div className=" flex flex-col items-center gap-10 justify-center p-12 bg-white/25 rounded-xl">
          <h1 className="text-6xl sm:text-9xl font-rubik text-white font-semibold">سبک ۲۴</h1>

          <div className="flex flex-row justify-center gap-6">
            <Link
              className="rounded bg-gray-200 p-1 hover:bg-gray-300"
              href={"/blog"}
            >
              وبلاگ
            </Link>
            <Link
              className="rounded bg-gray-200 p-1 hover:bg-gray-300"
              href={"/recommendations"}
            >
              معرفی دیگران
            </Link>
            <Link
              className="rounded bg-gray-200 p-1 hover:bg-gray-300"
              href={"/about"}
            >
              در مورد این‌جا
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
