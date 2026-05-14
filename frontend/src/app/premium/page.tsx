'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

const premiumFeatures = [
  {
    title: 'Advanced AI Predictions',
    description: 'Access to professional AI models with 82%+ accuracy rate',
    icon: '🤖',
  },
  {
    title: 'Premium Picks',
    description: 'VIP picks from expert analysts with detailed analysis',
    icon: '⭐',
  },
  {
    title: 'Live Betting Alerts',
    description: 'Real-time alerts for optimal betting opportunities',
    icon: '🔔',
  },
  {
    title: 'Advanced Statistics',
    description: 'Deep dive into advanced metrics, xG, and tactical analysis',
    icon: '📊',
  },
  {
    title: 'Bankroll Manager',
    description: 'Professional tools to manage your betting bankroll',
    icon: '💰',
  },
  {
    title: 'Parlay Generator',
    description: 'Intelligent parlay suggestions based on AI analysis',
    icon: '🎯',
  },
]

const plans = [
  {
    name: 'Starter',
    price: '$9.99',
    period: '/month',
    description: 'Perfect for beginners',
    features: [
      'Basic AI predictions',
      'Up to 5 daily predictions',
      'Standard alerts',
      'Basic statistics',
    ],
  },
  {
    name: 'Professional',
    price: '$29.99',
    period: '/month',
    description: 'For serious bettors',
    features: [
      'Advanced AI predictions',
      'Unlimited predictions',
      'Premium alerts',
      'Advanced statistics',
      'Bankroll manager',
      'Priority support',
    ],
    highlighted: true,
  },
  {
    name: 'Elite',
    price: '$99.99',
    period: '/month',
    description: 'Maximum advantage',
    features: [
      'Everything in Professional',
      'Exclusive VIP picks',
      'Private analyst consultations',
      'Parlay generator',
      'Advanced risk management',
      '24/7 dedicated support',
    ],
  },
]

export default function Premium() {
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
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gradient mb-4">Premium Plans</h1>
          <p className="text-xl text-gray-400">Unlock professional tools and AI predictions</p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {premiumFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="card-premium text-center"
              whileHover={{ y: -10 }}
            >
              <p className="text-4xl mb-4">{feature.icon}</p>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Pricing Plans */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className={`rounded-xl border-2 p-8 transition-all ${
                  plan.highlighted
                    ? 'border-accent bg-dark-secondary/50 shadow-lg shadow-accent/20 scale-105'
                    : 'border-dark-tertiary/30 bg-dark-secondary/20 hover:border-accent/50'
                }`}
                whileHover={{ y: -10 }}
              >
                {plan.highlighted && (
                  <div className="mb-4 inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                <div className="mb-6">
                  <p className="text-4xl font-bold text-gradient">{plan.price}</p>
                  <p className="text-gray-400 text-sm">{plan.period}</p>
                </div>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all mb-6 ${
                    plan.highlighted
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  Get Started
                </button>
                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-success">✓</span>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div variants={itemVariants} className="card-premium">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'What is the accuracy rate of AI predictions?',
                a: 'Our AI system maintains an 82.5% accuracy rate based on historical data and machine learning models trained on thousands of matches.',
              },
              {
                q: 'Can I cancel my subscription anytime?',
                a: 'Yes, you can cancel your subscription at any time. No hidden fees or long-term commitments.',
              },
              {
                q: 'Do you offer refunds?',
                a: '30-day money-back guarantee if you are not satisfied with the service.',
              },
              {
                q: 'Which sports are covered?',
                a: 'Currently we support football/soccer, with plans to expand to basketball, tennis, and other sports.',
              },
            ].map((item, i) => (
              <div key={i} className="pb-6 border-b border-dark-tertiary/30 last:border-0">
                <h3 className="font-bold mb-2">{item.q}</h3>
                <p className="text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.main>
    </div>
  )
}
