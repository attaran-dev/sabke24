import Link from "next/link";

export default function Menu() {
  return (
    <div
      className="h-full w-60 p-4 rounded-lg backdrop-blur-md font-semibold"
      id="menu"
    >
      <div className="flex flex-col gap-12 text-lg text-center text-amber-900 py-12 px-4 rounded-lg border-white border-4">
        <Link href={"/"} className="text-center text-3xl font-lalezar">
          سبک ۲۴
        </Link>
        <div className="flex flex-col gap-6">
          <Link href="/blog">وبلاگ</Link>
          <Link href="/recommendations">معرفی دیگران</Link>
          <Link href="/about">در مورد این‌جا</Link>
        </div>
      </div>
    </div>
  );
}
