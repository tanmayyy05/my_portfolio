import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import Certifications from './components/sections/Certifications'
import Resume from './components/sections/Resume'
import Contact from './components/sections/Contact'
import Footer from './components/Footer'
import { Toaster } from './components/ui/toaster'

function App() {
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const [, setHovering] = useState(false)

  useEffect(() => {
    const dot = cursorDotRef.current
    const ring = cursorRingRef.current
    if (!dot || !ring) return

    let ringX = 0, ringY = 0
    let mouseX = 0, mouseY = 0
    let animId: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = `${ringX}px`
      ring.style.top = `${ringY}px`
      animId = requestAnimationFrame(animate)
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('a, button, [data-cursor="pointer"]')) {
        ring.classList.add('hover')
        setHovering(true)
      } else {
        ring.classList.remove('hover')
        setHovering(false)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)
    animId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#ede8e0] overflow-x-hidden">
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Custom cursor */}
      <div ref={cursorDotRef} className="cursor-dot hidden md:block" />
      <div ref={cursorRingRef} className="cursor-ring hidden md:block" />

      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-orange-500/3 blur-[100px]" />
      </div>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Resume />
        <Contact />
      </main>

      <Footer />
      <Toaster />
    </div>
  )
}

export default App
