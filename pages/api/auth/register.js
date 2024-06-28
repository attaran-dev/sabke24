import { hashPassword } from "@/utils/auth";
import { connectToDatabase } from "@/utils/db";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

async function sendActivationLink(userEmail, activationLink) {
  const transporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_EMAIL_HOST,
    port: process.env.NEXT_PUBLIC_EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.NEXT_PUBLIC_EMAIL_FROM,
    to: userEmail,
    subject: "فعال‌سازی حساب کاربری",
    html: `
    <!DOCTYPE html>
      <html lang="fa">
      <head>
      <meta charset="UTF-8">
              <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
      </head>
      <body dir="rtl">
    <div style="width:100vw;display:flex;flex-direction:column;gap:1rem;justify-content: center;	align-items: center;margin-top: 32px;margin-bottom: 32px;text-align:center;font-family: "Rubik", sans-serif;">
    <h1 style="font-size: 1.875rem;font-weight: 900;color: rgb(17 94 89);">سبک ۲۴</h1>    
    <p>
    لطفاً با کلیک روی لینک زیر حساب خود را فعال کنید:
    </p>
    <a href=${activationLink} style="color:white;background-color:rgb(17 94 89);border-radius: 0.25rem;padding:8px;text-decoration-line:none;">فعال‌سازی حساب کاربری</a>
    </div>
    </body>
    </html>
    `,
  };

  await transporter.sendMail(mailOptions)
}

export default async function helper(req, res) {
  if (req.method === "POST") {
    const { username, password, email } = req.body;
    const hashPass = await hashPassword(password);
    const token = uuidv4();
          const client = await connectToDatabase();
      const db = client.db();
    if (username.trim().length > 3 && email.includes("@")) {

      const userResult = await db
        .collection("users")
        .findOne({ username: username });
      const emailResult = await db
        .collection("users")
        .findOne({ email: email });
      if (!userResult && !emailResult) {
        await db.collection("users").insertOne({
          username: username,
          password: hashPass,
          email: email,
          creationDate: Date.now(),
          role: "user",
          isActive: false,
          activationToken: token,
        });
        const activationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/activate?token=${token}`;
        await sendActivationLink(email, activationLink);
        res.status(201).json({ message: "حساب کاربری ایجاد شد" });

      } else {
        res
          .status(422)
          .json({ message: "نام کاربری یا ایمیل قبلاً ثبت شده است" });

      }
    } else if (username.trim().length < 4) {
      res
        .status(422)
        .json({ message: "نام کاربری باید دست کم چهار حرف داشته باشد" });

    } else if (!email.includes("@")) {
      res.status(422).json({ message: "ایمیل واردشده معتبر نیست" });
    }
    client.close();
  }
}
