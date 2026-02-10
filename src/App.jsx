import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, ChevronDown, Users, Target, Briefcase,
  CheckCircle2, ArrowRight, Mail, Phone, MapPin, Globe, Linkedin,
  Facebook, Youtube, Search, Clock, Building2, UserCheck, FileText,
  MessageSquare, Award, Shield, Zap, Star, Send, ChevronUp
} from 'lucide-react';

const arxLogo = "https://i.postimg.cc/nhCgpnxr/arx.jpg";

const C = {
  primary: '#1B3A5C',
  accent: '#E8A838',
  dark: '#0F2137',
  light: '#F7F9FC',
  white: '#FFFFFF',
  text: '#3A4A5C',
};

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const AnimCounter = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    let s = 0;
    const step = end / 125;
    const t = setInterval(() => {
      s += step;
      if (s >= end) { setCount(end); clearInterval(t); }
      else setCount(Math.floor(s));
    }, 16);
    return () => clearInterval(t);
  }, [inView, end]);
  return <span ref={ref}>{count}{suffix}</span>;
};

const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}>
      {children}
    </div>
  );
};

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'employers', label: 'For Employers' },
    { id: 'candidates', label: 'For Candidates' },
    { id: 'process', label: 'Our Process' },
    { id: 'vacancies', label: 'Open Roles' },
    { id: 'contact', label: 'Contact' },
  ];
  const nav = (id) => { setMobileOpen(false); scrollToId(id); };

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [formSt, setFormSt] = useState(null);
  const onFormChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setFormSt('error'); return; }
    setFormSt('success');
    setForm({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setFormSt(null), 5000);
  };

  return (
    <div className="min-h-screen font-sans antialiased" style={{ color: C.text }}>

      {/* NAV */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex justify-between items-center">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
            <img src={arxLogo} alt="Arx Talent" className="h-10 w-auto rounded-md shadow-sm" />
            <div className="flex flex-col leading-none">
              <span className={`font-extrabold text-lg tracking-tight transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>Arx Talent</span>
              <span className={`text-[10px] tracking-[0.2em] uppercase font-medium transition-colors ${scrolled ? 'text-amber-600' : 'text-amber-300'}`}>Executive Search</span>
            </div>
          </button>
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => nav(l.id)}
                className={`text-[13px] font-semibold tracking-wide uppercase transition-colors hover:text-amber-500 ${scrolled ? 'text-gray-600' : 'text-white/80'}`}>
                {l.label}
              </button>
            ))}
            <button onClick={() => nav('contact')}
              className="ml-2 px-6 py-2.5 text-[13px] font-bold uppercase tracking-wider rounded-md transition-all duration-300 hover:brightness-110"
              style={{ background: C.accent, color: C.dark }}>
              Get Started
            </button>
          </div>
          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={26} className={scrolled ? 'text-gray-900' : 'text-white'} /> : <Menu size={26} className={scrolled ? 'text-gray-900' : 'text-white'} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="lg:hidden bg-white shadow-2xl border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-5 py-6 flex flex-col gap-1">
              {navLinks.map(l => (
                <button key={l.id} onClick={() => nav(l.id)}
                  className="text-left text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-amber-50 hover:text-amber-700 transition-colors text-[15px]">
                  {l.label}
                </button>
              ))}
              <button onClick={() => nav('contact')} className="mt-3 py-3 px-6 font-bold text-center rounded-lg text-white" style={{ background: C.primary }}>
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden" style={{ background: C.dark }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${C.dark}ee 0%, ${C.primary}cc 50%, ${C.dark}dd 100%)` }} />
        </div>
        <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full opacity-10" style={{ background: C.accent, filter: 'blur(80px)' }} />
        <div className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full" style={{ background: '#4A90D9', filter: 'blur(100px)', opacity: 0.08 }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)', backgroundSize: '60px 60px', opacity: 0.03 }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 py-32 lg:py-0 w-full">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-[13px] font-semibold tracking-wide uppercase"
                style={{ background: 'rgba(232,168,56,0.15)', color: C.accent, border: '1px solid rgba(232,168,56,0.3)' }}>
                <Zap size={14} /> New-Generation Recruiting
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.08] mb-6 tracking-tight">
                Building Teams<br/>That Define{' '}
                <span className="relative inline-block">
                  <span style={{ color: C.accent }}>the Future</span>
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                    <path d="M2 6C50 2 150 2 198 6" stroke={C.accent} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
                  </svg>
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg lg:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
                Arx Talent combines AI-powered intelligence with deep market expertise to connect companies of any size with exceptional talent. IT, engineering, finance recruiting, and executive headhunting — without the hassle.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => nav('contact')}
                  className="px-8 py-4 rounded-lg font-bold text-[15px] tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  style={{ background: C.accent, color: C.dark }}>
                  Start Hiring Today <ArrowRight size={18} />
                </button>
                <button onClick={() => nav('candidates')}
                  className="px-8 py-4 rounded-lg font-bold text-[15px] tracking-wide transition-all duration-300 border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40">
                  I'm Looking for a Job
                </button>
              </div>
            </Reveal>
            <Reveal delay={0.5}>
              <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-8 lg:gap-14">
                {[{ n: 90, s: '%+', l: '2yr+ Retention Rate' }, { n: 500, s: '+', l: 'Placements Made' }, { n: 12, s: '+', l: 'Years Experience' }].map((st, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-3xl lg:text-4xl font-extrabold" style={{ color: C.accent }}><AnimCounter end={st.n} suffix={st.s} /></span>
                    <span className="text-gray-400 text-sm mt-1 font-medium">{st.l}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-white text-[11px] uppercase tracking-[0.2em] font-medium">Scroll</span>
          <ChevronDown size={20} className="text-white" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 lg:py-32" style={{ background: C.white }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <Reveal className="lg:w-1/2 relative">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full rounded-2xl" style={{ background: C.accent, opacity: 0.15 }} />
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Team" className="rounded-2xl shadow-2xl relative z-10 w-full object-cover aspect-[4/3]" />
                <div className="absolute -bottom-6 -right-6 z-20 bg-white rounded-xl shadow-xl px-6 py-4 flex items-center gap-3 border border-gray-100">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${C.accent}20` }}>
                    <Award size={22} style={{ color: C.accent }} />
                  </div>
                  <div>
                    <div className="font-extrabold text-lg" style={{ color: C.primary }}>Top Rated</div>
                    <div className="text-xs text-gray-400 font-medium">Recruitment Agency 2025</div>
                  </div>
                </div>
              </div>
            </Reveal>
            <div className="lg:w-1/2">
              <Reveal>
                <span className="uppercase text-[12px] font-bold tracking-[0.2em] mb-3 block" style={{ color: C.accent }}>About Arx Talent</span>
                <h2 className="text-3xl lg:text-4xl font-extrabold mb-6 leading-tight" style={{ color: C.primary }}>We Understand That Finding the Right People is Everything</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-gray-500 mb-5 text-[16px] leading-relaxed">
                  The cost of a bad hire is enormous — wasted months, tens of thousands of dollars, and damaged team morale. We believe that for each company there is an ideal employee, and for each professional there is a perfect workplace.
                </p>
                <p className="text-gray-500 mb-8 text-[16px] leading-relaxed">
                  Arx Talent specializes in IT, engineering, finance recruiting, and executive headhunting. We take into account every feature of your business, conduct technical interviews, and navigate the nuances of your industry with precision.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[{ icon: Shield, text: 'Thorough vetting process' }, { icon: Globe, text: 'Bay Area & nationwide' }, { icon: Zap, text: 'AI-powered matching' }, { icon: UserCheck, text: 'Cultural fit assessment' }].map(({ icon: Ic, text }, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${C.primary}10` }}>
                        <Ic size={17} style={{ color: C.primary }} />
                      </div>
                      <span className="text-sm font-medium text-gray-600 leading-snug pt-1">{text}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <button onClick={() => nav('process')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg text-white"
                  style={{ background: C.primary }}>
                  See How We Work <ArrowRight size={16} />
                </button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FOR EMPLOYERS */}
      <section id="employers" className="py-24 lg:py-32" style={{ background: C.light }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal className="text-center mb-16">
            <span className="uppercase text-[12px] font-bold tracking-[0.2em] mb-3 block" style={{ color: C.accent }}>For Employers</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4" style={{ color: C.primary }}>Staffing Solutions for Your Business</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-[16px]">Whether you need to scale fast or find the perfect long-term hire, we have solutions tailored to your unique needs.</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: 'Contract Staffing', desc: 'Find employees for seasonal, cyclical, or project-driven work. Reduce costs by paying only for hours worked, with flexible contracts.', features: ['Seasonal & project staffing', 'Pay only for hours worked', 'Flexible termination terms'], ac: '#3B82F6' },
              { icon: Users, title: 'Permanent Hire', desc: "When hiring permanent staff, there's no room for error. We ensure candidates have the right experience, skills, attitude, and cultural fit.", features: ['Skills & culture matching', 'Background verification', 'Onboarding support'], ac: C.accent },
              { icon: Target, title: 'Executive Headhunting', desc: 'Our team specializes in identifying and discreetly recruiting C-suite and VP-level leaders who can transform your organization.', features: ['C-Suite & VP recruitment', 'Confidential search', 'Leadership assessment'], ac: '#10B981' },
            ].map((svc, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: `${svc.ac}12` }}>
                    <svc.icon size={26} style={{ color: svc.ac }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: C.primary }}>{svc.title}</h3>
                  <p className="text-gray-500 text-[15px] leading-relaxed mb-6 flex-1">{svc.desc}</p>
                  <ul className="space-y-2.5">
                    {svc.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm text-gray-500">
                        <CheckCircle2 size={15} className="flex-shrink-0" style={{ color: svc.ac }} /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOR CANDIDATES */}
      <section id="candidates" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: C.primary }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: C.accent, filter: 'blur(120px)' }} />
        <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
          <Reveal className="text-center mb-16">
            <span className="uppercase text-[12px] font-bold tracking-[0.2em] mb-3 block" style={{ color: C.accent }}>For Candidates</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">Find Your Dream Career</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-[16px]">We help you find your own individual path and a company of your dreams. Our experienced recruiters guide you every step of the way.</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: FileText, title: 'Career Consulting', desc: 'Experienced recruiters help you create a professional CV and determine ideal requirements for your future employer.' },
              { icon: Briefcase, title: 'Temporary Positions', desc: "Don't want long-term obligations? We offer temporary vacancies to gain experience, explore company cultures, and keep options open." },
              { icon: Star, title: 'Permanent Placement', desc: 'We help specialists find permanent roles by understanding both employer needs and your personal requirements for the perfect workplace.' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="rounded-2xl p-8 h-full transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: `${C.accent}20` }}>
                    <item.icon size={26} style={{ color: C.accent }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 text-[15px] leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4} className="text-center mt-12">
            <button onClick={() => nav('vacancies')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-[15px] transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              style={{ background: C.accent, color: C.dark }}>
              Browse Open Roles <ArrowRight size={18} />
            </button>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 lg:py-32" style={{ background: C.white }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal className="text-center mb-20">
            <span className="uppercase text-[12px] font-bold tracking-[0.2em] mb-3 block" style={{ color: C.accent }}>How It Works</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4" style={{ color: C.primary }}>Our Recruiting Process</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-[16px]">A thorough, transparent process designed to find the perfect match — for both employers and candidates.</p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {[
              { step: '01', title: 'Vacancy Analysis', desc: 'We receive a request, dive deep into every detail and create a comprehensive job profile on our platform.' },
              { step: '02', title: 'CV Selection', desc: 'Applicants submit CVs, and our team carefully selects the most relevant candidates based on skills and experience.' },
              { step: '03', title: 'Initial Interview', desc: 'We invite selected candidates for an initial assessment of skills, work experience, and personal qualities.' },
              { step: '04', title: 'Reference Check', desc: 'We seek feedback from previous employers to confirm resume data and verify professional track records.' },
              { step: '05', title: 'Technical Interview', desc: 'Candidates meet with company reps — team leads, project managers — for a deep technical evaluation.' },
              { step: '06', title: 'Job Offer', desc: 'We select the best candidate and help create a compelling offer, negotiating until both parties are satisfied.' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="relative flex gap-5 group">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center font-extrabold text-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                      style={{ background: `${C.accent}15`, color: C.accent }}>
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-amber-600 transition-colors" style={{ color: C.primary }}>{item.title}</h3>
                    <p className="text-gray-500 text-[14px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="py-20 relative overflow-hidden" style={{ background: C.dark }}>
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${C.dark}ee, ${C.primary}ee)` }} />
        <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { v: 500, s: '+', l: 'Successful Placements' },
              { v: 90, s: '%', l: 'Client Retention Rate' },
              { v: 48, s: 'hr', l: 'Avg Time to Shortlist' },
              { v: 150, s: '+', l: 'Active Client Partners' },
            ].map((st, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div>
                  <div className="text-4xl lg:text-5xl font-extrabold mb-2" style={{ color: C.accent }}>
                    <AnimCounter end={st.v} suffix={st.s} />
                  </div>
                  <div className="text-gray-300 text-sm font-medium">{st.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN VACANCIES */}
      <section id="vacancies" className="py-24 lg:py-32" style={{ background: C.light }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal className="text-center mb-16">
            <span className="uppercase text-[12px] font-bold tracking-[0.2em] mb-3 block" style={{ color: C.accent }}>Open Roles</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4" style={{ color: C.primary }}>Current Vacancies</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-[16px]">Explore our latest opportunities. Don't see the right fit? Contact us — we have unlisted roles available.</p>
          </Reveal>
          <div className="grid gap-4 max-w-4xl mx-auto">
            {[
              { title: 'Machine Learning Engineer', company: 'AI-Driven Startup', location: 'Remote / San Francisco', type: 'Full-Time', tags: ['TensorFlow', 'PyTorch', 'Python'] },
              { title: 'Senior iOS Developer', company: 'Leading Software Co.', location: 'New York, NY', type: 'Full-Time', tags: ['Swift', 'UIKit', 'REST APIs'] },
              { title: 'VP of Finance', company: 'Series B FinTech', location: 'New York, NY', type: 'Full-Time', tags: ['FP&A', 'Fundraising', 'Strategy'] },
              { title: 'DevOps Engineer', company: 'Enterprise SaaS', location: 'Remote', type: 'Contract', tags: ['AWS', 'Kubernetes', 'CI/CD'] },
              { title: 'Product Manager', company: 'Growth-Stage Startup', location: 'San Francisco, CA', type: 'Full-Time', tags: ['B2B SaaS', 'Agile', 'Analytics'] },
            ].map((job, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="bg-white rounded-xl p-6 flex flex-col md:flex-row md:items-center gap-4 border border-gray-100 shadow-sm hover:shadow-lg hover:border-amber-200 transition-all duration-300 cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${C.primary}10` }}>
                    <Briefcase size={20} style={{ color: C.primary }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold group-hover:text-amber-600 transition-colors" style={{ color: C.primary }}>{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400 mt-1">
                      <span className="flex items-center gap-1"><Building2 size={13} />{job.company}</span>
                      <span className="flex items-center gap-1"><MapPin size={13} />{job.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag, j) => (
                      <span key={j} className="px-3 py-1 rounded-full text-[12px] font-medium" style={{ background: `${C.primary}08`, color: C.primary }}>{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${job.type === 'Contract' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>{job.type}</span>
                    <ArrowRight size={18} className="text-gray-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4} className="text-center mt-10">
            <button onClick={() => nav('contact')} className="inline-flex items-center gap-2 text-[15px] font-bold transition-colors hover:underline" style={{ color: C.primary }}>
              Don't see your role? Let's talk <ArrowRight size={16} />
            </button>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 lg:py-32" style={{ background: C.white }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal className="text-center mb-16">
            <span className="uppercase text-[12px] font-bold tracking-[0.2em] mb-3 block" style={{ color: C.accent }}>Testimonials</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4" style={{ color: C.primary }}>What Our Partners Say</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "Arx Talent transformed our hiring process. They understood our culture from day one and delivered candidates that were a perfect fit.", name: "Sarah Chen", role: "VP of Engineering", company: "CloudScale Inc." },
              { quote: "The team's expertise in executive search is unmatched. They found us a CTO who has completely elevated our technical strategy.", name: "Marcus Williams", role: "CEO & Co-Founder", company: "NexaFin" },
              { quote: "As a candidate, Arx made the process seamless. They matched me with a role that aligned perfectly with my career goals.", name: "Elena Rodriguez", role: "Senior Data Scientist", company: "Placed via Arx" },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="bg-gray-50 rounded-2xl p-8 h-full flex flex-col border border-gray-100">
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, j) => <Star key={j} size={16} fill={C.accent} style={{ color: C.accent }} />)}
                  </div>
                  <p className="text-gray-600 text-[15px] leading-relaxed flex-1 italic">"{t.quote}"</p>
                  <div className="mt-6 pt-6 border-t border-gray-200 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{ background: C.primary }}>
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-bold text-sm" style={{ color: C.primary }}>{t.name}</div>
                      <div className="text-xs text-gray-400">{t.role}, {t.company}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 lg:py-32" style={{ background: C.light }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal className="text-center mb-16">
            <span className="uppercase text-[12px] font-bold tracking-[0.2em] mb-3 block" style={{ color: C.accent }}>Get In Touch</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4" style={{ color: C.primary }}>Ready to Get Started?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-[16px]">Whether you're looking for a job or a new employee, fill out the form and we'll get back to you shortly.</p>
          </Reveal>
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10">
            <Reveal className="lg:w-2/5">
              <div className="rounded-2xl p-8 h-full text-white" style={{ background: C.primary }}>
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {[
                    { icon: MapPin, label: 'Address', value: '175 Greenwich St,\n3 World Trade Center,\nNew York, NY 10007' },
                    { icon: Phone, label: 'Phone', value: '+1 646-687-7704' },
                    { icon: Mail, label: 'Email', value: 'info@arxtalent.com' },
                  ].map(({ icon: Ic, label, value }, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }}>
                        <Ic size={18} style={{ color: C.accent }} />
                      </div>
                      <div>
                        <div className="font-semibold text-sm mb-1">{label}</div>
                        <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 pt-6 border-t border-white/10">
                  <div className="text-sm font-semibold mb-3">Follow Us</div>
                  <div className="flex gap-3">
                    {[Linkedin, Facebook, Youtube].map((Ic, i) => (
                      <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110" style={{ background: 'rgba(255,255,255,0.1)' }}>
                        <Ic size={16} className="text-gray-300" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="lg:w-3/5">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6" style={{ color: C.primary }}>Send us a message</h3>
                {formSt === 'success' && (
                  <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium flex items-center gap-2">
                    <CheckCircle2 size={18} /> We've received your message. A specialist will reach out shortly.
                  </div>
                )}
                {formSt === 'error' && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-2">
                    <X size={18} /> Please fill out your name, email, and message.
                  </div>
                )}
                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Name *</label>
                      <input type="text" name="name" value={form.name} onChange={onFormChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition text-[15px]"
                        placeholder="Jane Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Phone <span className="text-gray-400 font-normal">(Optional)</span></label>
                      <input type="tel" name="phone" value={form.phone} onChange={onFormChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition text-[15px]"
                        placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Email *</label>
                    <input type="email" name="email" value={form.email} onChange={onFormChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition text-[15px]"
                      placeholder="jane@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Message *</label>
                    <textarea name="message" value={form.message} onChange={onFormChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition text-[15px] h-32 resize-none"
                      placeholder="Tell us what you're looking for..." />
                  </div>
                  <button onClick={onSubmit}
                    className="w-full md:w-auto px-8 py-3.5 rounded-lg font-bold text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-white flex items-center justify-center gap-2"
                    style={{ background: C.primary }}>
                    <Send size={16} /> Send Message
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.dark }} className="text-gray-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <img src={arxLogo} alt="Arx Talent" className="h-9 w-auto rounded" />
                <span className="text-white font-bold text-lg">Arx Talent</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">A premier recruitment firm providing reliable staffing services for companies of any size. IT, engineering, finance & executive search.</p>
              <div className="flex gap-3">
                {[Linkedin, Facebook, Youtube].map((Ic, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                    <Ic size={16} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Services</h4>
              <ul className="space-y-3 text-sm">
                {['Executive Search', 'Permanent Hire', 'Contract Staffing', 'Career Consulting', 'Technical Interviews'].map((s, i) => (
                  <li key={i}><button onClick={() => nav('employers')} className="hover:text-amber-400 transition-colors">{s}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-3 text-sm">
                {[{ l: 'About Us', id: 'about' }, { l: 'Our Process', id: 'process' }, { l: 'Open Roles', id: 'vacancies' }, { l: 'Contact', id: 'contact' }].map((item, i) => (
                  <li key={i}><button onClick={() => nav(item.id)} className="hover:text-amber-400 transition-colors">{item.l}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="flex-shrink-0 mt-0.5" style={{ color: C.accent }} />
                  <span>175 Greenwich St,<br/>3 World Trade Center,<br/>New York, NY 10007</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="flex-shrink-0" style={{ color: C.accent }} />
                  <span>+1 646-687-7704</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="flex-shrink-0" style={{ color: C.accent }} />
                  <span>info@arxtalent.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <span>&copy; {new Date().getFullYear()} Arx Talent. All rights reserved.</span>
            <span className="flex gap-6">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            </span>
          </div>
        </div>
      </footer>

      {/* SCROLL TO TOP */}
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 text-white"
          style={{ background: C.primary }}>
          <ChevronUp size={22} />
        </button>
      )}
    </div>
  );
};

export default App;
