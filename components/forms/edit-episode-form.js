import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function EditEpisodeForm(props){
    const { totalEpisodesNum, episodesTitles, episodesUrls } = props.metaInfo;
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [brief, setBrief] = useState("");
    const [url, setUrl] = useState("");

    function checkTitleUniquity(title, oldTitle) {
        const result = episodesTitles.find((episodeTitle)=>episodeTitle===title);
    
        if (result && oldTitle !== title) {
          return false;
        }
    
        return true;
      }
      function checkUrlUniquity(url, oldUrl) {
        const result = episodesUrls.find((episodeUrl)=>episodeUrl===url);
    
        if (result && oldUrl !== url) {
          return false;
        }
    
        return true;
      }
        function handleSubmit(e) {
      e.preventDefault();
      const titleUniquity = checkTitleUniquity(title, props.episodeInfo.title);
      const urlUniquity = checkUrlUniquity(url, props.episodeInfo.url);
      if (title !== "" && url !== "" && titleUniquity && urlUniquity) {
          axios.put(`/api/episodes/${props.episodeInfo.id}`, {
            id: props.episodeInfo.id,
            title,
            url,
            creationDate: props.episodeInfo.creationDate,
            editDate: Date.now(),
            brief,
            filePath: props.episodeInfo.filePath,
          })
          .then((response) => toast.success(response.data.message))
          .catch((error) => toast.error(error.response.data.message));
        setTimeout(() => {
          router.reload();
        }, 2000);
        return;
      } else if (!titleUniquity) {
        toast.error("عنوان تکراری است");
        return;
      } else if (!urlUniquity) {
        toast.error("آدرس تکراری است");
        return;
      } else {
        toast.error("یکی از فیلدهای ضروری خالی است");
      }
    }
  
    useEffect(() => {
        // console.log(props.episodeInfo);
        // console.log(author, recomType, url, brief, title, content, category);
        !title && setTitle(props.episodeInfo.title);
        !brief && setBrief(props.episodeInfo.brief);
        !url && setUrl(props.episodeInfo.url);
      }, [title, brief, url, props.episodeInfo]);

    return (
      <div>
              {(!title ||
        !url) && <p>Loading...</p>}
        {title && url && (<form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="m-auto rounded bg-gray-200 p-1 inline-block">
            <h1>فرم ایجاد اپیسود جدید</h1>
          </div>
          <label htmlFor="title">
            عنوان<span className="text-red-500 text-3xl font-bold">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-4 focus:border-black rounded p-2 my-3"
          />
          <label htmlFor="url">
            آدرس<span className="text-red-500 text-3xl font-bold">*</span>
          </label>
          <input
            type="text"
            id="url"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border-4 focus:border-black rounded p-2 my-3 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            disabled
          />
  
          <label htmlFor="brief">خلاصه</label>
          <input
            type="text"
            id="brief"
            name="brief"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            className="border-4 focus:border-black rounded p-2 my-3"
          />

  
          <button className="my-6 p-1 rounded bg-gray-100 hover:bg-gray-200 w-fit self-center">
            ثبت اپیسود
          </button>
        </form>)}
      </div>
    );
  
}