import Link from "next/link";
import { useState, useEffect } from "react";
import CategoryElement from "@/components/categories/category-element";
import Menu from "@/components/menu/menu";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { categoryFa } from "../category/[categoryid]";
import { connectToDatabase } from "@/utils/db";

export default function Post(props) {
  const [containerHeight, setContainerHeight] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [post, setPost] = useState({});
  const [creationDate, setCreationDate] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    setPost(props.post);
    document.querySelector("#content").innerHTML = !post.content
      ? "loading..."
      : post.content;
    const date = new DateObject({
      date: post.creationDate,
      format: "DD MMMM YYYY",
      calendar: persian,
      locale: persian_fa,
    });

    setCreationDate(date.toString());
    setCategory(categoryFa(post.category));
  }, [category, creationDate, post, props]);
  function countScrollProgress() {
    const scrollTop = document.getElementById("post-content").scrollTop;
    const restContent =
      document.getElementById("post-content").scrollHeight -
      document.getElementById("post-content").clientHeight;
    const progress = (scrollTop / restContent).toFixed(3).toString();
    setScrollProgress(+progress);
  }
  useEffect(() => {
    setContainerHeight(window.innerHeight - 121);
  }, [containerHeight, scrollProgress]);

  return (
    <>
      <div
        id="container"
        dir="ltr"
        className="flex flex-row justify-center gap-8 py-6 md:p-[60px_60px_60px_40px]"
      >
        <div className="flex flex-col gap-8 justify-between items-center">
        <Menu />
        <div className="hidden md:block">
        <CategoryElement category={post.category} />
        </div>
        </div>
        <div
          dir="rtl"
          className={`bg-white w-10/12 overflow-auto rounded-r-lg rounded-l-lg`}
          id="post-content"
          onScroll={() => countScrollProgress()}
        >
          <div>
            <div
              id="post-title"
              className="flex flex-col m-6 text-center font-bold lg:text-3xl md:text-xl text-lg"
            >
              {post.title}
            </div>
            <div id="post-meta" className="flex flex-row md:gap-4 md:mx-4 lg:mx-6 my-2 mx-2 gap-2">
              {!category && <span>loading...</span>}
              <Link
                href={`/category/${post.category}`}
                className=" border rounded p-1 text-xs md:text-sm"
              >
                {category}
              </Link>
              {/* <div className=" border rounded p-1">{post.author}</div> */}
              <div className=" border rounded p-1 text-xs md:text-sm">{creationDate}</div>
            </div>
          </div>
          <hr />
          <div
            className="m-6 text-xs md:text-sm lg:text-base md:m-8 lg:text-lg lg:m-12 text-right leading-loose text-sky-950 text-justify"
            id="content"
          ></div>
        </div>

        <style jsx>
          {`
            .dropdown {
            }
            .dropdownbtn {
            }
            .dropdown .dropdownmenu {
              display: none;
              height: 0;
              left: 50px;
              transition: height 1s;
              z-index: 1;
            }

            .dropdown:hover {
            }

            .dropdown:hover .dropdownmenu {
              display: flex;
              flex-direction: column;
              height: 100%;
              gap: 2px;
            }

            #container {
              background-image: conic-gradient(
                  rgba(255, 255, 255, 0.2) ${scrollProgress}turn,
                  rgba(255, 255, 255, 0.6)
                    ${!scrollProgress
                      ? scrollProgress
                      : +scrollProgress + 0.001}turn
                    0turn
                ),
                url("/images/OIHEDB0-2.jpg");
            }
            #menu {
              display: flex;
              flex-direction: row;
            }
            #post-content {
              height: ${containerHeight}px;
            }
            ::-webkit-scrollbar {
              width: 7px;
            }
            ::-webkit-scrollbar-thumb {
              background: #25441e35;
              border-radius: 8px;
              border: 1px solid #25441e50;
            }
            ::-webkit-scrollbar-track {
              background: #25441e20;
            }
            .noselect {
              user-drag: none;
              user-select: none;
              -moz-user-select: none;
              -webkit-user-drag: none;
              -webkit-user-select: none;
              -ms-user-select: none;
              pointer-events: none;
            }
          `}
        </style>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const postid = params.postid;
  const client = await connectToDatabase();
  const db = client.db();
  const post = await db.collection("posts").findOne({ url: postid });
  client.close();
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    }
  };
}
