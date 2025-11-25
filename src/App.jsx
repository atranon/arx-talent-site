import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, BarChart3, Users, Target, 
  Briefcase, CheckCircle2, ArrowRight, Mail, Phone, 
  MapPin, Calendar, Globe, Linkedin, Facebook, Youtube, 
  Search, Clock
} from 'lucide-react';

// --- LOGO CONFIGURATION ---
// INSTRUCTIONS:
// 1. Upload your logo to https://postimages.org/
// 2. Copy the "Direct Link" (ending in .jpg or .png)
// 3. Paste it inside the quotes below.
const arxLogo = "https://i.postimg.cc/nhCgpnxr/arx.jpg"; 
// ^ I added a temporary placeholder. Replace this with your actual link.

// --- Components ---

const Button = ({ children, variant = 'primary', className = '', onClick }) => {
  const baseStyle = "px-6 py-3 rounded-md font-semibold transition-all duration-300 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30",
    secondary: "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    white: "bg-white text-blue-900 hover:bg-blue-50 shadow-lg"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeading = ({ subtitle, title, align = 'center', light = false }) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <span className={`uppercase tracking-wider text-sm font-bold ${light ? 'text-blue-400' : 'text-blue-600'} mb-2 block`}>
      {subtitle}
    </span>
    <h2 className={`text-3xl md:text-4xl font-bold ${light ? 'text-white' : 'text-slate-900'}`}>
      {title}
    </h2>
    <div className={`h-1 w-20 bg-blue-600 mt-4 rounded-full ${align === 'center' ? 'mx-auto' : ''}`}></div>
  </div>
);

const ServiceCard = ({ icon: Icon, imageSrc, title, description, features }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
    <div className="h-16 w-16 mb-6">
      {imageSrc ? (
        <img src={imageSrc} alt={title} className="w-full h-full object-contain filter group-hover:brightness-110 transition-all" />
      ) : (
        <div className="h-full w-full bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
           <Icon className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />
        </div>
      )}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 mb-6 leading-relaxed">{description}</p>
    <ul className="space-y-2">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-2 text-sm text-slate-500">
          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

const BlogPost = ({ post, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer border border-slate-100 flex flex-col h-full"
  >
    <div className="h-48 bg-slate-200 overflow-hidden relative group">
      <img 
        src={post.image} 
        alt={post.title} 
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'; }}
      />
      <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
        {post.category}
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex items-center text-slate-400 text-sm mb-3">
        <Calendar className="h-4 w-4 mr-1" />
        {post.date}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3 hover:text-blue-600 transition-colors">
        {post.title}
      </h3>
      <p className="text-slate-600 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
      <div className="flex items-center text-blue-600 font-semibold text-sm group">
        Read Article <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </div>
);

const Modal = ({ isOpen, onClose, title, message, type }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 animate-scale-in border border-slate-100">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto ${type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {type === 'success' ? <CheckCircle2 className="h-6 w-6" /> : <X className="h-6 w-6" />}
        </div>
        <h3 className="text-xl font-bold text-slate-900 text-center mb-2">{title}</h3>
        <p className="text-slate-600 text-center mb-6">{message}</p>
        <Button onClick={onClose} className="w-full">
          {type === 'success' ? 'Close' : 'Got it'}
        </Button>
      </div>
    </div>
  );
};

// --- Pages ---

const HomePage = ({ navigate }) => (
  <div className="animate-fade-in">
    {/* Hero Section */}
    <section className="relative bg-slate-900 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
         <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Background" 
            className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-slate-900/80"></div>
      </div>
      
      {/* Decorative Gradients */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500 blur-3xl rounded-l-full transform translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-purple-900 blur-3xl rounded-r-full transform -translate-x-1/4 opacity-60"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Growth isn't a straight line. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              It's an Arc.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            From early-stage startups to scale. We combine AI-powered intelligence with deep market expertise to build teams that define the future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('schedule-audit')}>
              Start Your Journey
            </Button>
            <Button variant="secondary" onClick={() => navigate('services')}>
              Explore Services
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* About Brief */}
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 relative">
             <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full z-0"></div>
             <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-100 rounded-full z-0"></div>
             <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Team collaboration" 
              className="rounded-2xl shadow-2xl relative z-10"
            />
          </div>
          <div className="lg:w-1/2">
            <SectionHeading 
              subtitle="About Arx" 
              title="Where Data Meets Intuition" 
              align="left"
            />
            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
              We're your partner in building teams from early stage startups to scale. Our approach combines AI-powered candidate intelligence, deep market expertise, and a consultative methodology.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="border-l-4 border-blue-600 pl-4">
                <h4 className="text-3xl font-bold text-slate-900">95%</h4>
                <p className="text-slate-500 text-sm">Client Satisfaction</p>
              </div>
              <div className="border-l-4 border-purple-600 pl-4">
                <h4 className="text-3xl font-bold text-slate-900">300+</h4>
                <p className="text-slate-500 text-sm">Successful Hires</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate('about')}>Learn More About Us</Button>
          </div>
        </div>
      </div>
    </section>

    {/* Services Preview */}
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle="What We Do" title="Comprehensive Talent Solutions" />
        
        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard 
            imageSrc="https://638kq.weblium.site/res/62b3010a114d26000e4645b8/62ebcf09d0dc25000d2bd087"
            icon={Users}
            title="Executive Search"
            description="Finding the right leaders who can turn your vision into reality. We identify exceptional C-Suite & VP talent."
            features={["Leadership assessment", "Succession planning", "Board recruitment"]}
          />
          <ServiceCard 
            imageSrc="https://638kq.weblium.site/res/62b3010a114d26000e4645b8/62ebcf09e5a6d8000ddb6846"
            icon={Target}
            title="Direct Hire"
            description="Connecting you with professionals across all functions. We leverage targeted sourcing for immediate impact."
            features={["Mid-Senior professionals", "Technical roles", "Market intelligence"]}
          />
          <ServiceCard 
            imageSrc="https://638kq.weblium.site/res/62b3010a114d26000e4645b8/62ebcf11d1754f000e868e2f"
            icon={BarChart3}
            title="Talent Advisory"
            description="Strategic workforce consulting to help you optimize strategies, benchmark compensation, and build teams."
            features={["Workforce planning", "Org design", "Compensation benchmarking"]}
          />
        </div>
      </div>
    </section>

    {/* Clients / Logos */}
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="container mx-auto px-6 text-center">
        <p className="text-slate-400 font-semibold tracking-widest uppercase mb-8">Trusted by Industry Leaders</p>
        <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale">
          {['TechFlow', 'GlobalFin', 'EcoSystems', 'HealthPlus', 'DataCore'].map((brand, i) => (
             <span key={i} className="text-2xl font-bold text-slate-800">{brand}</span>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-600 opacity-10 pattern-dots"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Build Your Winning Team?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Schedule a free audit of your current hiring strategy and let's define your arc.
        </p>
        <div className="flex justify-center">
          <Button 
            variant="white"
            onClick={() => navigate('schedule-audit')}
          >
            Schedule Your Audit
          </Button>
        </div>
      </div>
    </section>
  </div>
);

const BlogPage = ({ navigate }) => {
  const posts = [
    {
      id: 1,
      title: "The Future of Executive Search in 2025",
      excerpt: "How AI and data analytics are transforming the way organizations identify and attract top leadership talent in a competitive market.",
      date: "Oct 24, 2024",
      category: "Trends",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Building Diverse Leadership Teams",
      excerpt: "Strategies for creating inclusive C-suites that drive innovation, enhance decision-making, and strengthen organizational performance.",
      date: "Nov 02, 2024",
      category: "Leadership",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Compensation Trends: What to Expect",
      excerpt: "A comprehensive analysis of salary benchmarks, equity structures, and benefits packages across industries and roles for the upcoming fiscal year.",
      date: "Nov 15, 2024",
      category: "Compensation",
      image: "https://images.unsplash.com/photo-1554224155-98406858d0cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Navigating Remote Work Culture",
      excerpt: "As remote work becomes permanent for many, how do leaders maintain culture and engagement across distributed teams?",
      date: "Nov 20, 2024",
      category: "Culture",
      image: "https://images.unsplash.com/photo-1593642632823-8f78536788c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "The Art of the Exit Interview",
      excerpt: "Why offboarding is just as important as onboarding, and how to gather critical data from departing employees.",
      date: "Nov 21, 2024",
      category: "HR Strategy",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle="Our Insights" title="Arx Blog & Resources" />
        
        {/* Featured Post */}
        <div className="mb-16 bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col lg:flex-row">
          <div className="lg:w-3/5 h-64 lg:h-auto relative">
             <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
              alt="Featured" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">Featured</div>
          </div>
          <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
            <span className="text-slate-400 text-sm mb-2">November 22, 2024</span>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Retention is the New Recruitment</h2>
            <p className="text-slate-600 mb-6">In a volatile market, keeping your best talent is more cost-effective than finding new ones. Discover strategies for high-impact retention.</p>
            <Button variant="outline" className="self-start">Read Full Story</Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <BlogPost key={post.id} post={post} onClick={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ScheduleAuditPage = ({ navigate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companySize: '1-10 employees',
    challenge: ''
  });
  const [modal, setModal] = useState({ show: false, type: 'success', title: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.challenge) {
      setModal({
        show: true,
        type: 'error',
        title: 'Missing Fields',
        message: 'Please fill out all required fields including your name, email, and hiring challenge.'
      });
      return;
    }

    // Success logic
    setModal({
      show: true,
      type: 'success',
      title: 'Request Sent!',
      message: "We've received your audit request. A specialist will review your details and reach out shortly."
    });
  };

  return (
  <div className="pt-32 pb-20 bg-white min-h-screen">
    <Modal 
      isOpen={modal.show} 
      onClose={() => setModal({ ...modal, show: false })}
      title={modal.title}
      message={modal.message}
      type={modal.type}
    />
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Schedule Your Talent Audit</h1>
          <p className="text-lg text-slate-600">
            Let's identify the gaps in your current hiring strategy. Fill out the form below to book a complimentary 30-minute consultation with a senior advisor.
          </p>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-slate-900 p-8 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-6">What to expect</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-400 shrink-0" />
                  <span className="text-slate-300 text-sm">30-minute deep dive session</span>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart3 className="h-5 w-5 text-blue-400 shrink-0" />
                  <span className="text-slate-300 text-sm">Analysis of current hiring metrics</span>
                </li>
                <li className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-blue-400 shrink-0" />
                  <span className="text-slate-300 text-sm">Actionable roadmap for improvement</span>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <p className="text-xs text-slate-500 italic">"The audit gave us clarity we didn't know we needed." - CEO, FinTech Startup</p>
            </div>
          </div>

          <div className="md:w-2/3 p-8 lg:p-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
                    placeholder="Jane" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
                    placeholder="Doe" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Work Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
                  placeholder="jane@company.com" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Company Size</label>
                <select 
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-slate-600"
                >
                  <option>1-10 employees</option>
                  <option>11-50 employees</option>
                  <option>51-200 employees</option>
                  <option>201-500 employees</option>
                  <option>500+ employees</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Primary Hiring Challenge</label>
                <textarea 
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition h-24 resize-none" 
                  placeholder="Briefly describe what you're struggling with..."
                ></textarea>
              </div>

              <Button className="w-full">Request Audit Time</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

const ContactPage = ({ navigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [modal, setModal] = useState({ show: false, type: 'success', title: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation: Check Name, Email, and Message (Phone is optional)
    if (!formData.name || !formData.email || !formData.message) {
      setModal({
        show: true,
        type: 'error',
        title: 'Missing Fields',
        message: 'Please fill out your name, email, and message. Phone number is optional.'
      });
      return;
    }

    // Success logic
    setModal({
      show: true,
      type: 'success',
      title: 'Message Sent!',
      message: "Thanks for reaching out! We've received your message and will get back to you shortly."
    });
    
    // Optional: Reset form on success
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
  <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
    <Modal 
      isOpen={modal.show} 
      onClose={() => setModal({ ...modal, show: false })}
      title={modal.title}
      message={modal.message}
      type={modal.type}
    />
    <div className="container mx-auto px-6">
      <SectionHeading subtitle="Get In Touch" title="Contact Us" />

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Info Cards */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Call Us</h4>
              <p className="text-slate-600 text-sm mt-1">Office: +1 646-687-7704</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Email Us</h4>
              <p className="text-slate-600 text-sm mt-1">info@arxtalent.com</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-slate-700">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none transition" 
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Phone <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none transition" 
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none transition" 
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none transition h-32 resize-none"
              ></textarea>
            </div>
            <Button className="w-full md:w-auto">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' }, 
    { id: 'blog', label: 'Blog' },
    { id: 'schedule-audit', label: 'Schedule Audit' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-white">
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div 
            onClick={() => navigate('home')} 
            className="cursor-pointer flex items-center gap-2"
          >
            <img 
              src={arxLogo} 
              alt="Arx Talent Logo" 
              className="h-10 w-auto"
            />
            <span className={`font-bold text-xl ${scrolled ? 'text-slate-900' : 'text-white'}`}>
              Arx Talent
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className={`text-sm font-semibold hover:text-blue-500 transition-colors ${
                  activeTab === link.id 
                    ? 'text-blue-500' 
                    : (scrolled ? 'text-slate-600' : 'text-slate-300')
                }`}
              >
                {link.label}
              </button>
            ))}
            <Button 
              variant={scrolled ? 'primary' : 'outline'} 
              className={!scrolled ? 'border-white text-white hover:bg-white hover:text-blue-900' : ''}
              onClick={() => navigate('contact')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen 
              ? <X className={scrolled ? 'text-slate-900' : 'text-white'} /> 
              : <Menu className={scrolled ? 'text-slate-900' : 'text-white'} />
            }
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-xl py-8 px-6 flex flex-col gap-4 border-t border-slate-100 md:hidden">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className={`text-lg font-semibold text-left ${
                  activeTab === link.id ? 'text-blue-600' : 'text-slate-600'
                }`}
              >
                {link.label}
              </button>
            ))}
            <Button className="w-full mt-4" onClick={() => navigate('schedule-audit')}>
              Schedule Audit
            </Button>
          </div>
        )}
      </nav>

      {/* Content Rendering */}
      <main>
        {activeTab === 'home' && <HomePage navigate={navigate} />}
        {activeTab === 'services' && <HomePage navigate={navigate} />} 
        {activeTab === 'blog' && <BlogPage navigate={navigate} />}
        {activeTab === 'schedule-audit' && <ScheduleAuditPage navigate={navigate} />}
        {activeTab === 'contact' && <ContactPage navigate={navigate} />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                 <img 
                   src={arxLogo} 
                   alt="Arx Talent" 
                   className="h-8 w-auto rounded" 
                 />
              </div>
              <p className="text-sm leading-relaxed mb-6">
                A premier executive search and talent acquisition firm. We partner with clients to build high-performing teams that drive sustainable growth.
              </p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition"><Linkedin className="h-5 w-5" /></a>
                <a href="#" className="hover:text-white transition"><Facebook className="h-5 w-5" /></a>
                <a href="#" className="hover:text-white transition"><Youtube className="h-5 w-5" /></a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">Executive Search</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Direct Hire Recruitment</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Talent Advisory</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Market Analysis</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Succession Planning</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => navigate('about')} className="hover:text-blue-400 transition">About Us</button></li>
                <li><button onClick={() => navigate('blog')} className="hover:text-blue-400 transition">Blog & Insights</button></li>
                <li><button onClick={() => navigate('schedule-audit')} className="hover:text-blue-400 transition">Schedule Audit</button></li>
                <li><a href="#" className="hover:text-blue-400 transition">Careers at Arx</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-500 shrink-0" />
                  <span>175 Greenwich St,<br/>3 World Trade Center,<br/>New York, NY 10007</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-500 shrink-0" />
                  <span>+1 646-687-7704</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                  <span>info@arxtalent.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Arx Talent. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;