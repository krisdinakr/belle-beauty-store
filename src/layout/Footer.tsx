import Logo from '@/assets/images/belle-logo.svg?react'

function Footer() {
  return (
    <footer className="flex h-[396px] w-full flex-col items-center justify-between bg-footer-texture p-5 pb-2.5 lg:px-20 lg:pt-[50px]">
      <div className="flex w-full flex-col items-start justify-between gap-8 lg:flex-row">
        <div className="w-full lg:w-[368px]">
          <Logo className="h-10 w-[117.09px]" />
          <div className="mt-[45px] h-[1px] w-full bg-sherpa-blue"></div>
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
