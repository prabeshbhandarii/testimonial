// import NextAuth, { NextAuthOptions } from "next-auth"
// import DefaultSession from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { prisma } from "@/app/lib/db"
// import { Session } from "next-auth"
// import { AdapterUser } from "next-auth/adapters"

// declare module "next-auth" {
//   //@ts-expect-error: annoying error, plz solve
//   interface Session extends DefaultSession {
//     user?: {
//       id: string;
//       //@ts-expect-error: solve this plz
//     } & DefaultSession["user"]
//   }
// }

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
//     })
//   ],
//   callbacks: {
//     session: async ({ session, user }: { session: Session, user: AdapterUser }) => {
//       if (session?.user) {
//         session.user.id = user.id;
//       }
//       return session;
//     },
//   },
  
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }






import NextAuth from "next-auth";
import { authOptions } from "@/app/utils/auth";
// import { NextAuthOptions, DefaultSession } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "@/app/lib/db";
// import { Session } from "next-auth";
// import { AdapterUser } from "next-auth/adapters";

// declare module "next-auth" {
//   interface Session {
//     user?: {
//       id: string;
//     } & DefaultSession["user"];
//   }
// }

// const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
//     })
//   ],
//   callbacks: {
//     session: async ({ session, user }: { session: Session, user: AdapterUser }) => {
//       if (session?.user) {
//         session.user.id = user.id;
//       }
//       return session;
//     },
//   },
// };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
