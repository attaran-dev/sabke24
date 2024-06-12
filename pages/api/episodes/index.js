import { writeFile } from 'fs/promises';
import { join } from 'path';
import { connectToDatabase } from "@/utils/db";

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '30mb',
      },
    },
  };

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end(); // Method Not Allowed
    }

    const { id, title, url, creationDate , brief, file } = req.body;
    if (!title || !url || !file) {
      return res.status(400).json({ message: 'بعضی اطلاعات لازم دریافت نمی‌شوند' });
    }

    const bytes = Buffer.from(file, 'base64'); // Convert base64 to buffer
    const filePath = join(process.cwd(),'public' ,'radio', `${url}.mp3`);
    const newEpisode = {id, title, url, creationDate, brief, filePath}
    console.log(filePath);
    await writeFile(filePath, bytes);
    const client = await connectToDatabase();
    const db = client.db();
    await db.collection("episodes").insertOne(newEpisode);
    const metadata = await db.collection("metadata").findOne();
    await db.collection("metadata").updateOne(
      {},
      {
        $set: {
          totalEpisodesNum: metadata.totalEpisodesNum + 1,
          currentEpisodesNum: metadata.currentEpisodesNum + 1,
        },
        $push: {
          episodesTitles: newEpisode.title,
          episodesUrls: newEpisode.url,
        }
      }
    );

client.close();
    return res.status(201).json({ message: "اپیسود افزوده شد" });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: "مشکلی در سرور پیش آمده است" });
  }
}