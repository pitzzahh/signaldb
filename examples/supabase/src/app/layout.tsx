import './globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo Example | SignalDB',
  description: 'Todo Example app for SignalDB using Next.js and Supabase',
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <h1>SignalDB Supabase Example - Todo App</h1>
          <p className="subline">
            <a href="https://github.com/maxnowack/signaldb/tree/main/examples/supabase/src/containers/App/index.tsx" target="_blank" rel="noopener">Take a look a the code</a>
            <a href="/">Back to documentation</a>
          </p>
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout
