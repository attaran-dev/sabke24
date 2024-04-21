import { connectToDatabase } from "@/utils/db";

export default async function helper(req, res) {
  if (req.method !== "PUT") {
    res.status(405).json({ message: "این درخواست مجاز نیست" });
    return;
  }
  const client = await connectToDatabase();
  const db = client.db();
  const pageId = req.query.pageid;
  const editedContent = req.body.content;
  const pageType = req.body.pageType;
  const updateQueryKey = `${pageType}.name`;
  const updateAssignmentKey = `${pageType}.$.content`;
  const result = await db
    .collection("pagesContents")
    .updateOne(
      { [updateQueryKey]: pageId },
      { $set: { [updateAssignmentKey]: editedContent } }
    );
  if (result.matchedCount !== 1) {
    res.status(409).json({ message: "صفحه‌ای با این مشخصات یافت نشد" });
    client.close();
    return;
  }
  if (result.modifiedCount !== 1) {
    res.status(501).json({ message: "مشکلی در سرور پیش آمده است" });
    client.close();
    return;
  }
  res.status(201).json({ message: "محتوای صفحه تغییر کرد" });
  client.close();
  return;
}
