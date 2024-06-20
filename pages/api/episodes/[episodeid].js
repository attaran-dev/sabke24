import { connectToDatabase } from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    // console.log("req:", req);
    // console.log("queryb:", req.query);
    const episodeId = req.query.episodeid;
    const client = await connectToDatabase();
    const db = client.db();
    const oldEpisode = await db.collection("episodes").findOne({ id: episodeId });
    if (oldEpisode) {
      const result = await db.collection("episodes").deleteOne({ id: episodeId });
      if (result.deletedCount === 1) {
        const metadata = await db.collection("metadata").findOne();
        await db.collection("metadata").updateOne(
          {},
          {
            $set: {
              currentEpisodesNum: metadata.currentEpisodesNum - 1,
            },
          }
        );
        await db.collection("metadata").updateOne(
          {},
          {
            $pull: {
              episodesTitles: oldEpisode.title,
              episodesUrls: oldEpisode.url,
            },
          }
        );

        res.status(201).json({
          message: "اپیزود حذف شد",
        });
      } else {
        res.status(500).json({
          message: "مشکلی در سرور پیش آمده است",
        });
      }
    } else {
      res.status(409).json({
        message: "اپیزودی با این مشخصات یافت نشد",
      });
    }
  } else if (req.method === "PUT") {
    const client = await connectToDatabase();
    const db = client.db();

    const episodeId = req.query.episodeid;
    const editedEpisode = req.body;
    const oldEpisode = await db.collection("episodes").findOne({ id: episodeId });

    if (oldEpisode) {
      const result = await db
        .collection("episodes")
        .replaceOne({ id: episodeId }, editedEpisode);

      if (result.modifiedCount === 1) {
        // console.log("oldEpisodeTitle:", oldEpisode.title);
        // console.log("editedEpisodeTitle:", editedEpisode.title);
        // await db.collection("metadata").updateMany(
        //   {},
        //   {
        //     $pull: {
        //       episodesTitles: oldEpisode.title,
        //       episodesUrls: oldEpisode.url,
        //     },
        //     $push: {
        //       episodesTitles: editedEpisode.title,
        //       episodesUrls: editedEpisode.url,
        //     },
        //   }
        // );
        // console.log("editedEpisodeTitle:", editedEpisode.title);
        await db.collection("metadata").updateOne(
          {},
          {
            $pull: {
              episodesTitles: oldEpisode.title,
              episodesUrls: oldEpisode.url,
            },
          }
        );
        await db.collection("metadata").updateOne(
          {},
          {
            $push: {
              episodesTitles: editedEpisode.title,
              episodesUrls: editedEpisode.url,
            },
          }
        );
        res.status(201).json({
          message: "اپیزود تغییر کرد",
          editedEpisode: editedEpisode,
        });
      } else {
        res.status(500).json({
          message: "مشکلی در سرور پیش آمده است",
        });
      }
    } else {
      res.status(409).json({
        message: "اپیزودی با این مشخصات یافت نشد",
      });
    }
  } else {
    res.status(200).json({ message: "nice try." });
  }
}
