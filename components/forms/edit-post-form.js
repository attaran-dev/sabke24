import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import PostContentEditor from "@/components/form-parts/post-editor";
import toast from "react-hot-toast";
import { categoryFa } from "@/pages/category/[categoryid]";
import { recomTypeFa } from "@/pages/recommendations";

export default function EditPostForm(props) {
  const router = useRouter();
  const { totalPostsNum, categories, recomTypes, postsTitles, postsUrls } =
    props.metaInfo;
  const [title, setTitle] = useState();
  const [brief, setBrief] = useState();
  const [author, setAuthor] = useState();
  const [url, setUrl] = useState();
  const [recomType, setRecomType] = useState();
  const [category, setCategory] = useState();
  const [content, setContent] = useState();

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
  function checkTitleUniquity(title, oldTitle) {
    const result = postsTitles.find((postTitle)=>postTitle===title);

    if (result && oldTitle !== title) {
      return false;
    }

    return true;
  }
  function checkUrlUniquity(url, oldUrl) {
    const result = postsUrls.find((postUrl)=>postUrl===url);

    if (result && oldUrl !== url) {
      return false;
    }

    return true;
  }
    function handleSubmit(e) {
    e.preventDefault();
        const titleUniquity = checkTitleUniquity(title, props.postInfo.title);
    const urlUniquity = checkUrlUniquity(url, props.postInfo.url);
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
        .put(`/api/${props.postInfo.id}`, {
          id: props.postInfo.id,
          title,
          url,
          category,
          recomType,
          author,
          creationDate: props.postInfo.creationDate,
          editDate: Date.now(),
          brief,
          content,
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
    // console.log(props.postInfo);
    // console.log(author, recomType, url, brief, title, content, category);
    !title && setTitle(props.postInfo.title);
    !brief && setBrief(props.postInfo.brief);
    !author && setAuthor(props.postInfo.author);
    !url && setUrl(props.postInfo.url);
    !recomType && setRecomType(props.postInfo.recomType);
    !category && setCategory(props.postInfo.category);
    !content && setContent(props.postInfo.content);
  }, [title, brief, author, url, recomType, category, content, props.postInfo]);
  return (
    <div>
      {(!title ||
        !brief ||
        !author ||
        !url ||
        !content) && <p>Loading...</p>}
      {title && brief && author && url && content && (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <h1 className="self-center">فرم تغییر پست</h1>
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
        <button className="p-1 bg-gray-100 hover:bg-gray-200 rounded w-fit self-center">ثبت</button>
        </form>
      )}
    </div>
  );
}
