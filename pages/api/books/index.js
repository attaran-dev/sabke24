// import { writeFile } from "fs/promises";
// import { join } from "path";
import { connectToDatabase } from "@/utils/db";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end(); // Method Not Allowed
    }

    const {
      id,
      title,
      url,
      creationDate,
      brief,
      author,
      content,
      permanentLink,
    } = req.body;
    // console.log("body", req.body);
    // console.log(`title: ${title}, url: ${url}, permanentLink: ${permanentLink}`)
    // if (!title || !url || !permanentLink) {
    //   return res
    //     .status(400)
    //     .json({ message: "بعضی اطلاعات لازم دریافت نمی‌شوند" });
    // }

    // const bytes = Buffer.from(file, 'base64'); // Convert base64 to buffer
    // const filePath = join(process.cwd(), 'public', 'bookshelf', `${url}.jpg`);
    // console.log(filePath);
    // await writeFile(filePath, bytes);
    const newBook = {
      id,
      title,
      url,
      creationDate,
      brief,
      author,
      content,
      permanentLink,
    };
    const client = await connectToDatabase();
    const db = client.db();
    await db.collection("books").insertOne(newBook);
    const metadata = await db.collection("metadata").findOne();
    await db.collection("metadata").updateOne(
      {},
      {
        $set: {
          totalBooksNum: metadata.totalBooksNum + 1,
          currentBooksNum: metadata.currentBooksNum + 1,
        },
        $push: {
          booksTitles: newBook.title,
          booksUrls: newBook.url,
        },
      }
    );

    client.close();
    return res.status(201).json({ message: "کتاب افزوده شد" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "مشکلی در سرور پیش آمده است" });
  }
}
