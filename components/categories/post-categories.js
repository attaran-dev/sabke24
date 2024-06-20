import Link from "next/link";

function PostCategories() {
  return (
    <div className="bg-[url('/images/blue-oil-paint-strokes-textured-background-low-saturation.jpg')] bg-cover bg-center
    grid grid-cols-2 gap-y-8 gap-x-16 p-10
    md:grid md:grid-cols-4 md:gap-12 md:p-12
     xl:flex xl:flex-row xl:justify-evenly xl:p-12">
      <Link
        href="/category/income"
        id="income"
        className="flex items-center justify-center rounded-2xl xl:py-10 xl:w-1/12 p-6 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        مدیریت درآمد
      </Link>
      <Link
        href="/category/expense"
        id="expense"
        className="flex items-center justify-center rounded-2xl xl:py-10 xl:w-1/12 p-6 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        مدیریت هزینه
      </Link>
      <Link
        href="/category/hygiene"
        id="hygiene"
        className="flex items-center justify-center rounded-2xl xl:py-10 xl:w-1/12 p-6 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        مدیریت بهداشت
      </Link>
      <Link
        href="/category/recreation"
        id="recreation"
        className="flex items-center justify-center rounded-2xl xl:py-10 xl:w-1/12 p-6 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        مدیریت تفریح
      </Link>
      <Link
        href="/category/sport"
        id="sport"
        className="flex items-center justify-center rounded-2xl xl:py-10 xl:w-1/12 p-6 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        مدیریت ورزش
      </Link>
      <Link
        href="/category/nutrition"
        id="nutrition"
        className="flex items-center justify-center rounded-2xl xl:py-10 xl:w-1/12 p-6 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        مدیریت تغذیه
      </Link>
      <Link
        href="/category/prayer"
        id="prayer"
        className="flex items-center justify-center rounded-2xl xl:py-10 xl:w-1/12 p-6 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        مدیریت نیایش
      </Link>
      <Link
        href="/category/communication"
        id="communication"
        className="flex items-center justify-center rounded-2xl xl:py-10 xl:w-1/12 p-6 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
       مدیریت ارتباطات
      </Link>
      <Link
        href="/category/thought"
        id="thought"
        className="flex items-center justify-center rounded-2xl xl:py-10 xl:w-1/12 p-6 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        مدیریت اندیشه
      </Link>
      <Link
        href="/category/sleep"
        id="sleep"
        className="flex items-center justify-center rounded-2xl xl:py-10 xl:w-1/12 p-6 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        مدیریت خواب
      </Link>
    </div>
  );
}

export default PostCategories;
