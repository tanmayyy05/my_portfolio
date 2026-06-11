import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ['about', 'skills', 'projects', 'experience', 'contact']
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div className={`mx-auto max-w-6xl px-6 transition-all duration-500 ${
          scrolled ? 'bg-[#080808]/80 backdrop-blur-xl border-b border-white/5 rounded-none' : ''
        }`}>
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded border border-orange-500/40 flex items-center justify-center group-hover:border-orange-500 transition-colors duration-300">
                <span className="font-mono text-xs text-orange-500 font-bold">TW</span>
              </div>
              <span className="font-display font-bold text-sm tracking-widest uppercase text-[#ede8e0]/60 group-hover:text-[#ede8e0] transition-colors duration-300">
                Tanmay
              </span>
            </button>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '')
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    className={`relative px-4 py-2 font-body text-sm transition-all duration-300 ${
                      isActive ? 'text-orange-400' : 'text-[#ede8e0]/50 hover:text-[#ede8e0]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-orange-500/10 rounded-sm border border-orange-500/20"
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                )
              })}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-body border border-orange-500/40 text-orange-400 hover:bg-orange-500/10 hover:border-orange-500 transition-all duration-300 rounded-sm"
              >
                Resume
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-[#ede8e0]/60 hover:text-orange-400 transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-[#0d0d0d]/95 backdrop-blur-xl border-b border-white/5 md:hidden"
          >
            <div className="flex flex-col p-6 gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNav(link.href)}
                  className="text-left py-3 px-4 text-[#ede8e0]/70 hover:text-orange-400 font-body border border-transparent hover:border-orange-500/20 rounded-sm transition-all duration-200"
                >
                  {link.label}
                </motion.button>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 py-3 px-4 text-center border border-orange-500/40 text-orange-400 hover:bg-orange-500/10 rounded-sm font-body transition-all"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
