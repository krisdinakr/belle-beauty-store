import { Outlet } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import { Toaster } from '@/components/ui/toaster'

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  )
}

export default Layout
