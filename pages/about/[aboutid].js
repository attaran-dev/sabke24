import AboutBoard from "@/components/boards/about-board";
import { connectToDatabase } from "@/utils/db";
import Head from "next/head";
import { useEffect, useState } from "react";

export function aboutFa(about) {
    const aboutFa =
    about==="about"
    ?"درباره"
    : about==="contact-me"
    ? "تماس با من"
    : about==="andishkadeye-armanshahre-manavi"
    ? "اندیشکدهٔ آرمانشهر معنوی"
    : about==="armanshahre-zendegi-pub"
    ? "انتشارات آرمانشهر زندگی"
    : about==="ghebragh-journal"
    ? "گروه قبراق"
    : about==="hayate-tayyebe-group"
    ? "گروه حیات طیبه"
    : about==="lezzate-zendegi-group"
    ? "گروه لذت زندگی"
    : about==="exir-app"
    ? "گروه اکسیر"
    : about==="shamime-nabe-zendegi"
    ? "مؤسسهٔ شمیم ناب زندگی"
    : about==="patoghe-andishe"
    ? "گروه پاتوق اندیشه"
    : about==="hekmat-tour"
    ? "گروه بینافرهنگی حکمت تور"
    : null;
  
  
    return aboutFa;
  }
export default function About(props) {
  const [page, setPage] = useState({});
  useEffect(() => {
    setPage(props.page);
    document.querySelector("#content").innerHTML = !page.content
      ? "هنوز محتوایی بارگذاری نشده است."
      : page.content;
  }, [page, props]);
  return (
    <div className="bg-[url('/images/white-cloud.jpg')] bg-center bg-fixed">
          <div className="-my-24 flex flex-col gap-8">
      <Head>
        <title>{aboutFa(page.name)}</title>
      </Head>
      <div className="mt-36 mx-auto rounded text-white text-3xl font-bold bg-teal-600 p-3 inline-block">
        <h1>{aboutFa(page.name)}</h1>
      </div>
      <div id="content" className="mx-8 mb-12 lg:mx-40 md:mx-20 font-baloo md:text-lg lg:text-2xl text-justify p-4 lg:p-12 bg-white/75 rounded-lg"></div>
    <AboutBoard />
    </div>
    </div>

  );
}

export async function getServerSideProps(context) {
    const { params } = context;
    const aboutid = params.aboutid;
    const client = await connectToDatabase();
    const db = client.db();
    const metadata = await db.collection("metadata").findOne();
    const {aboutPages} = metadata;
    const aboutFound = aboutPages.find((about) => about === aboutid);
    // console.log("aboutPagespp:", aboutPages)
    if (!aboutFound) {
      return {
        notFound: true,
      };
    }
    const queryKey = `about.name`;
    const result = await db
      .collection("pagesContents")
      .findOne({ [queryKey]: aboutid });
    const page = result.about.find((page) => page.name === aboutid);
  
    // const pageContent = await db.collection("pagesContents").about.findOne({name:aboutid});
    client.close();
    return {
      props: {
        aboutid: aboutid,
        page: JSON.parse(JSON.stringify(page)),
      },
    };
  }
  