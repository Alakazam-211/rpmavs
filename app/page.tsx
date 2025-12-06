'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import GlassCard from './components/ui/GlassCard';
import GlassButton from './components/ui/GlassButton';
import {
  PanelIcon,
  NoIcon,
  ShuffleIcon,
  CommentIcon,
  MedalIcon,
  DashboardIcon,
  HammerIcon,
  BadgeIcon,
  EyeIcon,
  PanelIcon as ControlIcon,
  RulerPencilIcon,
  StatsUpIcon,
  UserIcon,
  RulerIcon,
} from './components/icons';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const trustedBrands = [
    { name: 'Polycom', favicon: 'https://www.poly.com/favicon.ico', logo: '/brands/Polycom_logo_72.png', website: 'https://www.poly.com', useLogo: true },
    { name: 'AMX', favicon: 'https://www.amx.com/favicon.ico', logo: '/brands/AMX_logo_blue_72.png', website: 'https://www.amx.com', useLogo: true },
    { name: 'Crestron', favicon: 'https://www.crestron.com/favicon.ico', logo: '/brands/crestron-logo2.png', website: 'https://www.crestron.com', useLogo: false },
    { name: 'Cisco', favicon: 'https://www.cisco.com/favicon.ico', logo: '/brands/Cisco.png', website: 'https://www.cisco.com', useLogo: true },
    { name: 'BSS', favicon: 'https://www.bssaudio.com/favicon.ico', logo: '/brands/BSS.png', website: 'https://www.bssaudio.com', useLogo: true },
    { name: 'Extron', favicon: 'https://www.extron.com/favicon.ico', logo: '/brands/extron.png', website: 'https://www.extron.com', useLogo: false },
    { name: 'MediaMatrix', favicon: 'https://www.mediamatrix.com/favicon.ico', logo: '/brands/MM.png', website: 'https://www.mediamatrix.com', useLogo: true },
    { name: 'Peavey', favicon: 'https://www.peavey.com/favicon.ico', logo: '/brands/Peavey.png', website: 'https://www.peavey.com', useLogo: true },
    { name: 'QSYS', favicon: 'https://www.qsys.com/favicon.ico', logo: '/brands/QSYS.png', website: 'https://www.qsys.com', useLogo: true },
    { name: 'QSC', favicon: 'https://www.qsc.com/favicon.ico', logo: '/brands/QSC.png', website: 'https://www.qsc.com', useLogo: true },
  ];

  const solutions = [
    {
      title: 'Expert Installation',
      description: 'Certified technicians deliver flawless AV installations with zero outsourcing',
      icon: BadgeIcon,
      outcome: 'Professional installations that work perfectly from day one',
    },
    {
      title: 'System Programming',
      description: 'User-friendly control interfaces that make complex systems simple to operate',
      icon: ControlIcon,
      outcome: 'Intuitive systems your team will actually use',
    },
    {
      title: 'Design & Engineering',
      description: 'CTS-D certified engineers create designs that maximize performance and value',
      icon: RulerPencilIcon,
      outcome: 'Optimized designs that save time and money',
    },
  ];

  const benefits = [
    {
      title: 'Zero Outsourcing',
      description: '100% employee workforce ensures consistent quality and accountability',
      icon: NoIcon,
    },
    {
      title: 'Fixed Price Guarantee',
      description: 'Get a fixed price quote at no charge - no surprises, no hidden costs',
      icon: PanelIcon,
    },
    {
      title: '3-Year Warranty',
      description: "We stand behind our work. If you find a defect, we'll fix it free",
      icon: DashboardIcon,
    },
    {
      title: 'Maximum Flexibility',
      description: 'Large enough team to accommodate schedule changes without delays',
      icon: ShuffleIcon,
    },
    {
      title: 'Top Certifications',
      description: '239 certifications across all major AV brands and platforms',
      icon: MedalIcon,
    },
    {
      title: 'Full Accountability',
      description: 'Partners guarantee our work - your success is our reputation',
      icon: CommentIcon,
    },
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Send Us Your Project',
      description: 'Share your project documentation and requirements. We\'ll review everything and provide a fixed-price quote at no charge.',
    },
    {
      step: '2',
      title: 'We Assemble Your Team',
      description: 'Our project managers assign certified specialists with the exact skills needed for your project from our 50+ technician team.',
    },
    {
      step: '3',
      title: 'We Deliver & Support',
      description: 'We complete your project with daily reporting, quality control, and full documentation. Plus, we back it with a 3-year warranty.',
    },
  ];

  // Google Reviews - Real customer reviews
  const testimonials = [
    {
      name: 'Kimberly McPhail',
      rating: 5,
      text: 'RPM AVS is a fantastic company with a strong commitment to quality, professionalism, and customer satisfaction. The team is knowledgeable, responsive, and truly goes the extra mile to deliver top-tier AV solutions. From the initial consultation to final installation, everything was handled with care and attention to detail.',
      company: 'Google Review • 4 months ago',
    },
    {
      name: 'Larry Sattler',
      rating: 5,
      text: 'I have been working with RPMAV for 1 year. I have done several projects with them. They always provide a high level of service and great communication. Each technician is very professional and does great work. The pricing I receive is always fair and the quality of the work far exceeds the price I am being charged.',
      company: 'Local Guide • 5 years ago',
    },
    {
      name: 'Jim Winter',
      rating: 4,
      text: 'I have done several jobs with RPM and always found them to be responsive, knowledgeable, flexible, and easy to work with. We have done some small jobs and some pretty extensive jobs, all of which turned out great.',
      company: 'Google Review • 5 years ago',
    },
  ];

  const faqs = [
    {
      question: 'Do you outsource any work?',
      answer: 'No. RPM uses zero outsourcing. We have a 100% employee workforce of 50+ certified technicians, ensuring consistent quality and full accountability on every project.',
    },
    {
      question: 'How do you price projects?',
      answer: 'We provide fixed-scope, fixed-price quotes at no charge. Simply send us your project documentation and we\'ll give you a clear price with no surprises.',
    },
    {
      question: 'What certifications do you hold?',
      answer: 'RPM holds 239 certifications across all major AV brands including Crestron, AMX, Extron, Cisco, QSC, Q-SYS, and many more. Our team includes CTS-D certified design engineers.',
    },
    {
      question: 'Do you offer a warranty?',
      answer: 'Yes. We offer a 3-year warranty on all workmanship. If you find a defect, we\'ll return and fix it for free.',
    },
    {
      question: 'Where do you provide services?',
      answer: 'Based in the Southeast with offices in Atlanta, Birmingham, Raleigh, Charlotte, and Tampa, but we travel nationwide. We can be on-site anywhere in the U.S. when you need us.',
    },
    {
      question: 'How quickly can you start a project?',
      answer: 'With our large team and maximum flexibility, we can accommodate your schedule. Contact us with your timeline and we\'ll work to meet your needs.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 relative" style={{
        backgroundImage: 'linear-gradient(180deg, #f8fbfc 0%, #f5f9fb 25%, #f2f7fa 50%, #f5f9fb 75%, #f8fbfc 100%)',
        backgroundAttachment: 'fixed',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}>
        {/* Unified subtle texture overlay - consistent across all sections */}
        <div className="fixed inset-0 pointer-events-none z-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(32, 117, 191, 0.02) 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }} />
        
        {/* Random circular opacity gradients - noise-like distribution */}
        <div className="fixed inset-0 pointer-events-none z-0" style={{
          backgroundImage: `
            radial-gradient(circle 400px at 15% 20%, rgba(32, 117, 191, 0.08) 0%, rgba(32, 117, 191, 0.03) 30%, transparent 60%),
            radial-gradient(circle 350px at 75% 15%, rgba(45, 141, 212, 0.06) 0%, rgba(45, 141, 212, 0.02) 35%, transparent 65%),
            radial-gradient(circle 500px at 25% 60%, rgba(32, 117, 191, 0.07) 0%, rgba(32, 117, 191, 0.025) 40%, transparent 70%),
            radial-gradient(circle 450px at 80% 55%, rgba(45, 141, 212, 0.05) 0%, rgba(45, 141, 212, 0.015) 30%, transparent 60%),
            radial-gradient(circle 380px at 10% 85%, rgba(32, 117, 191, 0.06) 0%, rgba(32, 117, 191, 0.02) 35%, transparent 65%),
            radial-gradient(circle 420px at 90% 80%, rgba(45, 141, 212, 0.07) 0%, rgba(45, 141, 212, 0.025) 40%, transparent 70%),
            radial-gradient(circle 360px at 50% 10%, rgba(32, 117, 191, 0.05) 0%, rgba(32, 117, 191, 0.015) 30%, transparent 60%),
            radial-gradient(circle 480px at 45% 90%, rgba(45, 141, 212, 0.06) 0%, rgba(45, 141, 212, 0.02) 35%, transparent 65%),
            radial-gradient(circle 320px at 65% 40%, rgba(32, 117, 191, 0.04) 0%, rgba(32, 117, 191, 0.01) 25%, transparent 55%),
            radial-gradient(circle 440px at 30% 75%, rgba(45, 141, 212, 0.05) 0%, rgba(45, 141, 212, 0.015) 30%, transparent 60%)
          `,
        }} />
        
        {/* Hero Section */}
        <section 
          className="relative h-screen min-h-[500px] flex items-center justify-center overflow-hidden z-10"
          style={{
            backgroundImage: 'url(/hero-background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-20 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-4 sm:mb-6 leading-tight drop-shadow-2xl uppercase tracking-wider px-4" style={{ fontFamily: 'var(--font-oswald), sans-serif', letterSpacing: '0.1em' }}>
                CERTIFIED<br />MATTERS
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto text-white/95 leading-relaxed px-4">
                The largest team of certified AV experts in the country. Zero outsourcing. 3-year warranty. Fixed-price quotes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-4 w-full sm:w-auto">
                <GlassButton 
                  href="/get-a-quote" 
                  variant="primary"
                  className="!bg-white/25 !backdrop-blur-md !border-2 !border-white/40 !text-white hover:!bg-white/35 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto min-h-[48px]"
                >
                  Get A Free Quote
                </GlassButton>
                <GlassButton 
                  href="/contact" 
                  variant="secondary"
                  className="!bg-white/15 !backdrop-blur-md !border !border-white/25 !text-white hover:!bg-white/25 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto min-h-[48px]"
                >
                  Contact Us
                </GlassButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Social Proof - Trusted Brands */}
        <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 z-10">
          <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-6 sm:mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 text-[#2075bf] uppercase leading-tight px-4">
                  TRUSTED BRANDS
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 px-4">
                  We work with the industry's leading manufacturers
                </p>
              </div>
              
              <GlassCard className="p-4 sm:p-6 md:p-8 lg:p-12">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-center">
                  {trustedBrands.map((brand, index) => (
                    <a
                      key={index}
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center h-14 sm:h-16 md:h-20 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl bg-white border border-gray-200/50 hover:border-gray-300 hover:shadow-md active:scale-95 sm:hover:scale-105 transition-all duration-300 group touch-manipulation"
                    >
                      <img
                        src={brand.useLogo ? brand.logo : brand.favicon}
                        alt={`${brand.name} logo`}
                        className="w-auto h-8 sm:h-10 md:h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                        loading="eager"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = brand.logo;
                        }}
                      />
                    </a>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 z-10">
          <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 sm:mb-12 md:mb-16 px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-[#2075bf] uppercase leading-tight">
                  What You Get
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                  Focus on what your project gains - professional results, reliable systems, and peace of mind
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {solutions.map((solution, index) => {
                  const IconComponent = solution.icon;
                  return (
                    <div key={index}>
                      <GlassCard className="h-full text-center p-5 sm:p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
                        <div className="mb-3 sm:mb-4 md:mb-6 flex justify-center">
                          <div className="p-3 sm:p-4 bg-gradient-to-br from-[#2075bf]/10 to-[#2075bf]/5 rounded-full ring-2 ring-[#2075bf]/10">
                            <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#2075bf]" />
                          </div>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-[#2075bf] uppercase">
                          {solution.title}
                        </h3>
                        <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                          {solution.description}
                        </p>
                        <p className="text-[#2075bf] font-semibold text-xs sm:text-sm md:text-base flex items-center justify-center gap-1">
                          <span className="text-base sm:text-lg">→</span> {solution.outcome}
                        </p>
                      </GlassCard>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 z-10">
          <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 sm:mb-12 md:mb-16 px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-[#2075bf] uppercase leading-tight">
                  Why Choose RPM
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                  Key advantages that set us apart: 24/7 reliability, seamless integration, and superior efficiency
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index}>
                      <GlassCard className="h-full p-4 sm:p-6 md:p-8 hover:shadow-lg transition-all duration-300 sm:hover:-translate-y-1">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="flex-shrink-0">
                            <div className="p-2 sm:p-3 bg-gradient-to-br from-[#2075bf]/15 to-[#2075bf]/5 rounded-lg ring-1 ring-[#2075bf]/10">
                              <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#2075bf]" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-[#2075bf] uppercase">
                              {benefit.title}
                            </h3>
                            <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed">
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                      </GlassCard>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Process Section - How It Works */}
        <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 z-10">
          <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 sm:mb-12 md:mb-16 px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-[#2075bf] uppercase leading-tight">
                  How It Works
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                  Simple, straightforward process that shows our solution is easy to implement
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 relative">
                {/* Connecting line - spans full width */}
                <div className="hidden md:block absolute top-[32px] sm:top-[40px] left-[calc(16.666%+40px)] sm:left-[calc(16.666%+50px)] right-[calc(16.666%+40px)] sm:right-[calc(16.666%+50px)] h-0.5 bg-gradient-to-r from-transparent via-[#2075bf]/20 to-transparent" />
                {processSteps.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#2075bf] to-[#1a5d99] text-white rounded-full text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 relative z-10 shadow-lg">
                        {step.step}
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-[#2075bf] uppercase">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed px-2">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8 sm:mt-12 md:mt-16 px-4">
                <GlassButton 
                  href="/get-a-quote" 
                  variant="primary"
                  className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto min-h-[48px]"
                >
                  Start Your Project
                </GlassButton>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 z-10">
          <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 sm:mb-12 md:mb-16 px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-[#2075bf] uppercase leading-tight">
                  What Our Clients Say
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-6">
                  Real results from real projects - see why partners trust RPM
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2 mb-2">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2075bf]">4.2</span>
                  <div className="flex gap-0.5 sm:gap-1">
                    {[...Array(5)].map((_, i) => {
                      const starValue = i + 1;
                      const isPartial = starValue === 5;
                      return (
                        <div key={i} className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8">
                          <svg className="absolute w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-gray-300 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                          {isPartial ? (
                            <svg 
                              className="absolute w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-400 fill-current" 
                              viewBox="0 0 20 20"
                              style={{ clipPath: 'inset(0 80% 0 0)' }}
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ) : (
                            <svg className="absolute w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <span className="text-gray-600 text-sm sm:text-base">Based on Google Reviews</span>
                </div>
                <a 
                  href="https://www.google.com/maps/place/RPM+AV+Services,+Inc./@34.1804647,-84.5087175,17z/data=!3m1!4b1!4m6!3m5!1s0x88f56f3e9f65bb21:0x4453875745cab769!8m2!3d34.1804647!4d-84.5061372!16s%2Fg%2F1262_8kn7?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2075bf] hover:underline text-sm sm:text-base"
                >
                  View All Reviews →
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index}>
                    <GlassCard className="h-full p-4 sm:p-6 md:p-8 flex flex-col">
                      <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current drop-shadow-sm" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base leading-relaxed italic flex-grow">
                        "{testimonial.text}"
                      </p>
                      <div className="border-t border-gray-200/60 pt-3 sm:pt-4 mt-auto">
                        <p className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">{testimonial.name}</p>
                        <p className="text-gray-600 text-xs sm:text-sm">{testimonial.company}</p>
                      </div>
                    </GlassCard>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Stats Section - Social Proof Numbers */}
        <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-[#2075bf] via-[#2d8dd4] to-[#1a5d99] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '50px 50px',
            }} />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {[
                  { number: '50', label: 'CERTIFIED TECHNICIANS' },
                  { number: '239', label: 'INDUSTRY CERTIFICATIONS' },
                  { number: '7,331', label: 'COMPLETED PROJECTS' },
                  { number: '0', label: 'OUTSOURCING' },
                ].map((stat, index) => (
                  <div key={index} className="text-center px-2">
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1 sm:mb-2">
                      {stat.number}
                    </div>
                    <div className="text-[10px] sm:text-xs md:text-sm lg:text-base text-white/90 uppercase leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-10 sm:py-12 md:py-16 lg:py-24 z-10">
          <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 sm:mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-[#2075bf] uppercase leading-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-700">
                  Answering common questions to remove doubts about pricing, setup, and features
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <GlassCard 
                      className="cursor-pointer hover:shadow-md transition-all duration-200 active:scale-[0.98]"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <div className="flex items-center justify-between gap-3 sm:gap-4">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#2075bf] flex-1 text-left">
                          {faq.question}
                        </h3>
                        <svg
                          className={`w-5 h-5 sm:w-6 sm:h-6 text-[#2075bf] flex-shrink-0 transition-transform duration-200 ${
                            openFaq === index ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      {openFaq === index && (
                        <p className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200/60 text-gray-700 text-sm sm:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      )}
                    </GlassCard>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-10 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-r from-[#2075bf] via-[#2d8dd4] to-[#1a5d99] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '50px 50px',
            }} />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 text-white drop-shadow-lg leading-tight px-2">
                Ready to Get Started?
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-3 sm:mb-4 md:mb-6 text-white/95 max-w-3xl mx-auto leading-relaxed px-2">
                Get a free, fixed-price quote for your next AV project
              </p>
              <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 text-white/90 max-w-2xl mx-auto px-2">
                Save time and eliminate surprises with our no-obligation quote process
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-2">
                <GlassButton 
                  href="/get-a-quote" 
                  variant="primary"
                  className="!bg-white/25 !backdrop-blur-md !border-2 !border-white/40 !text-white hover:!bg-white/35 text-base sm:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 w-full sm:w-auto min-h-[48px]"
                >
                  Get A Free Quote
                </GlassButton>
                <GlassButton 
                  href="/contact" 
                  variant="secondary"
                  className="!bg-white/15 !backdrop-blur-md !border !border-white/25 !text-white hover:!bg-white/25 text-base sm:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 w-full sm:w-auto min-h-[48px]"
                >
                  Contact Us
                </GlassButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
