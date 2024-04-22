import RecentPosts from "@/components/boards/recent-posts";
import { connectToDatabase } from "@/utils/db";
import Head from "next/head";
import { useEffect, useState } from "react";
export function categoryFa(category) {
  const categoryFa =
    category === "income-expense"
      ? "دخل و خرج"
      : category === "hygiene"
      ? "بهداشت"
      : category === "communication"
      ? "ارتباطات"
      : category === "recreation"
      ? "تفریح"
      : category === "nutrition"
      ? "تغذیه"
      : category === "thought"
      ? "اندیشه"
      : category === "sport"
      ? "ورزش"
      : category === "prayer"
      ? "نیایش"
      : null;

  return categoryFa;
}
export default function CategoryPage(props) {
  const { categoryid, categoryPosts } = props;
  const [page, setPage] = useState({});
  useEffect(() => {
    setPage(props.page);
    document.querySelector("#content").innerHTML =
      page.content === undefined ? "loading..." : page.content;
  }, [page, props]);

  return (
    <div className="my-12 flex flex-col">
      <Head>
        <title>{categoryFa(categoryid)}</title>
      </Head>
      <div className="m-auto rounded bg-gray-200 p-1 inline-block">
        <h1>{categoryFa(categoryid)}</h1>
      </div>
      <div
        id="content"
        className="m-8 lg:mx-40 md:mx-20 font-baloo md:text-lg lg:text-2xl text-justify"
      ></div>
      <RecentPosts posts={categoryPosts} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const categoryid = params.categoryid;
  const client = await connectToDatabase();
  const db = client.db();
  const categoryPosts = await db
    .collection("posts")
    .find({ category: categoryid })
    .sort({ creationDate: -1 })
    .toArray();
  const metadata = await db.collection("metadata").findOne();
  const {categories} = metadata;
  const categoryFound = categories.find((category) => category === categoryid);
  // console.log("categoriespp:", categories)
  if (!categoryFound) {
    return {
      notFound: true,
    };
  }
  const queryKey = `category.name`;
  const result = await db
    .collection("pagesContents")
    .findOne({ [queryKey]: categoryid });
  const page = result.category.find((page) => page.name === categoryid);

  // const pageContent = await db.collection("pagesContents").category.findOne({name:categoryid});
  client.close();
  return {
    props: {
      categoryid: categoryid,
      page: JSON.parse(JSON.stringify(page)),
      categoryPosts: JSON.parse(JSON.stringify(categoryPosts)),
    },
  };
}
