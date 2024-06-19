import BookCard from "../cards/book-card/book-card";

export default function RecentBooks({books}) {
  return (
    <div className="">
      {books.length === 0 && (
        <p className="text-center m-6">هنوز کتابی ثبت نشده است.</p>
      )}
      {books.length > 0 && (
        <>
          <p className="text-center font-bold m-6">کتاب‌های اخیر</p>

          <div className="flex flex-row flex-wrap gap-4 justify-center m-4">
            {books.map((book) => (
              <BookCard
                key={`book-${book.id}`}
                id={book.id}
                url={book.url}
                title={book.title}
                brief={book.brief}
                content={book.content}
                permanentLink={book.permanentLink}
                author={book.author}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
