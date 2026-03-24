import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arx Talent — AI-Enabled Hiring Sprint | First Candidates in 7 Days',
  description: 'Arx runs fixed-scope, fixed-price recruiting sprints for growth-stage companies. Five pre-vetted candidates in a live hiring portal within 7 days. No recruiter calls required.',
  openGraph: {
    title: 'Arx Talent — 7-Day Hiring Sprint',
    description: 'AI-powered recruiting for senior roles at Series A–C companies.',
    url: 'https://arxtalent.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
