import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, ExternalLink } from 'lucide-react'

const certifications = [
  {
    title: 'Java Programming Fundamentals',
    issuer: 'Coursera / NPTEL',
    date: '2024',
    status: 'Completed',
    skills: ['Java', 'OOP', 'Data Structures'],
    color: 'orange',
    link: '#',
  },
  {
    title: 'React - The Complete Guide',
    issuer: 'Udemy',
    date: '2024',
    status: 'Completed',
    skills: ['React', 'JSX', 'Hooks', 'State Management'],
    color: 'blue',
    link: '#',
  },
  {
    title: 'Spring Boot & REST APIs',
    issuer: 'Udemy',
    date: '2024',
    status: 'In Progress',
    skills: ['Spring Boot', 'REST API', 'MVC', 'JPA'],
    color: 'green',
    link: '#',
  },
  {
    title: 'Git & GitHub Complete Course',
    issuer: 'freeCodeCamp',
    date: '2023',
    status: 'Completed',
    skills: ['Git', 'GitHub', 'Version Control'],
    color: 'purple',
    link: '#',
  },
]

export default function Certifications() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="certifications" ref={ref} className="relative py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="tag mb-3">✦ Credentials</p>
          <h2 className="section-heading text-[#ede8e0]">
            CERTIFICATIONS &<br />
            <span className="gradient-text">ACHIEVEMENTS</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group glass glow-border rounded-xl p-5 hover:bg-orange-500/3 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <Award size={18} className="text-orange-400" />
                </div>
                <span className={`font-mono text-[9px] px-2 py-0.5 rounded-full border ${
                  cert.status === 'Completed'
                    ? 'bg-green-500/10 text-green-400 border-green-500/25'
                    : 'bg-orange-500/10 text-orange-400 border-orange-500/25'
                }`}>
                  {cert.status}
                </span>
              </div>

              <h3 className="font-display font-bold text-[#ede8e0]/85 text-sm leading-snug mb-1">{cert.title}</h3>
              <p className="font-body text-xs text-[#ede8e0]/35 mb-1">{cert.issuer}</p>
              <p className="font-mono text-xs text-orange-500/50 mb-4">{cert.date}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {cert.skills.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[10px] px-2 py-0.5 bg-[#141414] border border-white/6 text-[#ede8e0]/35 rounded-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <a
                href={cert.link}
                className="flex items-center gap-1.5 font-mono text-[10px] text-[#ede8e0]/25 hover:text-orange-400 transition-colors"
              >
                <ExternalLink size={10} />
                View Certificate
              </a>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center font-body text-xs text-[#ede8e0]/20 mt-8"
        >
          * Certifications are illustrative. Update with actual certificates when obtained.
        </motion.p>
      </div>
    </section>
  )
}
