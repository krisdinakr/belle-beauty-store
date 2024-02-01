import { Link } from 'react-router-dom'

import Logo from '@/assets/images/belle-logo.svg'
import Navbar from './Navbar'

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="relative flex h-16 w-full items-center justify-between px-5 py-2.5 lg:h-[75px] lg:px-20">
        <Link to="/">
          <img
            src={Logo}
            alt="Belle Logo"
            className="h-6 lg:h-8"
          />
        </Link>

        <Navbar />
      </div>
    </header>
  )
}

export default Header
