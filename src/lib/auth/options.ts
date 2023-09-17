import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role } from "@prisma/client";
import { randomUUID } from "crypto";
import NextAuth, { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../database";
import { sendMagicLinkEmail } from "../email/mailer";

export const authOptions = {
  session: {
    strategy: "database",
  },
  pages: {
    signIn: "/auth/sign-in",
    verifyRequest: "/auth/magic-link-sent",
    newUser: "/onboarding/account",
  },
  callbacks: {
    async session({ session, token, user }) {
      const db = await prisma.user.findFirst({ where: { id: user.id } });

      if (db) {
        session.user.id = db.id;
        session.user.first_name = db.name ?? "";
        session.user.last_name = db.last_name ?? "";
        session.user.onboarded = db.onboarded ?? false;
        session.user.phone_number = db.phone_number ?? "";
        session.user.stripe_customer_id = db.customer_id ?? "";
        session.user.role = db.role ?? Role.USER;
      }

      return session;
    },
  },
  providers: [
    EmailProvider({
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        await sendMagicLinkEmail(email, url);
      },
      async generateVerificationToken() {
        return "magic_link_" + randomUUID();
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  adapter: PrismaAdapter(prisma),
} as AuthOptions;

export default NextAuth(authOptions);
