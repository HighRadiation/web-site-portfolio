import Link from 'next/link'

export const Navbar = (): React.JSX.Element => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50
      bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container h-16 flex items-center justify-between">
        {/* Left: Brand */}
        <Link
          href="/"
          className="text-lg font-serif font-bold
            text-black no-underline hover:opacity-70
            transition-opacity"
        >
          Buğra Öksüz
        </Link>

        {/* Center: Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/timeline" className="nav-link">Timeline</Link>
          <Link href="/projects" className="nav-link">Projects</Link>
          <Link href="/blog" className="nav-link">Blog</Link>
        </div>

        {/* Right: Contact Button */}
        <div>
          <Link href="/contact" className="btn btn-primary">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}
