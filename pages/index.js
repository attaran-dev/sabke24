import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center gap-10 justify-center">
      <h1 className="text-6xl sm:text-9xl font-lalezar">سبک ۲۴</h1>

      <div className="flex flex-row justify-center gap-6">
        <Link className="rounded bg-gray-200 p-1 hover:bg-gray-300" href={"/blog"}>
          وبلاگ
        </Link>
        <Link className="rounded bg-gray-200 p-1 hover:bg-gray-300" href={"/recommendations"}>
          معرفی دیگران
        </Link>
        <Link className="rounded bg-gray-200 p-1 hover:bg-gray-300" href={"/about"}>
          در مورد این‌جا
        </Link>
      </div>
    </div>
  );
}
