import { hashPassword, verifyPassword } from "@/utils/auth";
import { connectToDatabase } from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "ورود غیرمجاز" });
    return;
  }

  const email = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const client = await connectToDatabase();
  const user = await client.db().collection("users").findOne({ email: email });
  if (!user) {
    res.status(404).json({ message: "کاربری یافت نشد" });
    client.close();
    return;
  }
  const currentPassword = user.password;
  const equalPasswords = await verifyPassword(oldPassword, currentPassword);
  if (!equalPasswords) {
    res.status(403).json({ message: "رمز عبور قبلی اشتباه وارد شده است" });
    client.close();
    return;
  }
  const hashedNewPassword = await hashPassword(newPassword);
  const result = await client
    .db()
    .collection("users")
    .updateOne({ email: email }, { $set: { password: hashedNewPassword } });
  client.close();
  res.status(201).json({ message: "رمز عبور تغییر کرد" });
  return;
}
