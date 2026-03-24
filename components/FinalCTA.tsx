'use client'

import { motion } from 'framer-motion'
import { CTA_URL } from '@/lib/constants'

export default function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 px-6">
      <div className="blue-glow-center absolute inset-0 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-2xl mx-auto text-center"
      >
        <h2 className="font-serif text-3xl md:text-5xl mb-6">
          Your next hire is<br />
          <span className="italic text-accent-glow">7 days away.</span>
        </h2>
        <p className="text-lg text-text-muted mb-10 max-w-lg mx-auto leading-relaxed">
          Book a free 15-minute scoping call. We&apos;ll confirm your role is
          a fit for the sprint model and tell you exactly what to expect.
        </p>
        <a
          href={CTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-accent hover:bg-accent-glow text-white font-medium px-10 py-4 rounded-full transition-colors text-base"
        >
          Book a Scoping Call &rarr;
        </a>
        <p className="mt-5 text-sm text-text-dim">
          No commitment. No pitch deck. Just a conversation about your role.
        </p>
      </motion.div>
    </section>
  )
}
