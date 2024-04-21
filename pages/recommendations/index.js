import Link from "next/link";
import RecomContentPosts from "@/components/boards/recom-content-posts";
import { useState } from "react";
import RecomElement from "@/components/categories/recom-element";
import Head from "next/head";
import { connectToDatabase } from "@/utils/db";

export function recomTypeFa(recomType) {
  const recomTypeFa =
    recomType === "book"
      ? "کتاب و مقاله"
      : recomType === "app"
      ? "اپلیکیشن و سایت"
      : recomType === "podcast"
      ? "پادکست"
      : recomType === "group"
      ? "گروه"
      : null;

  return recomTypeFa;
}

export default function Recom(props) {
  // const sortPosts = (postsArray, resultNum, sortFunction, filterFunction) => {
  //   if (filterFunction) {
  //     const filteredArray = postsArray.filter(filterFunction);
  //     const filteredSortedArray = filteredArray.sort(sortFunction);
  //     const result = filteredSortedArray.slice(0, +resultNum);
  //     return result;
  //   }
  //   const sortedArray = postsArray.sort(sortFunction);
  //   const result = sortedArray.slice(0, +resultNum);
  //   return result;
  // };
  const { groupPosts, podcastPosts, bookPosts, appPosts } = props;
  const [hoveredColumn, setHoveredColumn] = useState("none");
  return (
    <div id="container" className="my-12 flex flex-col">
      <Head>
        <title>معرفی دیگران</title>
      </Head>
      <div className="m-auto rounded bg-gray-200 p-1 inline-block">
        <h1>معرفی دیگران</h1>
      </div>
      <ul className="flex gap-4 justify-center m-8">
        {bookPosts.length > 0 && (
          <li
            className="text-center p-4 w-56 flex flex-col gap-4"
            id="books"
            onMouseOver={() => setHoveredColumn("books")}
            onMouseOut={() => setHoveredColumn("none")}
          >
            <Link
              href={`/recommendations/books`}
              className=" rounded bg-gray-50 hover:bg-gray-100 p-1"
            >
              معرفی کتاب و مقاله
            </Link>

            <RecomContentPosts recomType={"books"} allRecomPosts={bookPosts} />
            <Link
              href={`/recommendations/books`}
              className=" rounded bg-gray-50 hover:bg-gray-100 p-1"
            >
              نمایش همه
            </Link>
          </li>
        )}
        {podcastPosts.length > 0 && (
          <li
            className="text-center p-4 w-56 flex flex-col gap-4"
            id="podcasts"
            onMouseOver={() => setHoveredColumn("podcasts")}
            onMouseOut={() => setHoveredColumn("none")}
          >
            <Link
              href={`/recommendations/podcasts`}
              className=" rounded bg-gray-50 hover:bg-gray-100 p-1"
            >
              معرفی پادکست
            </Link>

            <RecomContentPosts
              recomType={"podcasts"}
              allRecomPosts={podcastPosts}
            />
            <Link
              href={`/recommendations/podcasts`}
              className=" rounded bg-gray-50 hover:bg-gray-100 p-1"
            >
              نمایش همه
            </Link>
          </li>
        )}
        {appPosts.length > 0 && (
          <li
            className="text-center p-4 w-56 flex flex-col gap-4"
            id="apps"
            onMouseOver={() => setHoveredColumn("apps")}
            onMouseOut={() => setHoveredColumn("none")}
          >
            <Link
              href={`/recommendations/apps`}
              className=" rounded bg-gray-50 hover:bg-gray-100 p-1"
            >
              معرفی اپلیکیشن و سایت
            </Link>

            <RecomContentPosts recomType={"apps"} allRecomPosts={appPosts} />
            <Link
              href={`/recommendations/apps`}
              className=" rounded bg-gray-50 hover:bg-gray-100 p-1"
            >
              نمایش همه
            </Link>
          </li>
        )}
        {groupPosts.length > 0 && (
          <li
            className="text-center p-4 w-56 flex flex-col gap-4"
            id="groups"
            onMouseOver={() => setHoveredColumn("groups")}
            onMouseOut={() => setHoveredColumn("none")}
          >
            <Link
              href={`/recommendations/groups`}
              className=" rounded bg-gray-50 hover:bg-gray-100 p-1"
            >
              معرفی گروه
            </Link>

            <RecomContentPosts
              recomType={"groups"}
              allRecomPosts={groupPosts}
            />
            <Link
              href={`/recommendations/groups`}
              className=" rounded bg-gray-50 hover:bg-gray-100 p-1"
            >
              نمایش همه
            </Link>
          </li>
        )}
      </ul>
      <RecomElement recomType={hoveredColumn} />
    </div>
  );
}

export async function getStaticProps() {
  const client = await connectToDatabase();
  const db = client.db();
  const podcastPosts = await db
    .collection("posts")
    .find({ recomType: "podcast" })
    .sort({ creationDate: -1 })
    .limit(3)
    .toArray();
  const bookPosts = await db
    .collection("posts")
    .find({ recomType: "book" })
    .sort({ creationDate: -1 })
    .limit(3)
    .toArray();
  const appPosts = await db
    .collection("posts")
    .find({ recomType: "app" })
    .sort({ creationDate: -1 })
    .limit(3)
    .toArray();
  const groupPosts = await db
    .collection("posts")
    .find({ recomType: "group" })
    .sort({ creationDate: -1 })
    .limit(3)
    .toArray();

  client.close();
  return {
    props: {
      podcastPosts: JSON.parse(JSON.stringify(podcastPosts)),
      bookPosts: JSON.parse(JSON.stringify(bookPosts)),
      appPosts: JSON.parse(JSON.stringify(appPosts)),
      groupPosts: JSON.parse(JSON.stringify(groupPosts)),
    },
    revalidate: 1,
  };
}
