import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Download, Eye, FileText, CheckCircle } from 'lucide-react'

const highlights = [
  'Java Full Stack Developer',
  'Spring Boot & REST APIs',
  'React Frontend Development',
  'MySQL & Database Design',
  'Git & Version Control',
  'Problem Solving & DSA',
]

export default function Resume() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="resume" ref={ref} className="relative py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="tag mb-4">✦ Download</p>
            <h2 className="section-heading text-[#ede8e0] mb-6">
              MY
              <br />
              <span className="gradient-text">RESUME</span>
            </h2>
            <p className="font-body text-[#ede8e0]/50 text-base leading-relaxed mb-8">
              Get a complete overview of my skills, education, and projects. My resume is kept up-to-date with the latest work and skills.
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map((h, i) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="flex items-center gap-3 font-body text-sm text-[#ede8e0]/60"
                >
                  <CheckCircle size={14} className="text-orange-400 shrink-0" />
                  {h}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <a
                href="/resume.pdf"
                download="Tanmay_Wagh_Resume.pdf"
                className="group flex items-center gap-2 px-6 py-3 bg-orange-500 text-[#080808] font-display font-bold text-sm rounded-sm hover:bg-orange-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,122,0,0.4)]"
              >
                <Download size={16} />
                Download PDF
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-white/15 text-[#ede8e0]/60 font-display font-bold text-sm rounded-sm hover:border-orange-500/40 hover:text-orange-400 transition-all duration-300"
              >
                <Eye size={16} />
                View Online
              </a>
            </div>
          </motion.div>

          {/* Right — resume preview card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-orange-500/5 blur-3xl" />

            <div className="relative glass glow-border rounded-2xl p-8">
              {/* Mock resume header */}
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-white/5">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <FileText size={20} className="text-orange-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-[#ede8e0] text-lg">Tanmay Bharat Wagh</h3>
                  <p className="font-body text-sm text-[#ede8e0]/50">Java Full Stack Developer</p>
                  <p className="font-mono text-xs text-orange-500/60 mt-1">Pune, Maharashtra, India</p>
                </div>
              </div>

              {/* Mock sections */}
              {[
                { label: 'Summary', lines: 2 },
                { label: 'Technical Skills', lines: 3 },
                { label: 'Projects', lines: 4 },
                { label: 'Education', lines: 2 },
              ].map((section) => (
                <div key={section.label} className="mb-5">
                  <p className="font-mono text-xs text-orange-500/50 tracking-widest mb-2 uppercase">{section.label}</p>
                  <div className="space-y-1.5">
                    {Array.from({ length: section.lines }).map((_, i) => (
                      <div
                        key={i}
                        className="h-2 rounded-full bg-[#ede8e0]/8"
                        style={{ width: `${70 + Math.random() * 25}%`, opacity: 0.6 - i * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {/* Download overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-[#080808]/80 backdrop-blur-sm opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <a
                  href="/resume.pdf"
                  download="Tanmay_Wagh_Resume.pdf"
                  className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-[#080808] font-display font-bold text-sm rounded-sm hover:bg-orange-400 transition-colors"
                >
                  <Download size={16} />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
