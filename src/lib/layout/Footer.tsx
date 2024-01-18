import Logo from '@/lib/assets/images/belle-logo.svg?react'

function Footer() {
  return (
    <footer className="bg-footer-texture flex h-[396px] w-full flex-col items-center justify-between px-20 pb-2.5 pt-[50px]">
      <div className="flex w-full items-start justify-between">
        <div className="w-[368px]">
          <Logo className="h-10 w-[117.09px]" />
          <div className="bg-sherpa-blue mt-[45px] h-[1px] w-full"></div>
        </div>
        <div className="mr-20">
          <h3 className="text-lg font-semibold">Information</h3>
          <li className="mt-2.5 space-y-2.5">
            <ul className="cursor-pointer">
              <a href="/">About Us</a>
            </ul>
            <ul className="cursor-pointer">
              <a href="/">Contact Us</a>
            </ul>
            <ul className="cursor-pointer">
              <a href="/">My Account</a>
            </ul>
          </li>
        </div>
      </div>
      <div className="pb-2.5 text-sm">
        <p>&copy; 2024 Belle Beauty. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
