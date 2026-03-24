'use client'

import { motion } from 'framer-motion'

const metrics = [
  { value: '800M+', label: 'AI-searchable candidate database across 60+ sources', tag: 'profiles' },
  { value: '7', label: 'Median first slate delivery (guaranteed)', tag: 'days' },
  { value: '10–15%', label: 'Success fee, below the 20–25% contingency market rate', tag: 'success fee' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Proof() {
  return (
    <section className="py-24 md:py-32 px-6 bg-surface/50">
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
            Why It Works
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl mb-16"
          >
            Built on AI. Run by Operators<br />Who&apos;ve Done This.
          </motion.h2>
        </motion.div>

        {/* Metric tiles */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-bg border border-border rounded-xl p-8 text-center"
            >
              <p className="font-mono text-4xl md:text-5xl font-medium text-success mb-2">
                {m.value}
              </p>
              <p className="font-mono text-xs uppercase tracking-wider text-text-dim mb-3">
                {m.tag}
              </p>
              <p className="text-sm text-text-muted">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Founder strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center gap-8 bg-bg border border-border rounded-xl p-8 max-w-3xl mx-auto"
        >
          {/* Photo placeholder */}
          <div className="w-24 h-24 rounded-full bg-border shrink-0 flex items-center justify-center">
            <span className="text-text-dim text-3xl font-serif">RL</span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-2">
              Rob Lara — <span className="text-text-muted font-normal">Founder, Arx Talent</span>
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Background in AI recruiting technology and business development.
              Arx is built on the same tools and workflows used by elite
              recruiting operations — available to growth-stage companies
              that can&apos;t afford a $50,000 retained search retainer.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
