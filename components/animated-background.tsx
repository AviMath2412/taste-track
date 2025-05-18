"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create gradient circles
    const circles: Circle[] = []
    const circleCount = 8 // Increased number of circles
    
    // Create food-themed particles
    const particles: Particle[] = []
    const particleCount = 30
    const particleImages = [
      '🍕', '🍔', '🍣', '🍜', '🍝', '🍲', '🥗', '🍱', 
      '🍛', '🍤', '🍗', '🥘', '🌮', '🌯', '🥪', '🍦'
    ]

    for (let i = 0; i < circleCount; i++) {
      // Create a more diverse color palette
      const colorSchemes = [
        { min: 0, max: 60 },    // Red to Yellow
        { min: 180, max: 240 }, // Cyan to Blue
        { min: 270, max: 330 }  // Purple to Pink
      ]
      
      const scheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)]
      const hue = Math.random() * (scheme.max - scheme.min) + scheme.min
      
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 350 + 150, // Larger radius range
        dx: (Math.random() - 0.5) * 0.3, // Slower movement
        dy: (Math.random() - 0.5) * 0.3,
        hue: hue,
        saturation: 85 + Math.random() * 15, // 85-100%
        lightness: theme === "dark" ? 30 + Math.random() * 20 : 60 + Math.random() * 20,
        opacity: Math.random() * 0.2 + 0.05, // More subtle
        pulse: {
          active: Math.random() > 0.5, // 50% chance of pulsing
          speed: 0.005 + Math.random() * 0.01,
          min: 0.7 + Math.random() * 0.2,
          max: 1.0 + Math.random() * 0.3,
          current: 0
        }
      })
    }
    
    // Create food emoji particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 10,
        dx: (Math.random() - 0.5) * 0.8,
        dy: (Math.random() - 0.5) * 0.8,
        emoji: particleImages[Math.floor(Math.random() * particleImages.length)],
        opacity: Math.random() * 0.3 + 0.1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2
      })
    }

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw each circle with improved effects
      circles.forEach((circle) => {
        // Update pulse animation
        if (circle.pulse.active) {
          circle.pulse.current += circle.pulse.speed
          const pulseFactor = 
            circle.pulse.min + 
            Math.sin(circle.pulse.current) * 
            ((circle.pulse.max - circle.pulse.min) / 2)
          
          circle.radius *= pulseFactor
        }
        
        // Move circle
        circle.x += circle.dx
        circle.y += circle.dy

        // Bounce off edges with slight randomization
        if (circle.x - circle.radius < 0 || circle.x + circle.radius > canvas.width) {
          circle.dx = -circle.dx * (0.95 + Math.random() * 0.1)
        }

        if (circle.y - circle.radius < 0 || circle.y + circle.radius > canvas.height) {
          circle.dy = -circle.dy * (0.95 + Math.random() * 0.1)
        }

        // Create gradient with improved colors
        const gradient = ctx.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, circle.radius)

        const isDark = theme === "dark"
        
        // Inner color (more vibrant)
        gradient.addColorStop(0, `hsla(${circle.hue}, ${circle.saturation}%, ${circle.lightness}%, ${circle.opacity * 1.5})`)
        // Middle transition
        gradient.addColorStop(0.6, `hsla(${circle.hue}, ${circle.saturation * 0.8}%, ${circle.lightness}%, ${circle.opacity * 0.7})`)
        // Outer fade
        gradient.addColorStop(1, `hsla(${circle.hue}, ${circle.saturation * 0.5}%, ${circle.lightness}%, 0)`)

        // Draw circle
        ctx.beginPath()
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
        
        // Reset radius if pulsing
        if (circle.pulse.active) {
          circle.radius /= 
            circle.pulse.min + 
            Math.sin(circle.pulse.current) * 
            ((circle.pulse.max - circle.pulse.min) / 2)
        }
      })
      
      // Draw food emoji particles (only in certain viewport sizes to avoid clutter on mobile)
      if (window.innerWidth > 768) {
        particles.forEach((particle) => {
          // Move particle
          particle.x += particle.dx
          particle.y += particle.dy
          particle.rotation += particle.rotationSpeed
          
          // Wrap around edges (instead of bouncing)
          if (particle.x < 0) particle.x = canvas.width
          if (particle.x > canvas.width) particle.x = 0
          if (particle.y < 0) particle.y = canvas.height
          if (particle.y > canvas.height) particle.y = 0
          
          // Draw emoji
          ctx.save()
          ctx.translate(particle.x, particle.y)
          ctx.rotate(particle.rotation * Math.PI / 180)
          ctx.globalAlpha = particle.opacity
          ctx.font = `${particle.size}px Arial`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(particle.emoji, 0, 0)
          ctx.restore()
        })
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full opacity-60"
      style={{ filter: "blur(80px)" }}
    />
  )
}

interface Circle {
  x: number
  y: number
  radius: number
  dx: number
  dy: number
  hue: number
  saturation: number
  lightness: number
  opacity: number
  pulse: {
    active: boolean
    speed: number
    min: number
    max: number
    current: number
  }
}

interface Particle {
  x: number
  y: number
  size: number
  dx: number
  dy: number
  emoji: string
  opacity: number
  rotation: number
  rotationSpeed: number
}
