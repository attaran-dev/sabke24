import Head from "next/head";

export default function Bookshelf() {
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

        </div>
      );
}