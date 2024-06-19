import GeneralContext from "@/context/GeneralContext";
import EpisodePlayer from "@/components/player/episode-player";
import { connectToDatabase } from "@/utils/db";
import Link from "next/link";
import { Fragment } from "react";
import { FaAnglesDown } from "react-icons/fa6";
import { useContext, useEffect } from "react";

export default function Home({lastEpisode}) {
  
  const {generalContext,setGeneralContext} = useContext(GeneralContext);
  useEffect(()=>{
const {id, url, title, brief, permanentLink} = lastEpisode[0];

if(!generalContext.playingEpisode.permanentLink){
  setGeneralContext({...generalContext, playingEpisode:{id, url, title, brief, permanentLink}});
}
console.log(generalContext);
  })
  return (
    <Fragment>
    <div className=
    "h-screen flex flex-col items-center justify-center  bg-[url('/images/night-sky-2.jpg')] bg-cover bg-center relative" id="first-landing"
    >
      <div className=
      "sm:p-20 md:p-32 lg:p-36 rounded-xl"
      >
                 <div className=" flex flex-col items-center gap-10 justify-center p-12 bg-white/25 rounded-xl">
      <h1 className="text-6xl sm:text-9xl font-rubik text-white font-semibold">سبک ۲۴</h1>

      <div className="flex flex-row justify-center gap-6">
        <Link className="rounded bg-gray-200 p-1 hover:bg-gray-300" href={"/blog"}>
          وبلاگ
        </Link>
        <Link className="rounded bg-gray-200 p-1 hover:bg-gray-300" href={"/recommendations"}>
          معرفی دیگران
        </Link>
        <Link className="rounded bg-gray-200 p-1 hover:bg-gray-300" href={"/about"}>
          در مورد این‌جا
        </Link>
      </div>
    </div> 
      </div>
<Link href={'#radio'} className="absolute bottom-6 left-[49%] text-3xl text-white animate-bounce"><FaAnglesDown className="" /></Link>
    </div>
    <div  id="radio" className="h-screen flex flex-col justify-start gap-16 items-center">
      <div className="flex flex-col text-3xl font-bold md:mt-24 text-[#6d5946]">رادیو سبک ۲۴</div>
    
    <div className="flex flex-col items-center justify-evenly flex-1">
<div>آخرین اپیزود سبک ۲۴ را می‌توانید همین‌جا بشنوید.</div>
    <div className="flex flex-col justify-center items-center">
<EpisodePlayer />
    </div>
    

    <div>برای شنیدن اپیزودهای بیشتر <Link href={'/radio'} className="text-[#6d5946]">کلیک</Link> کنید.</div>
    </div>
    </div>
    </Fragment>

  );
}

export async function getServerSideProps() {
  const client = await connectToDatabase();
  const db = client.db();
  const lastEpisode = await db.collection('episodes').find().sort({creationDate: -1}).limit(1).toArray();
  client.close()
  return {
    props: {
      lastEpisode: JSON.parse(JSON.stringify(lastEpisode)),
    }
  };
}

