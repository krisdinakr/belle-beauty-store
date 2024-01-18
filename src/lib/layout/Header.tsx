function Header() {
  return (
    <header>
      <nav className="flex h-16 w-full items-center px-20 py-2.5">
        <a href="/">
          <img
            src="/assets/images/logo.png"
            alt="Belle Logo"
            className="h-8"
          />
        </a>
        <li className="flex">
          <ul>Categories</ul>
          <ul>Brands</ul>
        </li>
        <div>
          <img
            src="/assets/icons/search.svg"
            alt="search icon"
          />
          <input type="text" />
        </div>
      </nav>
    </header>
  )
}

export default Header
