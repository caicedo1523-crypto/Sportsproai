'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import Navbar from '@/components/Navbar'

interface Match {
  id: number
  home_team_name: string
  away_team_name: string
  home_goals: number
  away_goals: number
  home_possession: number
  away_possession: number
  home_xg: number
  away_xg: number
  home_shots: number
  away_shots: number
  home_shots_on_target: number
  away_shots_on_target: number
  league_name: string
  status: string
}

export default function MatchDetails({ params }: { params: { id: string } }) {
  const [match, setMatch] = useState<Match | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/matches/${params.id}`
        )
        setMatch(response.data.data)
      } catch (error) {
        console.error('Error fetching match:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMatch()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dark">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent"></div>
        </div>
      </div>
    )
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-gradient-dark">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-400">Match not found</p>
        </div>
      </div>
    )
  }

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
        {/* Match Header */}
        <motion.div variants={itemVariants} className="card-premium mb-8 text-center">
          <p className="text-accent mb-4">{match.league_name}</p>
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{match.home_team_name}</h2>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-gradient">
                {match.home_goals} - {match.away_goals}
              </p>
              <p className="text-gray-400 mt-2">{match.status}</p>
            </div>
            <div className="flex-1 text-right">
              <h2 className="text-2xl font-bold">{match.away_team_name}</h2>
            </div>
          </div>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {/* Possession */}
          <div className="card-premium">
            <h3 className="text-lg font-bold mb-4">Possession</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>{match.home_team_name}</span>
                <span className="font-bold text-gradient">{match.home_possession}%</span>
              </div>
              <div className="bg-dark-tertiary/30 rounded-full h-3">
                <motion.div
                  className="bg-accent h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${match.home_possession}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span>{match.away_team_name}</span>
                <span className="font-bold text-gradient">{match.away_possession}%</span>
              </div>
            </div>
          </div>

          {/* xG (Expected Goals) */}
          <div className="card-premium">
            <h3 className="text-lg font-bold mb-4">Expected Goals (xG)</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>{match.home_team_name}</span>
                <span className="font-bold text-gradient">{match.home_xg.toFixed(2)}</span>
              </div>
              <div className="bg-dark-tertiary/30 rounded-full h-3">
                <motion.div
                  className="bg-success h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(match.home_xg / 3) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span>{match.away_team_name}</span>
                <span className="font-bold text-gradient">{match.away_xg.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shots */}
          <div className="card-premium">
            <h3 className="text-lg font-bold mb-4">Shots</h3>
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 text-center">
                <p className="text-3xl font-bold text-gradient">{match.home_shots}</p>
                <p className="text-sm text-gray-400">Shots</p>
                <p className="text-sm font-semibold text-accent mt-2">
                  {match.home_shots_on_target} on target
                </p>
              </div>
              <div className="w-1 h-12 bg-dark-tertiary/30"></div>
              <div className="flex-1 text-center">
                <p className="text-3xl font-bold text-gradient">{match.away_shots}</p>
                <p className="text-sm text-gray-400">Shots</p>
                <p className="text-sm font-semibold text-accent mt-2">
                  {match.away_shots_on_target} on target
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="card-premium">
            <h3 className="text-lg font-bold mb-4">Recent Form</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400 mb-2">{match.home_team_name}</p>
                <div className="flex gap-2">
                  {['W', 'W', 'D', 'L', 'W'].map((result, i) => (
                    <span
                      key={i}
                      className={`w-6 h-6 rounded text-xs flex items-center justify-center font-bold ${
                        result === 'W'
                          ? 'bg-success/20 text-success'
                          : result === 'D'
                          ? 'bg-warning/20 text-warning'
                          : 'bg-danger/20 text-danger'
                      }`}
                    >
                      {result}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">{match.away_team_name}</p>
                <div className="flex gap-2">
                  {['W', 'D', 'W', 'W', 'L'].map((result, i) => (
                    <span
                      key={i}
                      className={`w-6 h-6 rounded text-xs flex items-center justify-center font-bold ${
                        result === 'W'
                          ? 'bg-success/20 text-success'
                          : result === 'D'
                          ? 'bg-warning/20 text-warning'
                          : 'bg-danger/20 text-danger'
                      }`}
                    >
                      {result}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Prediction Section */}
        <motion.div variants={itemVariants} className="card-premium">
          <h2 className="text-2xl font-bold mb-6">AI Prediction & Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-400 text-sm mb-2">Win Probability (Home)</p>
              <p className="text-4xl font-bold text-gradient">65.3%</p>
              <p className="text-xs text-gray-500 mt-2">Confidence: HIGH</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Over 2.5 Goals</p>
              <p className="text-4xl font-bold text-success">72.1%</p>
              <p className="text-xs text-gray-500 mt-2">Odds: 1.85</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Value Analysis</p>
              <p className="text-4xl font-bold text-accent">+8.5%</p>
              <p className="text-xs text-gray-500 mt-2">Strong Value Bet</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-dark-tertiary/30">
            <p className="text-gray-300 leading-relaxed">
              Based on advanced analytics, {match.home_team_name} shows a strong advantage with superior
              possession and shot accuracy. The away team has limited offensive opportunities but maintains
              defensive stability. Recommended pick: Over 2.5 goals with high confidence.
            </p>
          </div>
        </motion.div>
      </motion.main>
    </div>
  )
}
