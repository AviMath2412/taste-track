'use client'

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface MotionWrapperProps {
  children: ReactNode
  className?: string
  initial?: any
  whileInView?: any
  viewport?: any
  transition?: any
}

export function MotionWrapper({
  children,
  className,
  initial,
  whileInView,
  viewport,
  transition,
}: MotionWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
    >
      {children}
    </motion.div>
  )
} 