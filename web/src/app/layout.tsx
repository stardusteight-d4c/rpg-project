import type { Metadata } from "next"
import { Delius } from "next/font/google"
import localFont from "next/font/local"
import { getServerSession } from "next-auth"
import { Providers } from "@/shared/contexts/providers"
import { authOptions } from "@/shared/libs/next_auth"
import "./globals.css"

const robotoCondensed = localFont({
  src: [
    {
      path: "../../public/fonts/Roboto_Condensed/static/RobotoCondensed-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/Roboto_Condensed/static/RobotoCondensed-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Roboto_Condensed/static/RobotoCondensed-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Roboto_Condensed/static/RobotoCondensed-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Roboto_Condensed/static/RobotoCondensed-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Roboto_Condensed/static/RobotoCondensed-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Roboto_Condensed/static/RobotoCondensed-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-roboto-condensed",
  display: "swap",
})

const delius = Delius({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-delius",
})

export const metadata: Metadata = {
  title: "Campfire | The RPG Beyond the Table",
  description: "Online Tabletop RPG",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body
        className={`${robotoCondensed.className} ${delius.variable} antialiased`}
      >
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  )
}
