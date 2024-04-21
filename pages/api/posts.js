import { connectToDatabase } from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const newPost = req.body;
    const client = await connectToDatabase();
    const db = client.db();
    await db.collection("posts").insertOne(newPost);
    const metadata = await db.collection("metadata").findOne();
    await db.collection("metadata").updateOne(
      {},
      {
        $set: {
          totalPostsNum: metadata.totalPostsNum + 1,
          currentPostsNum: metadata.currentPostsNum + 1,
        },
        $push: {
          postsTitles: newPost.title,
          postsUrls: newPost.url,
        }
      }
    );
    res
      .status(201)
      .json({ message: "پست افزوده شد", addedPost: newPost });
    client.close();

    // const metaFilePath = path.join(process.cwd(), "data", "metadata.json");
    // const metaFileData = fs.readFileSync(metaFilePath);
    // let metadata = JSON.parse(metaFileData);
    // metadata = {...metadata, totalPostsNum: metadata.totalPostsNum+1, currentPostsNum: metadata.currentPostsNum+1};
    // fs.writeFileSync(metaFilePath, JSON.stringify(metadata));
    // res
    //   .status(201)
    //   .json({ message: "metadata updated successfully", updatedMetadata: metadata.totalPostsNum });
  } else {
    res.status(200).json({ message: "nice try." });
  }
}
