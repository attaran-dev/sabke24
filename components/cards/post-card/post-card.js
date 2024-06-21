import Link from "next/link";
import { useEffect } from "react";

function PostCard(props) {
  const id = props.id;
  const url = props.url;
  const title = props.title;
  const brief = props.brief;
  useEffect(() => {}, [id, url, title, brief]);
  return (
    <Link
      href={`/blog/${url}`}
      className=" p-4 rounded-lg border-4 w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 flex items-center justify-center text-center bg-white/75 group"
    >
      {
        <span className="transition duration-300 block text-xs sm:text-md lg:text-lg font-bold lg:group-hover:hidden">
          {title}
        </span>
      }
      {
        <p className="transition duration-300 text-sm hidden lg:group-hover:block m-2">
          {brief}
        </p>
      }
    </Link>
  );
}

export default PostCard;
