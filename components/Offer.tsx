'use client'

import { motion } from 'framer-motion'

const features = [
  {
    num: '01',
    title: '7-Day First Slate',
    desc: 'Five pre-vetted, async-screened candidates in your portal within one week of kickoff. Not sourced — ready.',
  },
  {
    num: '02',
    title: 'Live Pipeline Portal',
    desc: 'See every candidate, every status, every note in real time. Approve or pass with one click. No email threads.',
  },
  {
    num: '03',
    title: 'Zero Calls Required',
    desc: 'Role briefing is a form. Updates are portal notifications. Scheduling is automated. We work; you review.',
  },
  {
    num: '04',
    title: 'Fixed-Scope, Fixed-Price',
    desc: 'One engagement fee covers the full sprint. No hourly billing. No scope creep. Clear deliverables, clear timeline.',
  },
]

const metrics = [
  { value: '7', unit: 'days', label: 'to your first candidate slate' },
  { value: '800M+', unit: '', label: 'profiles searched by AI' },
  { value: '0', unit: '', label: 'recruiter calls required' },
  { value: '60', unit: 'day', label: 'placement guarantee' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Offer() {
  return (
    <section className="py-24 md:py-32 px-6">
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
            The Arx Difference
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl mb-16"
          >
            A Hiring Sprint, Not a Search
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — features */}
          <div className="space-y-8">
            {features.map((f, i) => (
              <motion.div
                key={f.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5"
              >
                <span className="font-mono text-sm text-accent shrink-0 mt-1">
                  {f.num}
                </span>
                <div>
                  <h3 className="text-lg font-medium text-text-primary mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — metric block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface border border-border border-l-4 border-l-accent rounded-xl p-8 lg:p-10 self-start"
          >
            <div className="grid grid-cols-2 gap-10">
              {metrics.map((m, i) => (
                <div key={i}>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono text-4xl md:text-5xl font-medium text-accent-glow">
                      {m.value}
                    </span>
                    {m.unit && (
                      <span className="font-mono text-lg text-text-muted">
                        {m.unit}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-muted mt-2">{m.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
