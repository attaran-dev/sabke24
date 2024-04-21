import RecentPosts from "@/components/boards/recent-posts";
import { connectToDatabase } from "@/utils/db";
import Head from "next/head";

export default function PodcastRecom(props) {
  const { recentPosts } = props;
  return (
    <div className="my-12 flex flex-col gap-8">
      <Head>
        <title>معرفی پادکست</title>
      </Head>
      <div className="m-auto rounded bg-gray-200 p-1 inline-block">
        <h1 className="text-center">معرفی پادکست</h1>
      </div>
      <RecentPosts posts={recentPosts} />
    </div>
  );
}

export async function getServerSideProps() {
  const client = await connectToDatabase();
  const db = client.db();
  const recentPosts = await db
    .collection("posts")
    .find({ recomType: "podcast" })
    .sort({ creationDate: -1 })
    .toArray();
  client.close();

  return {
    props: {
      recentPosts: JSON.parse(JSON.stringify(recentPosts)),
    }
  };
}
