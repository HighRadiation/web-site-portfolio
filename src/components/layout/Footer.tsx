import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="border-t border-gray-100 py-12 bg-white">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-secondary text-sm">
          © {new Date().getFullYear()} Academic Portfolio
        </p>
        
        <div className="flex items-center space-x-6">
          <Link href="https://linkedin.com" className="nav-link text-xs">LinkedIn</Link>
          <Link href="https://github.com" className="nav-link text-xs">GitHub</Link>
          <Link href="https://twitter.com" className="nav-link text-xs">Twitter</Link>
          <Link href="/rss" className="nav-link text-xs">RSS</Link>
        </div>
      </div>
    </footer>
  )
}
