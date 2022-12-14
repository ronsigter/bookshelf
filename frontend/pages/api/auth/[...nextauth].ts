import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { login } from 'services/auth'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        if (!credentials) return null
        const { username, password } = credentials as { username: string; password: string }
        const { data } = await login({ username, password })
        return data
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        if (user.token) {
          token = { accessToken: user.token }
        }
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}

export default NextAuth(authOptions)
