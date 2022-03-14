import NextAuth, { EventCallbacks } from "next-auth";

import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, {
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt", maxAge: 1 * 1 * 1 * 100000 },

    // jwt: {
    //   maxAge: 30 * 24 * 30 * 60,
    //   async encode(params: {
    //     token: JWT
    //     secret: string
    //     maxAge: number
    //   }): Promise<string> {
    //     // return a custom encoded JWT string
    //     return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    //   },
    //   async decode(params: {
    //     token: string
    //     secret: string
    //   }: Promise<JWT | null>) {
    //     // return a `JWT` object, or `null` if decoding failed
    //     return { token }
    //   },
    // },
    providers: [
      // OAuth authentication providers
      FacebookProvider({
        clientId: process.env.FACEBOOK_ID!,
        clientSecret: process.env.FACEBOOK_SECRET!,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID!,
        clientSecret: process.env.GOOGLE_SECRET!,
      }),
      GithubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
      }),
      CredentialProvider({
        name: "NEXT AUTH",
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "Email",
          },
          password: {
            label: "Password",
            type: "password",
            placeholder: "Password",
          },
          location: {
            type: "text",
          },
        },
        async authorize(credentials, request) {
          // const user =
          if (
            credentials?.email === "jade@gmail.com" &&
            credentials?.password === "12345"
          ) {
            const user = {
              email: credentials?.email,
              password: credentials?.password,
              location: request?.body?.location,
            };
            return user;
          }
          return null;
        },
      }),
    ],
    pages: {
      signIn: "/",
      newUser: "/newUser",
    },
    callbacks: {
      // async signIn({ user, account, profile, email, credentials }) {
      //   console.log(credentials);
      //   return true;
      // },
      // async redirect({ url, baseUrl }) {
      //   return baseUrl;
      // },

      async session({ session, user, token }) {
        session.accessToken = token.accessToken;
        session.user = token.user as any;
        return session;
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        if (user) {
          token.user = user;
        }
        if (account) {
          token.accessToken = account.access_token;
        }

        return token;
      },
    },
  });
}
