import RecentPosts from "@/components/boards/recent-posts";
import { connectToDatabase } from "@/utils/db";
import Head from "next/head";

export default function GroupRecom(props) {
    const {recentPosts} = props;
    return (
      <div className="my-12 flex flex-col gap-8">
        <Head>
          <title>
          معرفی گروه
          </title>
        </Head>
        <div className="m-auto rounded text-white text-3xl bg-teal-600 p-3 inline-block">
        <h1>معرفی گروه</h1>
        </div>
      <RecentPosts posts={recentPosts} />
      </div>
    );
  }

  export async function getServerSideProps() {
    const client = await connectToDatabase();
    const db = client.db()
    const recentPosts = await db.collection('posts').find({recomType: 'group'}).sort({creationDate: -1}).toArray();
    client.close()
        return {
      props: {
        recentPosts: JSON.parse(JSON.stringify(recentPosts)),
      }
    };
  }
  