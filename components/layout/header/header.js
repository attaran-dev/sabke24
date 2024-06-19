import Link from "next/link";
import { useRouter } from "next/router";
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
      <div className="flex flex-col justify-center items-center py-3 px-6 gap-2 sm:rounded-b-xl w-screen md:w-fit shadow-2xl bg-white">
        <div>
          <Link className="font-rubik font-bold text-2xl" href="/">
            سبک ۲۴
          </Link>
        </div>
        <div className="flex text-xs flex-row-reverse flex-row w-full justify-between items-center">
          <Link className="hover:bg-gray-100 hover:rounded-md p-1 border-l-2" href="/blog">
            وبلاگ
          </Link>
          <Link className="hover:bg-gray-100 hover:rounded-md p-1 border-l-2" href="/radio">
            رادیو
          </Link>
          <Link className="hover:bg-gray-100 hover:rounded-md p-1 border-l-2" href="/bookshelf">
            قفسه
          </Link>
          <Link
            className="hover:bg-gray-100 hover:rounded-md p-1 border-l-2"
            href="/recommendations"
          >
            معرفی دیگران
          </Link>
          <Link className="hover:bg-gray-100 hover:rounded-md p-1" href="/about">
            در مورد این‌جا
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
