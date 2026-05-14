'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Prediction {
  id: number
  prediction_1x2: string
  probability_home: number
  confidence: string
  value_analysis: string
  recommended_pick: string
}

export default function AIPredictor() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/predictions`
        )
        setPredictions(response.data.data || [])
      } catch (error) {
        console.error('Error fetching predictions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPredictions()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {predictions.slice(0, 3).map((prediction) => (
        <motion.div
          key={prediction.id}
          className="card-premium"
          whileHover={{ borderColor: 'rgba(59, 130, 246, 0.5)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold">{prediction.recommended_pick}</h3>
              <p className="text-sm text-gray-400">{prediction.value_analysis}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gradient">
                {(prediction.probability_home * 100).toFixed(0)}%
              </p>
              <p className="text-xs text-gray-400">Probability</p>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="bg-dark-tertiary/30 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-success to-accent h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${prediction.probability_home * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              prediction.confidence === 'high' ? 'bg-success/20 text-success' :
              prediction.confidence === 'medium' ? 'bg-warning/20 text-warning' :
              'bg-danger/20 text-danger'
            }`}>
              {prediction.confidence.toUpperCase()}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
