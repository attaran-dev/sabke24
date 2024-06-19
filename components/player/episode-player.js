import GeneralContext from "@/context/GeneralContext";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp} from "react-icons/fa";

export default function EpisodePlayer() {
  const [isPlayed, setIsPlayed] = useState(false);
  const [volume, setVolume] = useState(100);
  const { generalContext } = useContext(GeneralContext);
  console.log(`generalContext: ${generalContext}`);
  console.log(`episodeLink: ${generalContext.playingEpisode.permanentLink}`);
  function toggle() {
    const audio = document.getElementById("playingEpisode");
    if (audio.paused) {
      audio.play();
      setIsPlayed(true);
    } else {
      audio.pause();
      setIsPlayed(false);
    }
  }
  function changeVolume(e){
    
    
    setVolume(+e.target.value);
    
  }

  useEffect(()=>{
console.log(volume);
const audio = document.getElementById("playingEpisode");
audio.volume = volume/100;
console.log(+(volume*360/300));
console.log(`generalContext: ${generalContext}`)
  }, [volume, isPlayed, generalContext])
  return (
    <div className=" scale-50 md:scale-100 ">
          <div className="relative w-[600px]">
      <Image src={"/images/radio.png"} alt="" width={600} height={500} className="[user-drag:none] [-webkit-user-drag:none]
            [user-select:none]
            [-moz-user-select:none]
            [-webkit-user-select:none]
            [-ms-user-select:none]"/>
      <Image
        src={"/images/switch1i-gold-2.png"}
        alt=""
        width={50}
        height={50}
        onClick={toggle}
        className={`absolute top-[22%] left-[18%] ${
          isPlayed ? "rotate-[45deg]" : null
        } transition duration-50 cursor-pointer [user-drag:none] [-webkit-user-drag:none]
            [user-select:none]
            [-moz-user-select:none]
            [-webkit-user-select:none]
            [-ms-user-select:none]`}
      />
      <div className="text-[8px] font-bold absolute top-[22%] right-[22%] text-[#331a00]">MIN</div>
      <div className="text-[8px] font-bold absolute top-[22%] right-[11%] text-[#331a00]">MAX</div>
      <div className="absolute top-[18%] right-[calc(22%-4rem)] p-4 group cursor-pointer">
        <div className="relative">
          <div className="absolute top-0">
            <div className={`relative w-[50px] h-[50px] rounded-full transition`} id="volumeIndicator">
              <div className={`w-1 h-3 bg-[#331a00] absolute top-0 left-[23px] `}></div>
              
            </div>
          </div>
          <FaVolumeUp className="absolute left-[18px] top-[18px] text-[#331a00]"/>
          <input type="range" value={volume} onChange={(e)=>changeVolume(e)} dir="ltr" className="absolute -top-6 -left-6 group-hover:block hidden w-24"/>

        </div>

        <Image
          src={"/images/switch1-gold.png"}
          alt=""
          width={50}
          height={50}
          className={` transition duration-50 cursor-pointer [user-drag:none] [-webkit-user-drag:none]
            [user-select:none]
            [-moz-user-select:none]
            [-webkit-user-select:none]
            [-ms-user-select:none]`}
        />
      </div>
      <FaPlay className="absolute top-[19%] left-[26%] text-xs text-[#331a00]" />
      <FaPause className="absolute top-[16%] left-[21%] text-sm text-[#331a00]" />
      <div className="absolute top-[40%] left-[25%]">
        <div className="relative">
          <audio
            id="playingEpisode"
            src={generalContext.playingEpisode.permanentLink}
            controls
            className="h-6"
          ></audio>
          <div className="bg-[#e8e0c9] w-20 h-6 absolute top-0 right-0 rounded-full text-xs flex items-center mr-2">{generalContext.playingEpisode.title}</div>
        </div>
      </div>

      <style jsx>
        {`
        #volumeIndicator{
        transform: rotate(${+(volume*6/5)-60}deg) !important;
        }
          audio::-webkit-media-controls-play-button {
            display: none;
          }
          audio::-webkit-media-controls-panel {
            background-color: #e8e0c9;
          }
            audio::-webkit-media-controls-mute-button {
  display:none;
  pointer-events: none;
}
audio::-webkit-media-controls-volume-slider {
  display:none;
  pointer-events: none;
}
audio::-webkit-media-controls-volume-slider-container {
  display:none;
  pointer-events: none;
}

        `}
      </style>
    </div>  
    </div>

  );
}
