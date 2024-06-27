import { connectToDatabase } from "@/utils/db";

export default async function handler(req, res){

    const {token} = req.query;
    const client = await connectToDatabase();
    const db = client.db();
    const users = db.collection("users");
    const user = await users.findOne({activationToken: token});
    if (!user){
        return res.status(400).json({message: "لینک فعال‌سازی معتبر نیست یا منقضی شده است"})
    }
    await users.updateOne({activationToken:token}, {$set:{isActive: true}, $unset:{activationToken: ''}});
    client.close();
    res.status(201).send(`<!DOCTYPE html>
      <html lang="fa">
      <head>
      <meta charset="UTF-8">
        <title>فعال‌سازی موفق</title>
        <meta http-equiv="refresh" content="5;url=/login" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
      </head>
      <body dir="rtl">
      <div style="height:100vh;width:100vw;display:flex;justify-content:center;align-items:center;text-align:center;font-family:"Rubik",sans-serif;">
        <div>حساب کاربری شما فعال شد. به صفحهٔ ورود منتقل می‌شوید.</div>
        <script>
          setTimeout(function() {
            window.location.href='/login';
          }, 2000);
        </script>
        </div>
      </body>
      </html>`);
    return
     
}