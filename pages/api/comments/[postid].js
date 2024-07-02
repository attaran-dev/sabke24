import { connectToDatabase } from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const postId = req.query.postid;
    const client = await connectToDatabase();
    const db = client.db();
    const metadata = await db.collection("metadata").findOne();
    const commnetId = metadata.totalCommentsNum + 1;
    const { username, creationDate, comment } = req.body;
    const result = await db
      .collection("posts")
      .updateOne(
        { id: postId },
        { $push: { comments: { commnetId, username, creationDate, comment } } }
      );
    if (result.modifiedCount === 1) {
      await db.collection("metadata").updateOne(
        {},
        {
          $set: {
            totalCommentsNum: metadata.totalCommentsNum + 1,
            currentCommentsNum: metadata.currentCommentsNum + 1,
          },
        }
      );
      res.status(201).json({ message: "نظر شما ثبت شد" });
    } else {
      res.status(500).json({
        message: "مشکلی در سرور پیش آمده است",
      });
    }
    client.close();
    return;
  }
}
