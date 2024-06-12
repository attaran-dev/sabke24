import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import PostContentEditor from "../form-parts/post-editor";

export default function CreateBookForm(props) {
  const { totalBooksNum, booksTitles, booksUrls } = props.props;
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [brief, setBrief] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  function handleContentChange(newContent) {
    setContent(newContent);
  }

  function handleFileChange(e) {
    const reader = new FileReader();
    reader.onload = (event) => {
      setFile(event.target.result.split(",")[1]); // Extract base64 content
    };
    reader.readAsDataURL(e.target.files[0]);
  }
  function checkTitleUniquity(title) {
    const result = booksTitles.find((bookTitle) => bookTitle === title);

    if (result) {
      return false;
    }

    return true;
  }
  function checkUrlUniquity(url) {
    const result = booksUrls.find((bookUrl) => bookUrl === url);

    if (result) {
      return false;
    }

    return true;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const titleUniquity = checkTitleUniquity(title);
    const urlUniquity = checkUrlUniquity(url);
    if (file && title !== "" && url !== "" && titleUniquity && urlUniquity) {
      axios
        .post("/api/books", {
          id: (totalBooksNum + 1).toString(),
          title,
          url,
          creationDate: Date.now(),
          brief,
          author,
          content,
          file,
        })
        .then((response) => toast.success(response.data.message))
        .catch((error) => toast.error(error.response.data.message));
      setTimeout(() => {
        router.replace("/dashboard/bookshelf");
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
          <h1>فرم ایجاد کتاب جدید</h1>
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

        <label htmlFor="author">
          نویسنده<span className="text-red-500 text-3xl font-bold">*</span>
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border-4 focus:border-black rounded p-2 my-3"
        />
        <label htmlFor="content">دربارهٔ کتاب</label>
        <PostContentEditor
          handleChange={handleContentChange}
          content={content}
          id={"content"}
          name={"content"}
        />

        <label htmlFor="file">تصویر کتاب</label>
        <input
          type="file"
          name="file"
          id="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border-4 focus:border-black rounded p-2 my-3"
        />

        <button className="my-6 p-1 rounded bg-gray-100 hover:bg-gray-200 w-fit self-center">
          ثبت کتاب
        </button>
      </form>
    </div>
  );
}
