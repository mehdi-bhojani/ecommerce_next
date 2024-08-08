import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcryptjs';
import { UserModel } from '@/lib/models/user'; // Adjust the import according to your project structure
import { NextAuthOptions, Session, User, Account, Profile } from 'next-auth';
import { JWT } from 'next-auth/jwt';


// Extend the User type to include the username property
interface ExtendedUser {
  id: string;
  username: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
interface ExtendedSession extends Session {
  user: ExtendedUser;
}


const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const existingUser = await UserModel.findOne({ email: credentials.email });

        if (!existingUser) {
          throw new Error('No user found with the provided email');
        }

        const isPasswordMatch = compareSync(credentials.password, existingUser.password);

        if (!isPasswordMatch) {
          throw new Error('Incorrect password');
        }

        // Return an object that matches the ExtendedUser type
        return {
          id: existingUser.id,
          email: existingUser.email,
          username: existingUser.username
        } as ExtendedUser;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger, isNewUser, session }: {
      token: JWT;
      user?: User;
      account: Account | null;
      profile?: Profile;
      trigger?: "signIn" | "signUp" | "update";
      isNewUser?: boolean;
      session?: any;
    }) {
      if (user) {
        const extendedUser = user as ExtendedUser;
        token.id = extendedUser.id;
        token.username = extendedUser.username;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const extendedSession = session as ExtendedSession;
      if (token) {
        extendedSession.user = extendedSession.user || {} as ExtendedUser;
        extendedSession.user.id = token.id as string;
        extendedSession.user.username = token.username as string;
      }
      return extendedSession;
    },
  }
};

export default authOptions;