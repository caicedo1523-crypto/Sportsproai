'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import Navbar from '@/components/Navbar'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'

const mockData = [
  { time: '00:00', possession: 50, xg: 0.5 },
  { time: '15:00', possession: 52, xg: 1.2 },
  { time: '30:00', possession: 48, xg: 2.1 },
  { time: '45:00', possession: 55, xg: 2.8 },
  { time: '60:00', possession: 58, xg: 3.5 },
  { time: '75:00', possession: 60, xg: 4.2 },
  { time: '90:00', possession: 62, xg: 4.8 },
]

export default function Statistics() {
  const [data, setData] = useState(mockData)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      <motion.main
        className="max-w-7xl mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-2">Statistics</h1>
          <p className="text-gray-400">Advanced analytics and performance metrics</p>
        </motion.div>

        {/* Possession Over Time */}
        <motion.div variants={itemVariants} className="card-premium mb-8">
          <h2 className="text-2xl font-bold mb-6">Possession & xG Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="possession"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="xg"
                stroke="#10B981"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Team Comparison */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card-premium">
            <h3 className="text-lg font-bold mb-4">Team Statistics - Home</h3>
            <div className="space-y-3">
              {[
                { label: 'Possession', value: '62%' },
                { label: 'Shots', value: '14' },
                { label: 'Shots on Target', value: '6' },
                { label: 'Corners', value: '8' },
                { label: 'xG', value: '2.4' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-dark-secondary/30 rounded-lg">
                  <span className="text-gray-300">{stat.label}</span>
                  <span className="font-bold text-gradient">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-premium">
            <h3 className="text-lg font-bold mb-4">Team Statistics - Away</h3>
            <div className="space-y-3">
              {[
                { label: 'Possession', value: '38%' },
                { label: 'Shots', value: '9' },
                { label: 'Shots on Target', value: '3' },
                { label: 'Corners', value: '4' },
                { label: 'xG', value: '1.2' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-dark-secondary/30 rounded-lg">
                  <span className="text-gray-300">{stat.label}</span>
                  <span className="font-bold text-gradient">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Heatmap Section */}
        <motion.div variants={itemVariants} className="card-premium">
          <h2 className="text-2xl font-bold mb-6">Attack Patterns & Heatmap</h2>
          <div className="bg-dark-secondary/30 rounded-lg p-8 aspect-video flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 mb-4">Interactive Heatmap</p>
              <p className="text-gray-500 text-sm">Visual representation of team activity zones</p>
            </div>
          </div>
        </motion.div>
      </motion.main>
    </div>
  )
}
