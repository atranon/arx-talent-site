'use client'

import { motion } from 'framer-motion'

const pains = [
  {
    title: '"You pay 25% contingency and wait 90 days."',
    desc: 'Most placements happen 2–3 months after you need them. Your revenue-generating seat sits empty.',
  },
  {
    title: '"You get a weekly call, not a pipeline."',
    desc: 'Status updates are theater. You have no visibility into who\'s been contacted, screened, or declined.',
  },
  {
    title: '"You fired one recruiter and hired another."',
    desc: 'Every contingency agency does the same thing: blast your job to LinkedIn and pray. The process never changes.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Problem() {
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
            The Industry&apos;s Dirty Secret
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl mb-16"
          >
            Traditional Agencies Are<br />Failing You on Purpose
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pains.map((pain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-surface border border-border rounded-xl p-8 border-l-4 border-l-red-500/50 hover:border-l-red-500 transition-colors"
            >
              <h3 className="font-serif text-lg text-text-primary mb-3 leading-snug">
                {pain.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {pain.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16 font-serif italic text-xl md:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed"
        >
          &ldquo;The best agencies don&apos;t sell a search. They sell an outcome you can see moving in real time.&rdquo;
        </motion.p>
      </div>
    </section>
  )
}
