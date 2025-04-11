"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  handwriting?: boolean
}

export default function AnimatedText({ text, className, delay = 0, handwriting = false }: AnimatedTextProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className={cn(className)}>{text}</div>

  if (handwriting) {
    return (
      <motion.h1
        className={cn("font-handwriting", className)}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay,
          ease: "easeOut",
        }}
      >
        {text}
      </motion.h1>
    )
  }

  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
    >
      {text}
    </motion.p>
  )
}
