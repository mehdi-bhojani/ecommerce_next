import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcryptjs';
import { UserModel } from '@/lib/models/user'; // Adjust the import according to your project structure
import { NextAuthOptions, Session, User, Account, Profile } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from "next-auth/providers/google"
import { getUserByEmail, signInWithCredentials, signInWithOauth } from './actions/auth.actions';

// Extend the User type to include the username property
interface ExtendedUser {
  id: string;
  username: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
    error: '/error',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!
  }),
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email", required: true },
      password: { label: "Password", type: "password", required: true }
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error('Email and password are required');
      }

      const user = await signInWithCredentials({
        email: credentials?.email,
        password: credentials?.password
      })
      console.log({ user });
      const newUser =
      {
        ...user,
        name: user.username,
      };
      console.log({ newUser });
      return newUser;
    }
  })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      console.log(account, profile);
      if (account?.type === "oauth" && profile) {
        return await signInWithOauth({ account, profile });
      }
      return true;
    },
    async jwt({ token, trigger, session }) {
      if (trigger === "update") {
        token.name = session.name
      } else {
        if (token.email) {
          const user = await getUserByEmail({ email: token.email })
          token.name = user.username
          token._id = user._id
          token.role = user.role
          token.provider = user.provider
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
          _id: token._id,
          role: token.role,
          provider: token.provider
        }
      }
    }
  }
};

export default authOptions;