import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import Footer from "./footer/footer";
import Header from "./header/header";
import { Baloo_Bhaijaan_2, Rubik, Noto_Sans_Arabic, Lalezar } from "next/font/google";

const baloo = Baloo_Bhaijaan_2({
  subsets: ["arabic", "latin"],
  display: "auto",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo-bhaijaan-2",
});
const rubik = Rubik({
  subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
  variable: "--font-rubik",
});
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-sans-arabic",
});

const lalezar = Lalezar({
  subsets:['arabic'],
  weight:["400"],
  variable:"--font-lalezar"
})

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = router.pathname;
  // console.log(pathname);
  return (
<>
{
pathname !== "/"
// && pathname !=="/blog/[postid]"
 &&
<Header fonts={`${baloo.variable} ${rubik.variable} ${notoSansArabic.variable} ${lalezar.variable}`} />
}
          <main
      className={`${baloo.variable} ${rubik.variable} ${notoSansArabic.variable} ${lalezar.variable} font-noto`}
      dir="rtl"
    >
      {children}
    </main>
</>




  );
}
