import Link from "next/link";
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
  return (
    <header
      className={`w-full flex justify-center ${fonts} font-noto sticky top-0`}
    >
      <div className="flex flex-col justify-center items-center py-2 px-6 gap-2 rounded-xl w-fit shadow-2xl bg-white">
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
