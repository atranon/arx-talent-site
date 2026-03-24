'use client'

import { motion } from 'framer-motion'
import { CTA_URL } from '@/lib/constants'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 px-6">
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
            Transparent Pricing
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl"
          >
            One Fee to Start.<br />One Fee When You Hire.
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          <div className="bg-surface border border-border border-t-4 border-t-accent rounded-xl p-8 md:p-10">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-8">
              Hiring Sprint
            </h3>

            <div className="border-t border-border pt-8 mb-8">
              <p className="text-sm text-text-muted uppercase tracking-wider font-medium mb-3">
                Engagement Fee
              </p>
              <p className="font-mono text-4xl md:text-5xl font-medium text-text-primary mb-3">
                $5,000 – $10,000
              </p>
              <p className="text-sm text-text-muted leading-relaxed">
                Collected Day 0. Covers portal setup, AI sourcing, async screening, and your full 7-day first slate. Fee scales with seniority of the role.
              </p>
            </div>

            <div className="border-t border-border pt-8 mb-8">
              <p className="text-sm text-text-muted uppercase tracking-wider font-medium mb-3">
                Success Fee
              </p>
              <p className="font-mono text-4xl md:text-5xl font-medium text-text-primary mb-3">
                10–15%
              </p>
              <p className="text-sm text-text-muted leading-relaxed">
                Of first-year compensation. Only owed if you make a hire. Below market rate because the sprint fee subsidizes our costs.
              </p>
            </div>

            <div className="border-t border-border pt-8 mb-10">
              <p className="text-sm text-text-muted uppercase tracking-wider font-medium mb-3">
                Placement Guarantee
              </p>
              <p className="text-sm text-text-muted leading-relaxed">
                If no qualified hire within 60 days &rarr; additional search cycles at no charge to you.
              </p>
            </div>

            <div className="border-t border-border pt-8">
              <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-accent hover:bg-accent-glow text-white font-medium py-3.5 rounded-full transition-colors text-sm"
              >
                Book a 15-Minute Scoping Call &rarr;
              </a>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10 text-sm text-text-dim max-w-2xl mx-auto italic"
        >
          Traditional retained search firms charge 33% of salary — all upfront. We charge a fraction of that, and you only pay the success fee when you hire.
        </motion.p>
      </div>
    </section>
  )
}
