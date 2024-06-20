import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

function BookCard(props) {
  const id = props.id;
  const url = props.url;
  const title = props.title;
  const brief = props.brief;
  const content = props.content;
  const permanentLink = props.permanentLink;
  const author = props.author;
  useEffect(() => {}, [id, url, title, brief, content, permanentLink,author]);
  return (
    <Link
      href={`/bookshelf/${url}`}
      className=" p-8 rounded-lg border-4 w-48 h-72 lg:w-60 lg:h-96 flex flex-col gap-4 items-center justify-between text-center bg-white/75 group"
    >
      <div>
        <Image src={permanentLink} alt="" width={180} height={180} />
      </div>
      {
        <span className="text-xs sm:text-md font-bold">
          {title}
        </span>
      }

    </Link>
  );
}

export default BookCard;
