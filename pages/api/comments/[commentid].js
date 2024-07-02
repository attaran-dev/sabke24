import { connectToDatabase } from "@/utils/db";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "درخواست نامعتبر" });
  }
  if (req.method === "DELETE") {
    // console.log("req:", req);
    // console.log("queryb:", req.query);
    const commentId = req.query.commentid;
    const client = await connectToDatabase();
    const db = client.db();
    const result = await db.collection("comments").deleteOne({ id: commentId });
    if (result.deletedCount === 1) {
      const metadata = await db.collection("metadata").findOne();
      await db.collection("metadata").updateOne(
        {},
        {
          $set: {
            currentCommentsNum: metadata.currentCommentsNum - 1,
          },
        }
      );

      res.status(201).json({
        message: "کامنت حذف شد",
      });
    } else {
      res.status(500).json({
        message: "مشکلی در سرور پیش آمده است",
      });
    }
  }
}
