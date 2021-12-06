import 'tailwindcss/tailwind.css'
import { SessionProvider } from "next-auth/react"


process.env['GOOGLE_CLIENT_ID'] = "917430126285-bt1kgqks0m9shhu66pgv6738gkc55h7h.apps.googleusercontent.com"
process.env['GOOGLE_CLIENT_SECRET'] = "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"


function MyApp({ Component, pageProps, session }) {
  return (
  <SessionProvider session={session}>
  <Component {...pageProps} />
  </SessionProvider>
  )
}

export default MyApp
