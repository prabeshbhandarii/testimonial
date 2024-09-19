import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    })
  ]
})

export { handler as GET, handler as POST }



// ,
//   callbacks: {
//     async session({ session, token }) {
//       // Include the token's user ID in the session object
//       if (token) {
//         //@ts-ignore
//         session.user.id = token.sub;
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       // Attach user ID to the JWT token
//       if (user) {
//         token.sub = user.id;
//       }
//       return token;
//     }
//   }