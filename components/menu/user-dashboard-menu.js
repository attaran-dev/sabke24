import Link from "next/link";

export default function UserMenu(){
    return(
        <div className="flex flex-col gap-2 ">
        <Link
          href={`/dashboard/consultaion`}
          className="text-center rounded bg-gray-100 hover:bg-gray-200 p-1"
        >
          مشاوره
        </Link>
        <Link
          href={`/dashboard/comments`}
          className="text-center rounded bg-gray-100 hover:bg-gray-200 p-1"
        >
            نظرات
        </Link>
        {/* <Link
          href={`/dashboard/favorites`}
          className="text-center rounded bg-gray-100 hover:bg-gray-200 p-1"
        >
        مطالب مورد علاقه
        </Link>
        <Link
          href={`/dashboard/tickets`}
          className="text-center rounded bg-gray-100 hover:bg-gray-200 p-1"
        >
         تیکت‌ها
        </Link> */}
        <Link
          href={`/dashboard/change-password`}
          className="text-center rounded bg-gray-100 hover:bg-gray-200 p-1"
        >
          تغییر رمز عبور
        </Link>
      </div>
    )
}