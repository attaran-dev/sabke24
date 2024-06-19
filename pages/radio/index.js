import RecentEpisodes from "@/components/boards/recent-episodes";
import EpisodePlayer from "@/components/player/episode-player";
import { connectToDatabase } from "@/utils/db";
import Head from "next/head";

export default function RadioPage(props) {
  const {recentEpisodes} = props;
  
    return (
        <div className="my-12 flex flex-col gap-8 content-between">
          <Head>
            <title>
              رادیو سبک ۲۴
            </title>
          </Head>
          <div className="m-auto rounded bg-gray-200 p-1 inline-block">
            <h1>رادیو سبک ۲۴</h1>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between">
    <RecentEpisodes episodes={recentEpisodes} />
    <div className="flex flex-col items-center mx-auto justify-center w-full">

      <EpisodePlayer /> 
    </div>
          </div>

 
        </div>
      );
}

export async function getServerSideProps() {
  const client = await connectToDatabase();
  const db = client.db();
  const recentEpisodes = await db.collection('episodes').find().sort({creationDate: -1}).toArray();
  client.close()
  return {
    props: {
      recentEpisodes: JSON.parse(JSON.stringify(recentEpisodes)),
    }
  };
}
