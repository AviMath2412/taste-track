"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function WelcomeBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [userData, setUserData] = useState<{ name: string; points: number } | null>(null)

  useEffect(() => {
    // Check if user is logged in and if this is their first visit after login
    const storedUser = localStorage.getItem("user")
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome")
    
    if (storedUser && !hasSeenWelcome) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUserData(parsedUser)
        setIsVisible(true)
        
        // Set a flag to not show the welcome banner again
        localStorage.setItem("hasSeenWelcome", "true")
      } catch (error) {
        console.error("Failed to parse user data:", error)
      }
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible || !userData) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
        >
          <div className="mx-4 rounded-lg bg-primary p-4 text-primary-foreground shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="rounded-full bg-primary-foreground/20 p-1">
                  <span role="img" aria-label="party" className="text-lg">
                    🎉
                  </span>
                </div>
                <div>
                  <h3 className="font-medium">Welcome, {userData.name}!</h3>
                  <p className="text-sm text-primary-foreground/80">
                    You've earned {userData.points} points in your rewards wallet
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-primary-foreground/80 hover:text-primary-foreground"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}