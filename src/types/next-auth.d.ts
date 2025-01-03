
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
   username: string
  }

  interface Session {
    user:  User & {
      username: string,
      _id: string,
      provider: string
    }
    token:{
      username:string,
      provider:string
    }
  }
}
