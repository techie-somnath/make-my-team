"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedButtonProps {
  children: React.ReactNode
  delay?: number
}

export default function AnimatedButton({ children, delay = 0 }: AnimatedButtonProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div>{children}</div>

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay,
        },
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  )
}
