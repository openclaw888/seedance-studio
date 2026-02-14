import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getDb } from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET_ID!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const db = getDb();
      const existing = await db.query("SELECT id FROM users WHERE email = $1", [user.email]);
      if (existing.rows.length === 0) {
        await db.query(
          "INSERT INTO users (email, name, image, created_at) VALUES ($1, $2, $3, NOW())",
          [user.email, user.name, user.image]
        );
      } else {
        await db.query(
          "UPDATE users SET last_login_at = NOW(), name = $2, image = $3 WHERE email = $1",
          [user.email, user.name, user.image]
        );
      }
      return true;
    },
    async session({ session }) {
      if (session.user?.email) {
        const db = getDb();
        const result = await db.query("SELECT id, remaining_credits FROM users WHERE email = $1", [session.user.email]);
        if (result.rows[0]) {
          (session.user as any).id = result.rows[0].id;
          (session.user as any).credits = result.rows[0].remaining_credits;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
