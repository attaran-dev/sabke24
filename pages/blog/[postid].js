import Link from "next/link";
import { useState, useEffect } from "react";
import CategoryElement from "@/components/categories/category-element";
import Menu from "@/components/menu/menu";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { categoryFa } from "../category/[categoryid]";
import { connectToDatabase } from "@/utils/db";
import GeneralContext from "@/context/GeneralContext";
import { useContext } from "react";
import RecentComments from "@/components/boards/recent-comments";
import { GoComment,GoCommentDiscussion } from "react-icons/go";
import CreateCommentForm from "@/components/forms/create-comment-form";

export default function Post(props) {
  const { generalContext } = useContext(GeneralContext);
  const [containerHeight, setContainerHeight] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [post, setPost] = useState({});
  const [creationDate, setCreationDate] = useState("");
  const [category, setCategory] = useState("");
  const [commentsMenu, setCommentsMenu] = useState("close");
  const [commentForm, setCommentForm] = useState("close");
  const {user} = generalContext;


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
        className="flex flex-row justify-center gap-8 py-6 h-screen md:p-[60px_60px_60px_40px]"
      >
        <div className="relative md:flex flex-col items-center hidden">
          <Menu />
          <div className="absolute bottom-0">
            <CategoryElement category={post.category} />
          </div>
          <div className={`absolute -left-72 bottom-0 h-full w-full ${commentsMenu === "open" ? 'translate-x-72' : null} transition `}>
            <RecentComments comments={post.comments} />
          </div>
          <div className={`absolute -left-72 bottom-0 h-full w-full ${commentForm === "open" ? 'translate-x-72' : null} transition `}>
            <CreateCommentForm user={user} postid={post.id} />
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
            <div className="flex flex-row my-2  mx-2 md:mx-6 lg:mx-8 justify-between">
                      <div
              id="post-meta"
              className="flex flex-row md:gap-4  gap-2"
            >
              {category === undefined && <span>loading...</span>}
              {category && (
                <Link
                  href={`/category/${post.category}`}
                  className=" border rounded p-1 text-xs md:text-sm"
                >
                  {category}
                </Link>
              )}

              {/* <div className=" border rounded p-1">{post.author}</div> */}
              <div className=" border rounded p-1 text-xs md:text-sm">
                {creationDate}
              </div>
            </div>
            <div className="flex gap-2">
            <button className="border rounded p-1 text-xs md:text-sm flex gap-2 items-center" onClick={()=>{

              (commentsMenu === 'open' && setCommentsMenu('close'));setCommentForm(`${commentForm === "close" ? "open" : "close"}`)
            }}>
                            <span>
              <GoComment />
              </span>
              <span>
              ثبت نظر
              </span>

              </button> 
            <button className="border rounded p-1 text-xs md:text-sm flex gap-2 items-center" onClick={()=>
            {

              (commentForm === 'open' && setCommentForm('close'));setCommentsMenu(`${commentsMenu === "close" ? "open" : "close"}`) 
            } }>
                            <span>
              <GoCommentDiscussion />
              </span>
              <span>
              نظرات
              </span>

              </button> 
            </div>
 
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
    },
  };
}
