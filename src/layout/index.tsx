import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from '@/components/ui/toaster'

type LayoutProps = {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <Toaster />
    </>
  )
}

export default Layout
