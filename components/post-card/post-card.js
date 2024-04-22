import Link from "next/link";
import { useState, useEffect } from "react";

function PostCard(props) {
  const [hovered, setIsHovered] = useState(false);
  const id = props.id;
  const url = props.url;
  const title = props.title;
  const brief = props.brief;
useEffect(()=>{

}, [hovered,id,url,title,brief])
  return (
    <Link
      href={`/blog/${url}`}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-4 rounded-lg border-4 w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 flex items-center justify-center text-center"
    >
      {!hovered && <span className="animate-[fadein_0.5s] text-xs sm:text-md lg:text-lg font-bold">{title}</span>}
      {hovered && <p className="text-sm animate-[fadein_0.5s] hidden lg:block">{brief}</p>}
    </Link>
  );
}

export default PostCard;
