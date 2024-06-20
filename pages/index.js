import GeneralContext from "@/context/GeneralContext";
import EpisodePlayer from "@/components/player/episode-player";
import { connectToDatabase } from "@/utils/db";
import Link from "next/link";
import { Fragment } from "react";
import { FaAnglesDown } from "react-icons/fa6";
import { useContext, useEffect } from "react";
import RecentBooks from "@/components/boards/recent-books";

export default function Home({lastEpisode, recentBooks}) {
  
  const {generalContext,setGeneralContext} = useContext(GeneralContext);
  useEffect(()=>{
const {id, url, title, brief, permanentLink} = lastEpisode[0];
  console.log(lastEpisode);
  console.log(id, url, title, brief, permanentLink);

if(!generalContext.playingEpisode.permanentLink){
  setGeneralContext({...generalContext, playingEpisode:{id, url, title, brief, permanentLink}});
}
console.log(generalContext);
  })
  return (
    <Fragment>
    <div className=
    "overflow-x-hidden [height:100dvh] md:h-screen flex flex-col items-center justify-center  bg-[url('/images/night-sky-2.jpg')] bg-cover bg-center relative" id="first-landing"
    >

                 <div className=" flex flex-col items-center gap-10 justify-center px-1 py-8 md:px-12 md:py-12 bg-white/25 rounded-xl">
      <h1 className="text-6xl sm:text-9xl font-rubik text-white font-semibold">سبک ۲۴</h1>

      <div className="flex flex-row justify-center gap-2 md:gap-6">
        <Link className="text-xs md:text-base rounded bg-gray-200 p-1 hover:bg-gray-300" href={"/blog"}>
          وبلاگ
        </Link>
        <Link className="text-xs md:text-base rounded bg-gray-200 p-1 hover:bg-gray-300" href={"#radio"}>
          رادیو
        </Link>
        <Link className="text-xs md:text-base rounded bg-gray-200 p-1 hover:bg-gray-300" href={"#bookshelf"}>
        قفسهٔ کتاب
        </Link>
        <Link className="text-xs md:text-base rounded bg-gray-200 p-1 hover:bg-gray-300" href={"/recommendations"}>
          معرفی دیگران
        </Link>
        <Link className="text-xs md:text-base rounded bg-gray-200 p-1 hover:bg-gray-300" href={"/about"}>
          در مورد این‌جا
        </Link>
      </div>
    </div> 

<Link href={'#radio'} className="absolute bottom-6 left-[49%] text-3xl text-white animate-bounce"><FaAnglesDown className="" /></Link>
    </div>
    <div  id="radio" className="overflow-x-hidden [height:100dvh] md:h-screen flex flex-col justify-start gap-16 items-center">
      <div className="flex flex-col text-3xl font-bold mt-8 md:mt-24 text-[#6d5946]">رادیو حیات</div>
    
    <div className="flex flex-col items-center justify-evenly flex-1">
<div>آخرین اپیزود رادیو حیات را می‌توانید همین‌جا بشنوید.</div>
    <div className="flex flex-col justify-center items-center">
<EpisodePlayer />
    </div>
    

    <div>برای شنیدن اپیزودهای بیشتر <Link href={'/radio'} className="text-[#6d5946]">کلیک</Link> کنید.</div>
    <Link href={'#bookshelf'} className="text-3xl text-[#6d5946] animate-bounce"><FaAnglesDown className="" /></Link>
    </div>
    </div>
    <div id="bookshelf" className="overflow-x-hidden [height:100dvh] md:h-screen flex flex-col gap-16 items-center justify-start">
    <div className="flex flex-col text-3xl font-bold mt-8 md:mt-24 text-[#6d5946]">قفسهٔ کتاب</div>
    <RecentBooks books={recentBooks} />
    </div>
    </Fragment>

  );
}

export async function getServerSideProps() {
  const client = await connectToDatabase();
  const db = client.db();
  const lastEpisode = await db.collection('episodes').find().sort({creationDate: -1}).limit(1).toArray();
const recentBooks = await db.collection('books').find().sort({creationDate: -1}).toArray();
  client.close()
  return {
    props: {
      lastEpisode: JSON.parse(JSON.stringify(lastEpisode)),
      recentBooks: JSON.parse(JSON.stringify(recentBooks)),
    }
  };
}

