'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import LiveMatches from '@/components/LiveMatches'
import AIPredictor from '@/components/AIPredictor'
import StatsOverview from '@/components/StatsOverview'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <motion.main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.section
          className="mb-12"
          variants={itemVariants}
        >
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gradient mb-4">
              SportsPro AI
            </h1>
            <p className="text-xl text-gray-400">
              Professional sports statistics & AI-powered predictions
            </p>
          </div>
        </motion.section>

        {/* Stats Overview */}
        <motion.section variants={itemVariants} className="mb-12">
          <StatsOverview />
        </motion.section>

        {/* Live Matches */}
        <motion.section variants={itemVariants} className="mb-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">Live Matches</h2>
            <p className="text-gray-400">Real-time scores and statistics</p>
          </div>
          <LiveMatches />
        </motion.section>

        {/* AI Predictor */}
        <motion.section variants={itemVariants} className="mb-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">AI Predictions</h2>
            <p className="text-gray-400">Professional picks and value analysis</p>
          </div>
          <AIPredictor />
        </motion.section>

        {/* CTA Section */}
        <motion.section
          variants={itemVariants}
          className="text-center py-12 px-6 card-premium"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Betting?</h3>
          <p className="text-gray-400 mb-6">Get premium picks, advanced analytics, and AI predictions</p>
          <Link href="/premium" className="btn-primary inline-block">
            Upgrade to Premium
          </Link>
        </motion.section>
      </motion.main>
    </div>
  )
}
