import { S3 } from "aws-sdk";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


export default function CreateEpisodeForm(props) {
  const { totalEpisodesNum, episodesTitles, episodesUrls } = props.props;
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [brief, setBrief] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState("");
  // function handleFileChange(e) {
  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     setFile(event.target.result.split(",")[1]); // Extract base64 content
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // }

  const ACCESSKEY = "uk30t82t1s5u97k7"; // or process.env.LIARA_ACCESS_KEY;
  const SECRETKEY = "85c140ae-4864-4e43-8c67-d23701c1b2dc"; //  or process.env.LIARA_SECRET_KEY;
  const ENDPOINT = "https://storage.iran.liara.space"; //   or process.env.LIARA_ENDPOINT;
  const BUCKET = "sabke24-files"; //    or process.env.LIARA_BUCKET_NAME;




  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {

      const s3 = new S3({
        accessKeyId: ACCESSKEY,
        secretAccessKey: SECRETKEY,
        endpoint: ENDPOINT,
      });

      const params = {
        Bucket: BUCKET,
        Key: file.name,
        Body: file,
      };
 toast.loading("در حال بارگزاری");
      const response = await s3.upload(params).promise();
// console.log(response)
      // Get permanent link
      const permanentLink = s3.getSignedUrl('getObject', {
        Bucket: BUCKET,
        Key: file.name,
        Expires: 31536000, // 1 year
      });

      // setPermanentLink(permanentSignedUrl);

console.log(response);
  

  return permanentLink

    } catch (error) {
      toast.error(error.message);
      
    }
  };

  function checkTitleUniquity(title) {
    const result = episodesTitles.find(
      (episodeTitle) => episodeTitle === title
    );

    if (result) {
      return false;
    }

    return true;
  }
  function checkUrlUniquity(url) {
    const result = episodesUrls.find((episodeUrl) => episodeUrl === url);

    if (result) {
      return false;
    }

    return true;
  }
  function handleSubmit(e) {
    e.preventDefault();
    handleUpload().then((permanentLink)=>{    const titleUniquity = checkTitleUniquity(title);
      const urlUniquity = checkUrlUniquity(url);
      toast.remove()
      if (permanentLink && title !== "" && url !== "" && titleUniquity && urlUniquity) {
       
          axios.post("/api/episodes", {
            id: (totalEpisodesNum + 1).toString(),
            title,
            url,
            creationDate: Date.now(),
            brief,
            permanentLink,
          })
          .then((response) => toast.success(response.data.message))
          .catch((error) => toast.error(error.response.data.message));
        setTimeout(() => {
          router.replace("/dashboard/radio");
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
      }});

  }

  return (
    <div className="absolute top-24 m-auto inset-x-1/12 md:top-32 md:inset-x-1/4 p-2 md:p-8">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="m-auto rounded bg-gray-200 p-1 inline-block">
          <h1>فرم ایجاد اپیزود جدید</h1>
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
          className="border-4 focus:border-black rounded p-2 my-3"
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
        <label htmlFor="file">فایل اپیزود</label>
        <input
          type="file"
          name="file"
          id="file"
          accept=".mp3"
          onChange={handleFileChange}
          className="border-4 focus:border-black rounded p-2 my-3"
        />

        <button className="my-6 p-1 rounded bg-gray-100 hover:bg-gray-200 w-fit self-center">
          ثبت اپیزود
        </button>
      </form>
    </div>
  );
}
