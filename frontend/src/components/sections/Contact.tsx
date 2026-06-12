import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Github, Linkedin, MapPin, Send, Loader2 } from 'lucide-react'
import { useToast } from '../ui/use-toast'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'tanmay3011w@gmail.com',
    href: 'mailto:tanmay3011w@gmail.com',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/tanmayyy05',
    href: 'https://github.com/tanmayyy05',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'in/tanmaywagh05',
    href: 'https://www.linkedin.com/in/tanmaywagh05/',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Pune, Maharashtra, India',
    href: null,
  },
]

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { toast } = useToast()
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/contact`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      }
    )

    console.log('Status:', response.status)
    console.log('OK:', response.ok)

    const responseText = await response.text()
    console.log('Response:', responseText)

    if (response.ok) {
      toast({
        title: 'Message sent! ✦',
        description: "Thanks for reaching out. I'll get back to you soon.",
      })

      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } else {
      console.error('Backend Error:', responseText)
      throw new Error(`Server Error: ${response.status}`)
    }
  } catch (error) {
    console.error('Fetch Error:', error)

    const mailtoLink =
      `mailto:tanmay3011w@gmail.com?subject=${encodeURIComponent(form.subject)}` +
      `&body=${encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      )}`

    window.open(mailtoLink)

    toast({
      title: 'Opening email client',
      description:
        'Your email client has been opened with the message pre-filled.',
    })
  } finally {
    setLoading(false)
  }
}

  const inputClass = "w-full bg-[#111] border border-white/8 rounded-sm px-4 py-3 font-body text-sm text-[#ede8e0]/80 placeholder-[#ede8e0]/20 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-all duration-200"

  return (
    <section id="contact" ref={ref} className="relative py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="tag mb-3">✦ Let's Connect</p>
          <h2 className="section-heading text-[#ede8e0]">
            GET IN
            <br />
            <span className="gradient-text">TOUCH</span>
          </h2>
          <p className="font-body text-[#ede8e0]/40 max-w-md mx-auto mt-4 text-sm leading-relaxed">
            Open to internship opportunities, collaborations, or just a friendly chat about tech.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="group flex items-center gap-4 glass glow-border rounded-xl p-4 hover:bg-orange-500/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:bg-orange-500/20 transition-colors">
                  <Icon size={16} className="text-orange-400" />
                </div>
                <div>
                  <p className="font-mono text-xs text-[#ede8e0]/30 tracking-widest mb-0.5">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="font-body text-sm text-[#ede8e0]/70 hover:text-orange-400 transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="font-body text-sm text-[#ede8e0]/70">{value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Availability card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="glass glow-border rounded-xl p-5 border-orange-500/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-xs text-green-400 tracking-widest">AVAILABLE</span>
              </div>
              <p className="font-body text-sm text-[#ede8e0]/50">
                Currently open to internship and entry-level opportunities in Java Full Stack Development.
              </p>
            </motion.div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass glow-border rounded-2xl p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-[#ede8e0]/30 tracking-widest mb-2">NAME</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-[#ede8e0]/30 tracking-widest mb-2">EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-[#ede8e0]/30 tracking-widest mb-2">SUBJECT</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[#ede8e0]/30 tracking-widest mb-2">MESSAGE</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your opportunity or project..."
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-orange-500 text-[#080808] font-display font-bold text-sm rounded-sm hover:bg-orange-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,122,0,0.4)]"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
