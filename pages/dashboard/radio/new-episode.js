import CreateEpisodeForm from "@/components/forms/create-episode-form";
import { connectToDatabase } from "@/utils/db";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function NewPost(props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <div>در حال احراز هویت ...</div>;
  }
  if (status === "unauthenticated") {
    router.replace("/");
    return;
  }

  return <CreateEpisodeForm props={props} />;
}

export async function getServerSideProps() {
  const client = await connectToDatabase();
  const db = client.db();
  // console.log("db:", db);
  const metadata = await db.collection("metadata").findOne();
  // console.log("metammm:", metadata);
  const { totalEpisodesNum, episodesTitles, episodesUrls } = metadata;
  client.close();
  return {
    props: {
      totalEpisodesNum,
      episodesTitles,
      episodesUrls,
    },
  };
}
