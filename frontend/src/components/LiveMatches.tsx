'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

interface Match {
  id: number
  home_team_name: string
  away_team_name: string
  home_goals: number
  away_goals: number
  status: string
  league_name: string
  elapsed_time: number
}

export default function LiveMatches() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/matches/live`
        )
        setMatches(response.data.data || [])
      } catch (error) {
        console.error('Error fetching matches:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
    const interval = setInterval(fetchMatches, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent"></div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {matches.map((match) => (
        <motion.div
          key={match.id}
          className="card-premium cursor-pointer hover:scale-105"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-accent/20 text-accent">
              {match.league_name}
            </span>
            <span className="text-xs text-gray-400">
              {match.status === 'live' && (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-danger rounded-full animate-pulse"></span>
                  Live
                </span>
              )}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="font-semibold">{match.home_team_name}</p>
            </div>
            <div className="flex items-center gap-3 mx-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gradient">
                  {match.home_goals}
                </p>
                <p className="text-xs text-gray-400">{match.elapsed_time}'</p>
              </div>
              <p className="text-gray-400">-</p>
              <div className="text-center">
                <p className="text-2xl font-bold text-gradient">
                  {match.away_goals}
                </p>
              </div>
            </div>
            <div className="flex-1 text-right">
              <p className="font-semibold">{match.away_team_name}</p>
            </div>
          </div>

          <button className="btn-secondary w-full mt-4">
            View Details
          </button>
        </motion.div>
      ))}
    </div>
  )
}
