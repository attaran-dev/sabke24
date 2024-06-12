import CreateBookForm from "@/components/forms/create-book-form";
import { connectToDatabase } from "@/utils/db";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function NewBook(props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <div>در حال احراز هویت ...</div>;
  }
  if (status === "unauthenticated") {
    router.replace("/");
    return;
  }

  return <CreateBookForm props={props} />;
}

export async function getServerSideProps() {
  const client = await connectToDatabase();
  const db = client.db();
  // console.log("db:", db);
  const metadata = await db.collection("metadata").findOne();
  // console.log("metammm:", metadata);
  const { totalBooksNum, booksTitles, booksUrls } = metadata;
  client.close();
  return {
    props: {
      totalBooksNum,
      booksTitles,
      booksUrls,
    },
  };
}
