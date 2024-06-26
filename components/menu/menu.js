import Link from "next/link";

export default function Menu() {
  return (
    <div
      className="w-60 p-4 rounded-lg backdrop-blur-md font-semibold hidden md:block"
      id="menu"
    >
      <div className="flex flex-col gap-6 text-lg text-center text-[#6d5946] py-12 px-4 rounded-lg border-white border-4">
        <Link href={"/"} className="text-center text-3xl font-black">
          سبک ۲۴
        </Link>
        <div className="flex flex-col gap-3">
          <Link href="/blog">وبلاگ</Link>
          <Link href="/recommendations">معرفی دیگران</Link>
          <Link href="/radio">رادیو</Link>
          <Link href="/bookshelf">قفسهٔ کتاب</Link>
          <Link href="/about">در مورد این‌جا</Link>
        </div>
      </div>
    </div>
  );
}
