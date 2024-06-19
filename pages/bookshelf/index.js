import RecentBooks from "@/components/boards/recent-books";
import { connectToDatabase } from "@/utils/db";
import Head from "next/head";

export default function Bookshelf(props) {
  const {recentBooks} = props;
    return (
        <div className="my-12 flex flex-col gap-8">
          <Head>
            <title>
              قفسه کتاب سبک ۲۴
            </title>
          </Head>
          <div className="m-auto rounded bg-gray-200 p-1 inline-block">
            <h1>قفسهٔ کتاب</h1>
            
          </div>
<RecentBooks books={recentBooks} />
        </div>
      );
}

export async function getServerSideProps() {
  const client = await connectToDatabase();
  const db = client.db();
  const recentBooks = await db.collection('books').find().sort({creationDate: -1}).toArray();
  client.close()
  return {
    props: {
      recentBooks: JSON.parse(JSON.stringify(recentBooks)),
    }
  };
}