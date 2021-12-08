import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  providers: [
    GoogleProvider({
        clientId: '917430126285-bt1kgqks0m9shhu66pgv6738gkc55h7h.apps.googleusercontent.com',
        clientSecret: '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',
    })
  ],
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    }
  }
})