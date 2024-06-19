import { useState } from "react";
import axios from "axios";
import PostContentEditor from "@/components/form-parts/post-editor";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { categoryFa } from "@/pages/category/[categoryid]";
import { recomTypeFa } from "@/pages/recommendations";

export default function CreatePostForm(props) {
  const { totalPostsNum, categories, recomTypes, postsTitles, postsUrls } =
    props.props;
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [brief, setBrief] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [recomType, setRecomType] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  function handleContentChange(newContent) {
    setContent(newContent);
  }
  function handleChange(event) {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    } else if (event.target.name === "brief") {
      setBrief(event.target.value);
    } else if (event.target.name === "author") {
      setAuthor(event.target.value);
    } else if (event.target.name === "url") {
      setUrl(event.target.value);
    } else if (event.target.name === "recomType") {
      setRecomType(event.target.value);
    } else if (event.target.name === "category") {
      setCategory(event.target.value);
    }
  }
  function checkTitleUniquity(title) {
    const result = postsTitles.find((postTitle) => postTitle === title);

    if (result) {
      return false;
    }

    return true;
  }
  function checkUrlUniquity(url) {
    const result = postsUrls.find((postUrl) => postUrl === url);

    if (result) {
      return false;
    }

    return true;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const titleUniquity = checkTitleUniquity(title);
    const urlUniquity = checkUrlUniquity(url);
    if (
      title !== "" &&
      brief !== "" &&
      author !== "" &&
      url !== "" &&
      content !== "" &&
      titleUniquity &&
      urlUniquity
    ) {
      axios
        .post("/api/posts", {
          id: (totalPostsNum + 1).toString(),
          title,
          url,
          category,
          recomType,
          author,
          creationDate: Date.now(),
          brief,
          content,
        })
        .then((response) => toast.success(response.data.message))
        .catch((error) => toast.error(error.response.data.message));
      setTimeout(() => {
        router.replace("/dashboard/posts");
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

  return (
    <div className="absolute top-24 m-auto inset-x-1/12 md:top-32 md:inset-x-1/4 p-2 md:p-8">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="m-auto rounded bg-gray-200 p-1 inline-block">
          <h1>فرم ایجاد مطلب جدید</h1>
        </div>
        <label htmlFor="title">
          عنوان<span className="text-red-500 text-3xl font-bold">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
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
          onChange={handleChange}
          className="border-4 focus:border-black rounded p-2 my-3"
        />
        <label htmlFor="category">دسته‌بندی</label>
        <select
          value={category}
          onChange={handleChange}
          className="border-4 focus:border-black rounded p-2 my-3"
          id="category"
          name="category"
        >
          <option value={""}></option>
          {categories.map((cat, i) => (
            <option key={`category-${i + 1}`} value={cat}>
              {categoryFa(cat)}
            </option>
          ))}
        </select>
        <label htmlFor="recomType">دسته‌ی معرفی دیگران</label>
        <select
          id="recomType"
          name="recomType"
          value={recomType}
          onChange={handleChange}
          className="border-4 focus:border-black rounded p-2 my-3"
        >
          <option value={""}></option>
          {recomTypes.map((recom, i) => (
            <option key={`recom-${i + 1}`} value={recom}>
              {recomTypeFa(recom)}
            </option>
          ))}
        </select>
        <label htmlFor="author">
          نویسنده<span className="text-red-500 text-3xl font-bold">*</span>
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={handleChange}
          className="border-4 focus:border-black rounded p-2 my-3"
        />

        <label htmlFor="brief">
          خلاصه<span className="text-red-500 text-3xl font-bold">*</span>
        </label>
        <input
          type="text"
          id="brief"
          name="brief"
          value={brief}
          onChange={handleChange}
          className="border-4 focus:border-black rounded p-2 my-3"
        />
        <label htmlFor="content">
          مطلب<span className="text-red-500 text-3xl font-bold">*</span>
        </label>
        <PostContentEditor
          handleChange={handleContentChange}
          content={content}
          id={"content"}
          name={"content"}
        />
        <button className="my-6 p-1 rounded bg-gray-100 hover:bg-gray-200 w-fit self-center">
          ثبت مطلب
        </button>
      </form>
    </div>
  );
}
