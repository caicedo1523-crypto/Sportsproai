'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-dark-tertiary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              className="text-2xl font-bold text-gradient"
              whileHover={{ scale: 1.05 }}
            >
              ⚽ SportsPro AI
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/matches" className="hover:text-accent transition">
              Live Matches
            </Link>
            <Link href="/predictions" className="hover:text-accent transition">
              Predictions
            </Link>
            <Link href="/statistics" className="hover:text-accent transition">
              Statistics
            </Link>
            <Link href="/premium" className="btn-primary">
              Premium
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  )
}
