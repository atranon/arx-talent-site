'use client'

import { motion } from 'framer-motion'

const forYou = [
  'You\'re a founder or hiring manager at a 25–300 person company',
  'You have a Director, Head of, or senior IC role open right now',
  'The role has been open for 30+ days without results',
  'You can move fast when you see the right candidate',
  'The empty seat is costing you revenue, velocity, or your own time',
]

const notForYou = [
  'You need to hire 10+ people at once (we\'re not an RPO)',
  'Your role pays under $80,000 base',
  'You need a 6-month committee approval to spend $8,000',
  'You want someone to manage your entire HR function',
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function IdealClient() {
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
            Who This Is For
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl mb-16"
          >
            We&apos;re Built for One Type<br />of Hiring Problem
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* For you */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-surface border border-border rounded-xl p-8"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-success mb-6">
              This is for you if...
            </h3>
            <ul className="space-y-4">
              {forYou.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-text-muted leading-relaxed">
                  <span className="text-success shrink-0 text-base">&#x2713;</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not for you */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-surface border border-border rounded-xl p-8"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-text-dim mb-6">
              This is NOT for you if...
            </h3>
            <ul className="space-y-4">
              {notForYou.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-text-dim leading-relaxed">
                  <span className="text-text-dim shrink-0 text-base">&#x2717;</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Pitch callout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-surface border border-accent/20 rounded-xl p-8 max-w-3xl mx-auto text-center"
        >
          <p className="font-serif italic text-lg md:text-xl text-text-muted leading-relaxed">
            &ldquo;You&apos;ve been trying to fill this role for 90 days. We put your first slate of five pre-vetted candidates in a dashboard in 7 days. Sprint fee is $8,000. Success fee is 12% at hire. Want to start Monday?&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  )
}
