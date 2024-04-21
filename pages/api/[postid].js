import { connectToDatabase } from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    // console.log("req:", req);
    // console.log("queryb:", req.query);
    const postId = req.query.postid;
    const client = await connectToDatabase();
    const db = client.db();
    const oldPost = await db.collection("posts").findOne({ id: postId });
    if (oldPost) {
      const result = await db.collection("posts").deleteOne({ id: postId });
      if (result.deletedCount === 1) {
        const metadata = await db.collection("metadata").findOne();
        await db.collection("metadata").updateOne(
          {},
          {
            $set: {
              currentPostsNum: metadata.currentPostsNum - 1,
            },
          }
        );
        await db.collection("metadata").updateOne(
          {},
          {
            $pull: {
              postsTitles: oldPost.title,
              postsUrls: oldPost.url,
            },
          }
        );

        res.status(201).json({
          message: "پست حذف شد",
        });
      } else {
        res.status(500).json({
          message: "مشکلی در سرور پیش آمده است",
        });
      }
    } else {
      res.status(409).json({
        message: "پستی با این مشخصات یافت نشد",
      });
    }
  } else if (req.method === "PUT") {
    const client = await connectToDatabase();
    const db = client.db();

    const postId = req.query.postid;
    const editedPost = req.body;
    const oldPost = await db.collection("posts").findOne({ id: postId });

    if (oldPost) {
      const result = await db
        .collection("posts")
        .replaceOne({ id: postId }, editedPost);

      if (result.modifiedCount === 1) {
        // console.log("oldPostTitle:", oldPost.title);
        // console.log("editedPostTitle:", editedPost.title);
        // await db.collection("metadata").updateMany(
        //   {},
        //   {
        //     $pull: {
        //       postsTitles: oldPost.title,
        //       postsUrls: oldPost.url,
        //     },
        //     $push: {
        //       postsTitles: editedPost.title,
        //       postsUrls: editedPost.url,
        //     },
        //   }
        // );
        // console.log("editedPostTitle:", editedPost.title);
        await db.collection("metadata").updateOne(
          {},
          {
            $pull: {
              postsTitles: oldPost.title,
              postsUrls: oldPost.url,
            },
          }
        );
        await db.collection("metadata").updateOne(
          {},
          {
            $push: {
              postsTitles: editedPost.title,
              postsUrls: editedPost.url,
            },
          }
        );
        res.status(201).json({
          message: "پست تغییر کرد",
          editedPost: editedPost,
        });
      } else {
        res.status(500).json({
          message: "مشکلی در سرور پیش آمده است",
        });
      }
    } else {
      res.status(409).json({
        message: "پستی با این مشخصات یافت نشد",
      });
    }
  } else {
    res.status(200).json({ message: "nice try." });
  }
}
