import CreatePostForm from "@/components/forms/create-post-form";
import { connectToDatabase } from "@/utils/db";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function NewPost(props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  if(status === "loading") {
    return <div>در حال احراز هویت ...</div>
  }
  if (status === "unauthenticated") {
    router.replace("/");
    return
  }

  return <CreatePostForm props={props} />;
}

export async function getServerSideProps() {
  const client = await connectToDatabase();
  const db = client.db();
  // console.log("db:", db);
  const metadata = await db.collection("metadata").findOne();
  // console.log("metammm:", metadata);
  const { totalPostsNum, categories, recomTypes, postsTitles, postsUrls } =
    metadata;
  client.close();
  return {
    props: {
      totalPostsNum,
      categories,
      recomTypes,
      postsTitles,
      postsUrls,
    },
  };
}
