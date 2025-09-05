
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <div className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        {/* <Analytics /> */}
      </div>
  )
}
