import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-orange-500/30 flex items-center justify-center">
              <span className="font-mono text-xs text-orange-500 font-bold">TW</span>
            </div>
            <div>
              <p className="font-display font-bold text-[#ede8e0]/60 text-sm">Tanmay Wagh</p>
              <p className="font-mono text-xs text-[#ede8e0]/25">Java Full Stack Developer</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: 'https://github.com/tanmayyy05', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/tanmaywagh05/', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:tanmay3011w@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center border border-white/8 rounded-sm text-[#ede8e0]/30 hover:text-orange-400 hover:border-orange-500/30 transition-all duration-300"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          {/* Copyright & scroll up */}
          <div className="flex items-center gap-4">
            <p className="font-body text-xs text-[#ede8e0]/25 flex items-center gap-1.5">
              Built with <Heart size={10} className="text-orange-500/60" /> by Tanmay
            </p>
            <motion.button
              whileHover={{ y: -2 }}
              onClick={scrollToTop}
              className="w-8 h-8 flex items-center justify-center border border-white/8 rounded-sm text-[#ede8e0]/30 hover:text-orange-400 hover:border-orange-500/30 transition-all duration-300"
            >
              <ArrowUp size={14} />
            </motion.button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="font-mono text-xs text-[#ede8e0]/15">
            © {new Date().getFullYear()} Tanmay Wagh · Pune, Maharashtra, India · Open to Opportunities
          </p>
        </div>
      </div>
    </footer>
  )
}
