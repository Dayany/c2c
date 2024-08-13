import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import User from "@/models/user.js";
import { connectToDatabase } from "@/utils/database";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();
          let user = null;
          const userExists = await User.findOne({
            email: credentials?.username,
          });

          if (!userExists) {
            user = await User.create({
              email: credentials?.username.toLowerCase(),
              username: credentials?.username.toLowerCase(),
            });
          } else {
            user = userExists;
          }

          return user ? user : null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
};
