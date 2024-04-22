import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import classes from "./header.module.css";

// export function calHeight(elementSelector) {
//   const element = document.querySelector(elementSelector);
//   const elementHeight = element.offsetHeight;
//   return elementHeight;
// }
// export const headerHeight = headerHeightState;
function Header({ fonts }) {
  //   const [headerHeightState, setHeaderHeightState]= useState("")
  //   useEffect(()=>{
  //   const headerHeight = calHeight("header");
  //   setHeaderHeightState(headerHeight)
  //   }, [headerHeightState])
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <header
      className={`w-full flex justify-center ${fonts} font-noto sticky top-0 z-30 ${
        pathname === "/blog/[postid]" ? "md:hidden" : null
      }`}
    >
      <div className="flex flex-col justify-center items-center py-3 px-6 gap-2 sm:rounded-xl w-screen md:w-fit shadow-2xl bg-white">
        <div>
          <Link className="font-lalezar text-2xl" href="/">
            سبک ۲۴
          </Link>
        </div>
        <div className="flex flex-row-reverse gap-6">
          <Link href="/blog">وبلاگ</Link>

          <Link className={``} href="/recommendations">
            معرفی دیگران
          </Link>

          <Link href="/about">در مورد این‌جا</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
