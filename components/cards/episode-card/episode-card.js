import Link from "next/link";
import { useEffect, useContext } from "react";
import GeneralContext from '@/context/GeneralContext'

function EpisodeCard(props) {
  const id = props.id;
  const url = props.url;
  const title = props.title;
  const brief = props.brief;
  const permanentLink = props.permanentLink;
//   useEffect(() => {}, [id, url, title, brief, permanentLink]);
  const {generalContext , setGeneralContext} = useContext(GeneralContext);
  return (
    <button
      className="md:ml-8 m-2 p-4 rounded-lg border-4 w-36 h-12 sm:w-48 sm:h-18 lg:w-64 lg:h-24 flex items-center justify-center text-center bg-white/75 group"
      onClick={()=>setGeneralContext({...generalContext, playingEpisode:{id, url, title, brief, permanentLink}})}
    >
      {
        <span className="text-xs sm:text-md lg:text-lg font-bold">
          {title}
        </span>
      }
    </button>
  );
}

export default EpisodeCard;
