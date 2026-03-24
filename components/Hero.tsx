'use client'

import { motion } from 'framer-motion'
import { CTA_URL } from '@/lib/constants'

const candidates = [
  { name: 'Alex M.', title: 'Staff Engineer', status: 'Ready to Interview', statusColor: 'bg-success', score: 96 },
  { name: 'Priya K.', title: 'Sr. Backend Engineer', status: 'Screening', statusColor: 'bg-accent', score: 91 },
  { name: 'Jordan T.', title: 'Engineering Manager', status: 'Sourced', statusColor: 'bg-text-dim', score: 88 },
]

const avatarColors = ['bg-accent', 'bg-emerald-500', 'bg-violet-500']

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-grid">
      <div className="blue-glow absolute inset-0 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left content */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-widest text-text-muted mb-6"
          >
            AI-Enabled Recruiting Sprint
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-serif text-5xl md:text-7xl leading-[1.1] mb-8"
          >
            Your Next Hire,<br />
            In Your Dashboard,<br />
            <span className="italic text-accent-glow">In 7 Days.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-lg text-text-muted max-w-lg mb-10 leading-relaxed"
          >
            Arx runs a fully async, AI-powered hiring sprint for senior roles at
            growth-stage companies. Fixed-scope. Fixed-price. Five pre-vetted
            candidates in a live pipeline — without a single recruiter call.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent-glow text-white font-medium px-8 py-3.5 rounded-full transition-colors text-sm"
            >
              Start a Sprint &rarr;
            </a>
            <a
              href="#how-it-works"
              className="border border-border hover:border-text-dim text-text-muted hover:text-text-primary font-medium px-8 py-3.5 rounded-full transition-colors text-sm"
            >
              See How It Works
            </a>
          </motion.div>
        </motion.div>

        {/* Right — dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="hidden lg:block"
        >
          <div className="bg-surface border border-border rounded-xl p-6 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="font-mono text-[11px] text-text-dim">
                Arx Talent | Hiring Portal
              </span>
            </div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-medium text-text-primary">
                Candidate Pipeline
              </h3>
              <span className="font-mono text-[11px] text-success animate-pulse-dot">
                ● Sprint Active — Day 5
              </span>
            </div>
            <div className="space-y-3">
              {candidates.map((c, i) => (
                <div
                  key={c.name}
                  className="flex items-center gap-4 bg-bg/60 border border-border rounded-lg p-4"
                >
                  <div className={`w-10 h-10 rounded-full ${avatarColors[i]} flex items-center justify-center text-white text-sm font-medium shrink-0`}>
                    {c.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {c.name} — <span className="text-text-muted font-normal">{c.title}</span>
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded-full ${
                        c.status === 'Ready to Interview'
                          ? 'bg-success/10 text-success'
                          : c.status === 'Screening'
                          ? 'bg-accent/10 text-accent-glow'
                          : 'bg-text-dim/10 text-text-muted'
                      }`}>
                        {c.status === 'Ready to Interview' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" />
                        )}
                        {c.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-sm text-accent-glow font-medium">
                      {c.score}%
                    </span>
                    <p className="text-[10px] text-text-dim font-mono">match</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Progress bar */}
            <div className="mt-5 pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-text-muted">Sprint Progress</span>
                <span className="text-[11px] font-mono text-text-muted">71%</span>
              </div>
              <div className="h-1.5 bg-bg rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: '71%' }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
