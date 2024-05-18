import { connectToDatabase } from "@/utils/db";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function ContactMe(props) {
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
        <title>تماس با من</title>
      </Head>
      <div className="m-auto rounded bg-gray-200 p-1 inline-block">
        <h1>تماس با من</h1>
      </div>
      <div id="content" className="mx-8 lg:mx-40 md:mx-20 font-baloo md:text-lg lg:text-2xl text-justify"></div>
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
      { [queryKey]: "contact-me" }
    );
  client.close();
  const contactPage = result.about[1]
  if (!contactPage) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      page: JSON.parse(JSON.stringify(contactPage)),
    },
  };
}
