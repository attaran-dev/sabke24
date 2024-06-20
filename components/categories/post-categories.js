import Link from "next/link";

function PostCategories() {
  return (
    <div
      className="bg-[url('/images/blue-oil-paint-strokes-textured-background-low-saturation.jpg')] bg-cover bg-center
    grid grid-cols-2 auto-rows-fr gap-y-8 gap-x-16 p-10
    md:grid md:grid-cols-5 md:gap-12 md:p-12
     "
    >
      <Link
        href="/category/income"
        id="income"
        className="relative rounded-2xl p-6 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        <div className="flex flex-col h-full text-center justify-center items-center gap-2">
          <div>مدیریت درآمد</div>
          <div className="text-sm font-normal">الگوهای نوین درآمدزایی</div>
        </div>
        <div className="absolute -bottom-[20%] right-[6%] text-4xl w-10 h-10 bg-white rounded-full">۱</div>
      </Link>
      <Link
        href="/category/expense"
        id="expense"
        className="relative rounded-2xl p-6 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        <div className="flex flex-col h-full justify-center items-center gap-2">
          <div>مدیریت هزینه</div>
          <div className="text-sm font-normal">شیوه‌های هزینه و مصرف</div>
        </div>
      <div className="absolute -bottom-[20%] right-[6%] text-4xl w-10 h-10 bg-white rounded-full">۲</div>
      </Link>
      <Link
        href="/category/nutrition"
        id="nutrition"
        className="relative rounded-2xl p-6 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        <div className="flex flex-col h-full justify-center items-center gap-2">
          <div>مدیریت تغذیه</div>
          <div className="text-sm font-normal">برنامه‌ها و رژیم‌های غذایی</div>
        </div>
      <div className="absolute -bottom-[20%] right-[6%] text-4xl w-10 h-10 bg-white rounded-full">۳</div>
      </Link>
      <Link
        href="/category/thought"
        id="thought"
        className="relative rounded-2xl p-6 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        <div className="flex flex-col h-full justify-center items-center gap-2">
          <div>مدیریت اندیشه</div>
          <div className="text-sm font-normal">الگوهای فکر و اندیشه</div>
        </div>
      <div className="absolute -bottom-[20%] right-[6%] text-4xl w-10 h-10 bg-white rounded-full">۴</div>
      </Link>
      <Link
        href="/category/prayer"
        id="prayer"
        className="relative rounded-2xl p-6 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        <div className="flex flex-col h-full justify-center items-center gap-2">
          <div>مدیریت نیایش</div>
          <div className="text-sm font-normal">متدهای دعا و نیایش</div>
        </div>
      <div className="absolute -bottom-[20%] right-[6%] text-4xl w-10 h-10 bg-white rounded-full">۵</div>
      </Link>
      <Link
        href="/category/recreation"
        id="recreation"
        className="relative rounded-2xl p-6 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        <div className="flex flex-col h-full justify-center items-center gap-2">
          <div>مدیریت تفریح</div>
          <div className="text-sm font-normal">الگوهای تفریح و بازی</div>
        </div>
      <div className="absolute -bottom-[20%] right-[6%] text-4xl w-10 h-10 bg-white rounded-full">۶</div>
      </Link>
      <Link
        href="/category/sport"
        id="sport"
        className="relative rounded-2xl p-6 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        <div className="flex flex-col h-full justify-center items-center gap-2">
          <div>مدیریت ورزش</div>
          <div className="text-sm font-normal">برنامه‌ها و گونه‌های ورزش</div>
        </div>
      <div className="absolute -bottom-[20%] right-[6%] text-4xl w-10 h-10 bg-white rounded-full">۷</div>
      </Link>
      <Link
        href="/category/hygiene"
        id="hygiene"
        className="relative rounded-2xl p-6 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        <div className="flex flex-col h-full justify-center items-center gap-2">
          <div>مدیریت بهداشت</div>
          <div className="text-sm font-normal">الگوها و برنامه‌های بهداشتی</div>
        </div>
      <div className="absolute -bottom-[20%] right-[6%] text-4xl w-10 h-10 bg-white rounded-full">۸</div>
      </Link>
      <Link
        href="/category/communication"
        id="communication"
        className="relative rounded-2xl p-6 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        <div className="flex flex-col h-full justify-center items-center gap-2">
          <div>مدیریت ارتباطات</div>
          <div className="text-sm font-normal">
            الگوهای ازدواج و مهارت‌های ارتباط
          </div>
        </div>
      <div className="absolute -bottom-[20%] right-[6%] text-4xl w-10 h-10 bg-white rounded-full">۹</div>
      </Link>
      <Link
        href="/category/sleep"
        id="sleep"
        className="relative rounded-2xl p-6 text-center hover:scale-[1.06] backdrop-blur transition duration-100 outline outline-white outline-4 outline-offset-4 font-bold backdrop-brightness-110"
      >
        <div className="flex flex-col h-full justify-center items-center gap-2">
          <div>مدیریت خواب</div>
          <div className="text-sm font-normal">الگوهای خواب و استراحت</div>
        </div>
      <div className="absolute -bottom-[20%] right-[6%] text-4xl w-10 h-10 bg-white rounded-full">۱۰</div>
      </Link>
    </div>
  );
}

export default PostCategories;
