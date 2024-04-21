import Link from "next/link";

function PostCategories() {
  return (
    <div className="flex flex-row justify-evenly bg-[url('/images/OIHEDB0-2.jpg')] p-12">
      <Link
        href="/category/income-expense"
        id="income-expense"
        className="rounded-lg py-10 w-1/12 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        دخل و خرج
      </Link>
      <Link
        href="/category/hygiene"
        id="hygiene"
        className="rounded-2xl py-10 w-1/12 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        بهداشت
      </Link>
      <Link
        href="/category/recreation"
        id="recreation"
        className="rounded-2xl py-10 w-1/12 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        تفریح
      </Link>
      <Link
        href="/category/sport"
        id="sport"
        className="rounded-2xl py-10 w-1/12 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        ورزش
      </Link>
      <Link
        href="/category/nutrition"
        id="nutrition"
        className="rounded-2xl py-10 w-1/12 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        تغذیه
      </Link>
      <Link
        href="/category/prayer"
        id="prayer"
        className="rounded-2xl py-10 w-1/12 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        نیایش
      </Link>
      <Link
        href="/category/communication"
        id="communication"
        className="rounded-2xl py-10 w-1/12 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        ارتباطات
      </Link>
      <Link
        href="/category/thought"
        id="thought"
        className="rounded-2xl py-10 w-1/12 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        اندیشه
      </Link>
    </div>
  );
}

export default PostCategories;
