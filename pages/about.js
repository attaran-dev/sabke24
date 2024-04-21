import { connectToDatabase } from "@/utils/db";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function About(props) {
  const [page, setPage] = useState({});
  useEffect(() => {
    setPage(props.page);
    document.querySelector("#content").innerHTML = !page.content
      ? "loading..."
      : page.content;
  }, [page, props]);
  return (
    <div className="my-12 flex flex-col gap-8">
      <Head>
        <title>در مورد سبک ۲۴</title>
      </Head>
      <div className="m-auto rounded bg-gray-200 p-1 inline-block">
        <h1>در مورد این‌جا</h1>
      </div>
      <div id="content" className="mx-40 font-baloo text-2xl text-justify"></div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // const { params } = context;
  // console.log('aboutcontext', context)
  // const postid = params.postid;
  const client = await connectToDatabase();
  const db = client.db();
  const queryKey = `about.name`;
  const result = await db
    .collection("pagesContents")
    .findOne(
      { [queryKey]: "about" }
    );
  client.close();
  const aboutPage = result.about[0]
  if (!aboutPage) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      page: JSON.parse(JSON.stringify(aboutPage)),
    },
  };
}
