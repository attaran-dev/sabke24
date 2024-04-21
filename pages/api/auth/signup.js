import { hashPassword } from "@/utils/auth";
import { connectToDatabase } from "@/utils/db";

export default async function helper(req, res) {
  if (req.method === "POST") {
    const { username, password, email } = req.body;
    const hashPass = await hashPassword(password);
    if (username.trim().length > 3 && email.includes("@")) {
      const client = await connectToDatabase();
      const db = client.db();
      const userResult = await db
        .collection("users")
        .findOne({ username: username });
      const emailResult = await db
        .collection("users")
        .findOne({ email: email });
      if (!userResult && !emailResult) {
        await db
          .collection("users")
          .insertOne({ username: username, password: hashPass, email: email });
        res.status(201).json({ message: "حساب کاربری ایجاد شد" });
        client.close()
      } else {
        res
          .status(422)
          .json({ message: "نام کاربری یا ایمیل قبلاً ثبت شده است" });
          client.close()
      }
    } else if (username.trim().length < 4) {
      res
        .status(422)
        .json({ message: "نام کاربری باید دست کم چهار حرف داشته باشد" });
        client.close()
    } else if (!email.includes("@")) {
      res.status(422).json({ message: "ایمیل واردشده معتبر نیست" });
      client.close()
    }
  }
}
