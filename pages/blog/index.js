import Head from "next/head";
import RecentPosts from "../../components/boards/recent-posts";
import PostCategories from "./../../components/categories/post-categories.js";
import { connectToDatabase } from "@/utils/db";

export default function Blog(props) {
    const {recentPosts} = props;
  return (
    <div className="my-12 flex flex-col gap-8">
      <Head>
        <title>
          وبلاگ سبک ۲۴
        </title>
      </Head>
      <div className="m-auto rounded text-white text-3xl bg-teal-600 p-3 inline-block">
        <h1>وبلاگ</h1>
      </div>
      
      <PostCategories />
      <RecentPosts posts={recentPosts} />
    </div>
  );
}

export async function getServerSideProps() {
  const client = await connectToDatabase();
  const db = client.db();
  const recentPosts = await db.collection('posts').find().sort({creationDate: -1}).toArray();
  client.close()
  return {
    props: {
      recentPosts: JSON.parse(JSON.stringify(recentPosts)),
    }
  };
}
