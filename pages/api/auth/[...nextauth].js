import { verifyPassword } from "@/utils/auth";
import { connectToDatabase } from "@/utils/db";
import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";

// const authOptions = {
//   providers: [
//     Providers.Credentials({
//       // name: "credentials",
//       // credentials: {},
//       async authorize(credentials) {
//         const client = await connectToDatabase();
//         const user = client
//           .db()
//           .collection("users")
//           .findOne({ email: credentials.email });
//         if (!user) {
//           throw new Error("کاربری با این ایمیل ثبت نشده است");
//         }
//         const isValid = await verifyPassword(
//           credentials.password,
//           user.password
//         );
//         if (!isValid) {
//           throw new Error("رمز عبور اشتباه است");
//         }
//         client.close();
//         return { email: user.email };
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/login",
//   },
// };

// const handler = NextAuth(authOptions);
// // export { handler as GET, handler as POST };
export const authOptions = {
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const user = await client
          .db()
          .collection("users")
          .findOne({ email: credentials.email });
        if (!user) {
          client.close();
          throw new Error("کاربری با این ایمیل ثبت نشده است");
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();
          throw new Error("رمز عبور اشتباه است");
        }
        client.close();
        return {
          name: user.username,
          email: user.email,
          isActive: user.isActive,
          role: user.role,
        };
      },
    }),
  ],
  secret: "d06Ntb4hNz7olU7WunHX14ppauvEW6EbBIn8cpap+Cs=",
};
export default NextAuth(authOptions);
