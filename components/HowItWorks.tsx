'use client'

import { motion } from 'framer-motion'

const phases = [
  {
    label: 'Phase 1',
    day: 'Day 0',
    title: 'Kickoff',
    items: [
      'You complete a role brief form (15 min, async)',
      'Portal access activated — your branded pipeline view is live',
      'Sprint fee collected',
      'Async kickoff summary delivered: what we\'re doing and when to expect results',
    ],
  },
  {
    label: 'Phase 2',
    day: 'Days 1–7',
    title: 'Sourcing Sprint',
    items: [
      'AI searches 800M+ profiles using your role criteria',
      'We screen the top candidates via async video interview',
      'Five pre-vetted profiles — with video responses, resume, and fit notes — land in your portal',
      'You get a portal notification: "Your first slate is ready."',
    ],
  },
  {
    label: 'Phase 3',
    day: 'Days 8–60',
    title: 'Feedback to Offer',
    items: [
      'Approve or pass candidates in the portal with one click',
      'We run a second sourcing pass based on your signals',
      'Interviews scheduled automatically through your calendar integration',
      'Offer stage support: comp benchmarks, offer letter templates, closing guidance',
    ],
  },
]

const neverHappens = [
  'No intro call before we start',
  'No weekly status call',
  'No candidate spreadsheets over email',
  'No "we\'re working on it" updates without portal visibility',
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-widest text-text-muted mb-4"
          >
            The Process
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl mb-16"
          >
            From Signed to Slate<br />in One Week
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-[52px] left-[16.67%] right-[16.67%] h-px bg-border" />

          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative"
            >
              {/* Phase dot */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent flex items-center justify-center z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                </div>
                <div>
                  <span className="font-mono text-[11px] text-accent uppercase tracking-wider">
                    {phase.label}
                  </span>
                  <span className="font-mono text-[11px] text-text-dim ml-2">
                    {phase.day}
                  </span>
                </div>
              </div>

              <div className="bg-surface border border-border rounded-xl p-6">
                <h3 className="font-serif text-xl text-text-primary mb-4">
                  {phase.title}
                </h3>
                <ul className="space-y-3">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-sm text-text-muted leading-relaxed">
                      <span className="text-accent shrink-0 mt-0.5">&#x2022;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* What Never Happens */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-surface border border-border border-l-4 border-l-red-500/50 rounded-xl p-8 max-w-2xl mx-auto"
        >
          <h4 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-5">
            What Never Happens
          </h4>
          <div className="grid sm:grid-cols-2 gap-3">
            {neverHappens.map((item, i) => (
              <p key={i} className="flex items-center gap-2.5 text-sm text-text-muted">
                <span className="text-red-400 text-base">&#x2715;</span>
                {item}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
