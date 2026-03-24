import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Offer from '@/components/Offer'
import HowItWorks from '@/components/HowItWorks'
import PortalMockup from '@/components/PortalMockup'
import Pricing from '@/components/Pricing'
import IdealClient from '@/components/IdealClient'
import Proof from '@/components/Proof'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Offer />
        <HowItWorks />
        <PortalMockup />
        <Pricing />
        <IdealClient />
        <Proof />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
