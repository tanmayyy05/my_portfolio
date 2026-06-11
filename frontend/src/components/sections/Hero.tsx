import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowDown, Code2, Cpu } from 'lucide-react'
import profileImg from '../../assets/profile.png'

const roles = ['Java Developer', 'Full Stack Dev', 'Spring Boot', 'React Builder']

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 122, 0, ${p.opacity})`
        ctx.fill()
      })

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(255, 122, 0, ${(1 - dist / 100) * 0.08})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animId = requestAnimationFrame(animate)
    }

    animate()

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Grid lines */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />

      {/* Gradient fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080808] to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left content */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 border border-orange-500/20 rounded-full bg-orange-500/5"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-xs text-[#ede8e0]/60 tracking-widest">AVAILABLE FOR OPPORTUNITIES</span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-display font-extrabold text-[clamp(2.8rem,7vw,5rem)] leading-[0.95] tracking-[-0.04em] text-[#ede8e0] mb-4">
                TANMAY
                <br />
                <span className="gradient-text">WAGH</span>
              </h1>
            </motion.div>

            {/* Role ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 mb-6 overflow-hidden"
            >
              <div className="w-8 h-px bg-orange-500/60" />
              <div className="flex gap-2 overflow-hidden">
                {roles.map((role, i) => (
                  <motion.span
                    key={role}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className={`font-mono text-xs tracking-widest uppercase px-2 py-1 rounded-sm ${
                      i === 0
                        ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
                        : 'text-[#ede8e0]/30'
                    }`}
                  >
                    {role}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="font-body text-[#ede8e0]/55 text-base leading-relaxed mb-8 max-w-lg"
            >
              Aspiring Java Full Stack Developer pursuing B.Tech in Computer Science (AI) at G.H. Raisoni College, Pune.
              Building production-ready apps with Spring Boot and React.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-2 px-6 py-3 bg-orange-500 text-[#080808] font-display font-bold text-sm tracking-wide rounded-sm hover:bg-orange-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,122,0,0.4)]"
              >
                <Code2 size={16} />
                View Projects
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-6 py-3 border border-[#ede8e0]/15 text-[#ede8e0]/70 font-display font-bold text-sm tracking-wide rounded-sm hover:border-orange-500/40 hover:text-orange-400 transition-all duration-300"
              >
                <Mail size={16} />
                Get In Touch
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-4"
            >
              <span className="font-mono text-xs text-[#ede8e0]/30 tracking-widest">FIND ME ON</span>
              <div className="flex gap-3">
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
                    className="w-9 h-9 flex items-center justify-center border border-white/10 rounded-sm text-[#ede8e0]/40 hover:text-orange-400 hover:border-orange-500/40 transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Rotating ring */}
              <div className="absolute inset-[-24px] rounded-full border border-orange-500/10 animate-spin-slow" />
              <div className="absolute inset-[-48px] rounded-full border border-orange-500/5" style={{ animationDuration: '12s' }} />

              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl bg-orange-500/10 blur-3xl" />

              {/* Image frame */}
              <div className="relative w-72 h-80 lg:w-80 lg:h-96 rounded-2xl overflow-hidden border border-orange-500/20 glow-border">
                <img
                  src={profileImg}
                  alt="Tanmay Wagh"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/40 via-transparent to-transparent" />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -left-6 top-16 glass glow-border rounded-xl px-3 py-2 flex items-center gap-2"
              >
                <Cpu size={14} className="text-orange-400" />
                <span className="font-mono text-xs text-[#ede8e0]/80">Java 21</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -right-6 bottom-20 glass glow-border rounded-xl px-3 py-2"
              >
                <span className="font-mono text-xs text-[#ede8e0]/80">Spring Boot ⚡</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
                className="absolute -right-4 top-8 glass glow-border rounded-xl px-3 py-2"
              >
                <span className="font-mono text-xs text-orange-400">React ✦</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          onClick={scrollToAbout}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#ede8e0]/30 hover:text-orange-400 transition-colors"
        >
          <span className="font-mono text-xs tracking-widest">SCROLL</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowDown size={16} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}
