import { writeFile } from "fs/promises";
import { join } from "path";
import { connectToDatabase } from "@/utils/db";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    // console.log("req:", req);
    // console.log("queryb:", req.query);
    const bookId = req.query.bookid;
    const client = await connectToDatabase();
    const db = client.db();
    const oldBook = await db.collection("books").findOne({ id: bookId });
    if (oldBook) {
      const result = await db.collection("books").deleteOne({ id: bookId });
      if (result.deletedCount === 1) {
        const metadata = await db.collection("metadata").findOne();
        await db.collection("metadata").updateOne(
          {},
          {
            $set: {
              currentBooksNum: metadata.currentBooksNum - 1,
            },
          }
        );
        await db.collection("metadata").updateOne(
          {},
          {
            $pull: {
              booksTitles: oldBook.title,
              booksUrls: oldBook.url,
            },
          }
        );

        res.status(201).json({
          message: "کتاب حذف شد",
        });
      } else {
        res.status(500).json({
          message: "مشکلی در سرور پیش آمده است",
        });
      }
    } else {
      res.status(409).json({
        message: "کتابی با این مشخصات یافت نشد",
      });
    }
  } else if (req.method === "PUT") {
    const client = await connectToDatabase();
    const db = client.db();

    const bookId = req.query.bookid;
    const { id, title, url, creationDate, editDate, author, content, brief } =
      req.body;
      const bytes = Buffer.from(file, 'base64'); // Convert base64 to buffer
      const filePath = join(process.cwd(), 'public', 'radio', `${url}.mp3`);
      await writeFile(filePath, bytes);  
    const editedBook = {
      id,
      title,
      url,
      creationDate,
      brief,
      editDate,
      author,
      content,
      filePath,
    };
    const oldBook = await db.collection("books").findOne({ id: bookId });

    if (oldBook) {
      const result = await db
        .collection("books")
        .replaceOne({ id: bookId }, editedBook);

      if (result.modifiedCount === 1) {
        // console.log("oldBookTitle:", oldBook.title);
        // console.log("editedBookTitle:", editedBook.title);
        // await db.collection("metadata").updateMany(
        //   {},
        //   {
        //     $pull: {
        //       booksTitles: oldBook.title,
        //       booksUrls: oldBook.url,
        //     },
        //     $push: {
        //       booksTitles: editedBook.title,
        //       booksUrls: editedBook.url,
        //     },
        //   }
        // );
        // console.log("editedBookTitle:", editedBook.title);
        await db.collection("metadata").updateOne(
          {},
          {
            $pull: {
              booksTitles: oldBook.title,
              booksUrls: oldBook.url,
            },
          }
        );
        await db.collection("metadata").updateOne(
          {},
          {
            $push: {
              booksTitles: editedBook.title,
              booksUrls: editedBook.url,
            },
          }
        );
        res.status(201).json({
          message: "کتاب تغییر کرد",
          editedBook: editedBook,
        });
      } else {
        res.status(500).json({
          message: "مشکلی در سرور پیش آمده است",
        });
      }
    } else {
      res.status(409).json({
        message: "کتابی با این مشخصات یافت نشد",
      });
    }
  } else {
    res.status(200).json({ message: "nice try." });
  }
}
