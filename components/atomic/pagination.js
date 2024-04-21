import Link from "next/link";

export default function Pagination(props) {
  const { pagesNumArr, currentPage } = props;
  return (
    <div id="pagination" className="flex flex-row-reverse justify-center gap-2 m-1">
      {pagesNumArr.map((page) => (
        <Link
          key={`page-${page}`}
          id={`page-${page}`}
          href={`?page=${page}`}
          className={`${+currentPage === +page ? "border-2 rounded-full p-1" : "p-1"}`}
        >
          {page}
        </Link>
      ))}
    </div>
  );
}
