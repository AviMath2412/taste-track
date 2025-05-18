"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export { motion } from "framer-motion"

export default function AnimatedHero() {
  // Framer Motion variants for bubbles
  const bubbleVariants = {
    animate: {
      y: [0, -30, 0],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="relative w-full h-[500px] flex flex-col items-center justify-center overflow-hidden">

      {/* Framer Motion animated bubbles */}
      <motion.div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div
          className="absolute left-10 top-20 w-16 h-16 bg-primary/30 rounded-full blur-2xl"
          variants={bubbleVariants}
          animate="animate"
        />
        <motion.div
          className="absolute right-20 top-32 w-24 h-24 bg-purple-400/30 rounded-full blur-2xl"
          variants={bubbleVariants}
          animate="animate"
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute left-1/2 bottom-10 w-20 h-20 bg-pink-400/30 rounded-full blur-2xl"
          variants={bubbleVariants}
          animate="animate"
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.div>

      {/* Framer Motion animated text */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-20 text-center"
      >
        <h1 className="mb-4 text-5xl font-extrabold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
          Discover Your Next Culinary Adventure
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-8 text-xl text-white/90 drop-shadow"
        >
          TasteTrack helps you find the perfect restaurant based on your preferences, mood, and location.
        </motion.p>
      </motion.div>
    </div>
  )
}