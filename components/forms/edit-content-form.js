import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import PostContentEditor from "@/components/form-parts/post-editor";
import toast from "react-hot-toast";

export default function EditContentForm(props) {
  const router = useRouter();
  const [content, setContent] = useState();

  function handleContentChange(newContent) {
    setContent(newContent);
  }

  function handleSubmit(e) {
    e.preventDefault();
    {
      axios
        .put(`/api/pages/${props.pageInfo.name}`, {
          pageType: props.pageInfo.pageType,
          content,
        })
        .then((response) => toast.success(response.data.message))
        .catch((error) => toast.error(error.response.data.message));
      // .catch((error) => toast.error(error.response.data.message));
      setTimeout(() => {
        router.reload();
      }, 2000);
      return;
    }
  }

  useEffect(() => {
    // console.log(props.pageInfo);
    // console.log(content);
    !content && setContent(props.pageInfo.content);
  }, [content, props.pageInfo]);
  return (
    <div>
      {content === undefined && <p>Loading...</p>}

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <h1 className="self-center">فرم تغییر محتوای صفحه</h1>
        <label htmlFor="content" className="">
          مطلب<span className="text-red-500 text-3xl font-bold">*</span>
        </label>
        <PostContentEditor
          handleChange={handleContentChange}
          content={content}
          id={"content"}
          name={"content"}
        />
        <button className="p-1 bg-gray-100 hover:bg-gray-200 rounded w-fit self-center">ثبت</button>
      </form>
    </div>
  );
}
