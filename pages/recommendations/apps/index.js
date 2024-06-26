import RecentPosts from "@/components/boards/recent-posts";
import { connectToDatabase } from "@/utils/db";
import Head from "next/head";

export default function AppRecom(props) {
    const {recentPosts} = props;
    return (
      <div className="my-12 flex flex-col gap-8">
        <Head>
          <title>
          معرفی اپلیکیشن
          </title>
        </Head>
        <div className="m-auto rounded text-white text-3xl font-bold bg-teal-600 p-3 inline-block">
        <h1>معرفی اپلیکیشن</h1>
        </div>
      <RecentPosts posts={recentPosts} />
      </div>
    );
  }

  export async function getServerSideProps() {
    const client = await connectToDatabase();
    const db = client.db()
    const recentPosts = await db.collection('posts').find({recomType: 'app'}).sort({creationDate: -1}).toArray();
    client.close()
        return {
      props: {
        recentPosts: JSON.parse(JSON.stringify(recentPosts)),
      }
    };
  }
  