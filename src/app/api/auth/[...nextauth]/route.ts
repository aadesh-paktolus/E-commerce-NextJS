import { verifyPassword } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import User, { IUser } from "@/models/User";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;

        await connectToDatabase();

        const user = (await User.findOne({ email })) as IUser | null;

        if (!user) {
          return null;
        }

        const passwordsMatch = await verifyPassword(password, user.password);
        if (!passwordsMatch) {
          return null;
        }

        return { id: user._id.toString(), email: user.email };
      },
    }),
  ],
  pages: { signIn: "/auth/login" },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: { ...session.user, id: token.sub },
    }),
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
