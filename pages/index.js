import GeneralContext from "@/context/GeneralContext";
import EpisodePlayer from "@/components/player/episode-player";
import { connectToDatabase } from "@/utils/db";
import Link from "next/link";
import { Fragment } from "react";
import { FaAnglesDown } from "react-icons/fa6";
import { useContext, useEffect } from "react";
import RecentBooks from "@/components/boards/recent-books";
import AboutBoard from "@/components/boards/about-board";

export default function Home({ lastEpisode, recentBooks }) {
  const { generalContext, setGeneralContext } = useContext(GeneralContext);
  useEffect(() => {
    const { id, url, title, brief, permanentLink } = lastEpisode[0];
    console.log(lastEpisode);
    console.log(id, url, title, brief, permanentLink);

    if (!generalContext.playingEpisode.permanentLink) {
      setGeneralContext({
        ...generalContext,
        playingEpisode: { id, url, title, brief, permanentLink },
      });
    }
    console.log(generalContext);
  });
  return (
    <Fragment>
      <div
        className="overflow-x-hidden [height:100dvh] md:h-screen flex flex-col items-center justify-center  bg-[url('/images/night-sky-2.jpg')] bg-cover bg-center relative"
        id="first-landing"
      >
        <div className=" flex flex-col items-center gap-10 justify-center px-1 py-8 md:px-12 md:py-12 bg-white/25 rounded-xl">
          <h1 className="text-6xl sm:text-9xl font-rubik text-white font-semibold">
            سبک ۲۴
          </h1>

          <div className="flex flex-row justify-center gap-2 md:gap-6">
            <Link
              className="text-xs md:text-base rounded bg-gray-200 p-1 hover:bg-gray-300"
              href={"/blog"}
            >
              وبلاگ
            </Link>
            <Link
              className="text-xs md:text-base rounded bg-gray-200 p-1 hover:bg-gray-300"
              href={"#radio"}
            >
              رادیو
            </Link>
            <Link
              className="text-xs md:text-base rounded bg-gray-200 p-1 hover:bg-gray-300"
              href={"#bookshelf"}
            >
              قفسهٔ کتاب
            </Link>
            <Link
              className="text-xs md:text-base rounded bg-gray-200 p-1 hover:bg-gray-300"
              href={"/recommendations"}
            >
              معرفی دیگران
            </Link>
            <Link
              className="text-xs md:text-base rounded bg-gray-200 p-1 hover:bg-gray-300"
              href={"#about"}
            >
              درباره
            </Link>
          </div>
        </div>

        <Link
          href={"#radio"}
          className="absolute bottom-6 left-[49%] text-3xl text-white animate-bounce"
        >
          <FaAnglesDown className="" />
        </Link>
      </div>
      <div
        id="radio"
        className="overflow-x-hidden [height:100dvh] md:h-screen flex flex-col justify-between items-center"
      >
        <div className="flex flex-col font-bold mt-8 rounded text-white text-3xl bg-teal-600 p-3">
          رادیو حیات
        </div>

        <div className="flex flex-col items-center justify-evenly flex-1">
          <div>آخرین اپیزود رادیو حیات را می‌توانید همین‌جا بشنوید.</div>
          <div className="flex flex-col justify-center items-center">
            <EpisodePlayer />
          </div>

          <div>
            برای شنیدن اپیزودهای بیشتر{" "}
            <Link href={"/radio"} className="text-teal-800">
              کلیک
            </Link>{" "}
            کنید.
          </div>
          <Link
            href={"#bookshelf"}
            className="text-3xl text-teal-800 animate-bounce"
          >
            <FaAnglesDown className="" />
          </Link>
        </div>
      </div>
      <div
        id="bookshelf"
        className="overflow-x-hidden md:h-screen flex flex-col items-center justify-between md:gap-6 py-4"
      >
        <div className="flex flex-col font-bold mt-8 rounded text-white text-3xl bg-teal-600 p-3">
          قفسهٔ کتاب
        </div>
        <RecentBooks books={recentBooks} />
        <Link href={"#about"} className="text-3xl text-teal-800 animate-bounce">
          <FaAnglesDown className="" />
        </Link>
      </div>
      <div
        id="about"
        className="overflow-x-hidden flex flex-col items-between justify-center"
      >
        <div className="flex flex-col items-center w-fit text-center mx-auto font-bold mt-8 rounded text-white text-3xl justify-center bg-teal-600 p-3">
درباره
        </div>
        <AboutBoard />
      </div>
    </Fragment>
  );
}

export async function getServerSideProps() {
  const client = await connectToDatabase();
  const db = client.db();
  const lastEpisode = await db
    .collection("episodes")
    .find()
    .sort({ creationDate: -1 })
    .limit(1)
    .toArray();
  const recentBooks = await db
    .collection("books")
    .find()
    .sort({ creationDate: -1 })
    .toArray();
  client.close();
  return {
    props: {
      lastEpisode: JSON.parse(JSON.stringify(lastEpisode)),
      recentBooks: JSON.parse(JSON.stringify(recentBooks)),
    },
  };
}
