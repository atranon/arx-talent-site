'use client'

import { motion } from 'framer-motion'

const portalCandidates = [
  { name: 'Sarah Chen', title: 'Sr. Engineering Manager', loc: 'San Francisco, CA', score: 94, status: 'Submitted', statusStyle: 'bg-accent/10 text-accent-glow' },
  { name: 'Marcus Johnson', title: 'Staff Software Engineer', loc: 'Austin, TX', score: 91, status: 'Video Screened', statusStyle: 'bg-success/10 text-success' },
  { name: 'Elena Rodriguez', title: 'Director of Engineering', loc: 'New York, NY', score: 89, status: 'Interviewing', statusStyle: 'bg-purple-500/10 text-purple-400' },
  { name: 'David Kim', title: 'Principal Engineer', loc: 'Seattle, WA', score: 87, status: 'Sourced', statusStyle: 'bg-text-dim/20 text-text-muted' },
]

const avatarColors = ['bg-blue-500', 'bg-emerald-500', 'bg-rose-500', 'bg-amber-500']

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function PortalMockup() {
  return (
    <section className="py-24 md:py-32 px-6 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-widest text-text-muted mb-4"
          >
            What You&apos;ll Actually See
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl"
          >
            Your Hiring Dashboard,<br />Live From Day One
          </motion.h2>
        </motion.div>

        {/* Portal mockup */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-bg border border-border rounded-xl shadow-2xl shadow-black/60 overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="font-mono text-[11px] text-text-dim ml-2">
                  Arx Talent | Acme Corp Hiring Portal
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse-dot" />
                <span className="font-mono text-[11px] text-success">
                  Sprint Active — Day 4 of 7
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-[1fr_240px]">
              {/* Main content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-sm font-medium text-text-primary">
                    Director of Engineering — Pipeline
                  </h3>
                  <span className="font-mono text-[11px] text-text-muted">
                    4 candidates
                  </span>
                </div>

                <div className="space-y-3">
                  {portalCandidates.map((c, i) => (
                    <div
                      key={c.name}
                      className="flex items-center gap-4 border border-border rounded-lg p-4 hover:border-accent/30 transition-colors group"
                    >
                      <div className={`w-10 h-10 rounded-full ${avatarColors[i]} flex items-center justify-center text-white text-xs font-medium shrink-0`}>
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">{c.name}</p>
                        <p className="text-[12px] text-text-muted truncate">{c.title} · {c.loc}</p>
                      </div>
                      <span className={`font-mono text-[11px] px-2.5 py-1 rounded-full shrink-0 ${c.statusStyle}`}>
                        {c.status}
                      </span>
                      <span className="font-mono text-sm text-accent-glow font-medium shrink-0">
                        {c.score}%
                      </span>
                      <div className="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-[11px] font-mono text-success border border-success/30 rounded-full px-3 py-1 hover:bg-success/10 transition-colors">
                          Approve
                        </button>
                        <button className="text-[11px] font-mono text-text-muted border border-border rounded-full px-3 py-1 hover:bg-surface transition-colors">
                          Pass
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="border-l border-border p-6 hidden md:block">
                <h4 className="font-mono text-[11px] uppercase tracking-wider text-text-muted mb-4">
                  Sprint Progress
                </h4>
                <div className="mb-4">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[11px] font-mono text-text-muted">Overall</span>
                    <span className="text-[11px] font-mono text-text-muted">55%</span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: '55%' }} />
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  <div>
                    <p className="text-[11px] font-mono text-text-dim uppercase tracking-wider mb-1">Sourced</p>
                    <p className="font-mono text-2xl text-text-primary">47</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-text-dim uppercase tracking-wider mb-1">Screened</p>
                    <p className="font-mono text-2xl text-text-primary">12</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-text-dim uppercase tracking-wider mb-1">Submitted</p>
                    <p className="font-mono text-2xl text-accent-glow">4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16 max-w-2xl mx-auto"
        >
          <p className="font-serif italic text-xl text-text-muted leading-relaxed mb-4">
            &ldquo;We had three qualified candidates to review by day 6. Our previous agency took four months and placed no one.&rdquo;
          </p>
          <cite className="text-sm text-text-dim not-italic font-mono">
            — VP of Engineering, Series B SaaS (placeholder)
          </cite>
        </motion.blockquote>
      </div>
    </section>
  )
}
