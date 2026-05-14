'use client'

import React from 'react'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Live Matches', value: '247', trend: '+12%' },
  { label: 'Accuracy Rate', value: '82.5%', trend: '+5.2%' },
  { label: 'Premium Picks', value: '1,240', trend: '+45%' },
  { label: 'Win Rate', value: '64.8%', trend: '+8.3%' },
]

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="stat-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <div>
            <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-gradient">{stat.value}</p>
          </div>
          <div className="text-right">
            <p className="text-success text-sm font-semibold">{stat.trend}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
