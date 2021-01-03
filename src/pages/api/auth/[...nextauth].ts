import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";


let prisma;

// FIXME: just for testing
const isCorrectCredentials = credentials =>
  //credentials.username === process.env.NEXTAUTH_USERNAME &&
  //credentials.password === process.env.NEXTAUTH_PASSWORD
  credentials.username === 'admin' &&
  credentials.password === 'admin'


if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async credentials => {
        if (isCorrectCredentials(credentials)) {
          const user = { id: 1, name: "Admin" }
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(user)
        } else {
          // If you return null or false then the credentials will be rejected
          return Promise.resolve(null)
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject('/path/to/redirect')        // Redirect to a URL
        }
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days,
    updateAge: 24 * 60 * 60, // 24 hours
  },
  adapter: Adapters.Prisma.Adapter({ prisma }),
}


//const options = {
//  providers: [
//    Providers.Google({
//      clientId: process.env.GOOGLE_CLIENT_ID,
//      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//    }),
//    // Providers.Twitter({
//    //   clientId: process.env.TWITTER_CLIENT_ID,
//    //   clientSecret: process.env.TWITTER_CLIENT_SECRET,
//    // }),
//  ],
//  adapter: Adapters.Prisma.Adapter({ prisma }),
//};
export default (req, res) => NextAuth(req, res, options);
