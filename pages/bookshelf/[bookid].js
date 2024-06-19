import Link from "next/link";
import { useState, useEffect } from "react";
import Menu from "@/components/menu/menu";
// import DateObject from "react-date-object";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";
import { connectToDatabase } from "@/utils/db";
import Image from "next/image";

export default function Book(props) {
  const [containerHeight, setContainerHeight] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [book, setBook] = useState({});
  const [creationDate, setCreationDate] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    setBook(props.book);
    document.querySelector("#content").innerHTML = !book.content
      ? "loading..."
      : book.content;
    // const date = new DateObject({
    //   date: book.creationDate,
    //   format: "DD MMMM YYYY",
    //   calendar: persian,
    //   locale: persian_fa,
    // });

    // setCreationDate(date.toString());
    // setCategory(categoryFa(book.category));
  }, [book, props]);
  function countScrollProgress() {
    const scrollTop = document.getElementById("book-content").scrollTop;
    const restContent =
      document.getElementById("book-content").scrollHeight -
      document.getElementById("book-content").clientHeight;
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
        <div className="md:flex flex-col hidden gap-8 justify-between items-center">
        <Menu />
        <div>
        </div>
        </div>
        <div
          dir="rtl"
          className={`bg-white overflow-auto rounded-r-lg rounded-l-lg flex lg:flex-row flex-col`}
          id="book-content"
          onScroll={() => countScrollProgress()}
        >
            <div className="flex flex-col justify-center items-center m-8">
                <Image src={book.permanentLink} alt="" width={400} height={200} />
                
            </div>
          <div className="flex flex-col lg:w-[800px] my-6 mr-6 ml-6 lg:my-24 lg:mr-6 lg:ml-12 gap-4">
            <div
              id="book-title"
              className="flex flex-col font-bold lg:text-2xl md:text-xl text-lg"
            >
              {book.title}
            </div>

            <div className="p-1 text-xs font-bold md:text-sm">{book.brief}</div>
              <div
                className="p-1 text-xs font-bold md:text-sm"
              >
                 نویسنده: {book.author}
              </div>
              
            
          <div
            className="text-xs md:text-sm lg:text-base lg:text-lg text-right leading-loose text-sky-950 text-justify"
            id="content"
          ></div>
          </div>

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
            #book-content {
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
  const bookid = params.bookid;
  const client = await connectToDatabase();
  const db = client.db();
  const book = await db.collection("books").findOne({ url: bookid });
  client.close();
  if (!book) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      book: JSON.parse(JSON.stringify(book)),
    }
  };
}
