import Link from "next/link";

export default function AdminMenu(){
    return(
        <div className="flex flex-col gap-2 w-full">
        <Link
          href={`/dashboard/pages`}
          className="text-center rounded bg-gray-100 hover:bg-gray-200 p-1"
        >
          مدیریت صفحات
        </Link>
        <Link
          href={`/dashboard/posts`}
          className="text-center rounded bg-gray-100 hover:bg-gray-200 p-1"
        >
          مدیریت پست‌ها
        </Link>
        <Link
          href={`/dashboard/radio`}
          className="text-center rounded bg-gray-100 hover:bg-gray-200 p-1"
        >
          مدیریت رادیو
        </Link>
        <Link
          href={`/dashboard/bookshelf`}
          className="text-center rounded bg-gray-100 hover:bg-gray-200 p-1"
        >
          مدیریت قفسه
        </Link>
        <Link
          href={`/dashboard/change-password`}
          className="text-center rounded bg-gray-100 hover:bg-gray-200 p-1"
        >
          تغییر رمز عبور
        </Link>
      </div>
    )
}