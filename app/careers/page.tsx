'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';

export default function CareersPage() {
  const fitForFamily = [
    {
      title: 'Integrity',
      description: 'Doing the right thing when no one is watching. This code of conduct is essential for success at RPM.',
      icon: '✓',
    },
    {
      title: 'Accountability',
      description: 'Owning your work even when you make mistakes and just as important, fixing them too. Taking pride in your work product will be important in the RPM Family.',
      icon: '✓',
    },
    {
      title: 'Service',
      description: 'Being humble and having a service attitude is probably the most impactful trait to long term success at RPM. Attitude is everything in that it affects everything you do. Having a positive attitude enables you to bring solutions to the table instead of complaints.',
      icon: '✓',
    },
    {
      title: 'Flexibility',
      description: 'Traveling for work and working overtime are an integral part of our industry. Going where we need you when asked says a lot about your commitment to success at RPM.',
      icon: '✓',
    },
    {
      title: 'Family',
      description: "Being a good member of the family means desiring the success of your co-workers. It means being willing to lead the way and mentor others with what you've learned and what you're good at. Family defines the culture at RPM.",
      icon: '✓',
    },
    {
      title: 'Drive',
      description: 'Growth in knowledge and skill is the only way to move forward. RPM only wants candidates who are interested in what we do, being passionate about the work, always learning, training, and motivated to reach the next level.',
      icon: '✓',
    },
  ];

  const notGoodFit = [
    {
      title: 'Ego',
      description: "If you'd rather be right than successful, you'll feel like you're swimming upstream at RPM.",
      icon: '✗',
    },
    {
      title: 'Passivity',
      description: "RPM requires self-motivated candidates to apply. This doesn't mean you won't receive training or mentorship, it just means we can't make you want to learn. You have to desire that on your own, you won't succeed being passive.",
      icon: '✗',
    },
    {
      title: 'A Loner',
      description: "If you prefer working alone to working as a team, then this isn't the opportunity for you. We work as a team, but more importantly as a family.",
      icon: '✗',
    },
    {
      title: 'A Short-Termer',
      description: 'RPM only hires people with a long-term intent, we provide growth paths for all employees to provide a long-term home.',
      icon: '✗',
    },
    {
      title: 'Toxicity',
      description: 'If you tend to focus on the negative, it stifles open communication. The "bad apple" analogy is true, negativity spreads ten times faster than positivity. A positive attitude is essential for working at RPM.',
      icon: '✗',
    },
    {
      title: 'Thin Skin',
      description: "We work in a lot of various environments, from dirty construction sites to Fortune 500 boardrooms, if you can't hold your tongue and let petty things roll off your back, this isn't the job for you.",
      icon: '✗',
    },
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    streetAddress: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    phone: '',
    bestTimeToCall: '',
    position: '',
    previousEmployers: [{ employer: '', dates: '', position: '', phone: '' }],
    workedInAV: false,
    noFearOfHeights: false,
    canLift75lbs: false,
    canTravel: false,
    hasCleanDrivingRecord: false,
    willSubmitToBackgroundCheck: false,
    whyGreatFit: '',
    termsAccepted: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const teamMemberImages = [
    'https://rpmavs.com/wp-content/uploads/2024/03/RPM-Team-Member-Image-1-1-scaled-960x600_c.jpg',
    'https://rpmavs.com/wp-content/uploads/2024/03/RPM-Team-Member-Image-2-1-scaled-960x600_c.jpg',
    'https://rpmavs.com/wp-content/uploads/2024/03/RPM-Team-Member-Image-3-1-scaled-960x600_c.jpg',
    'https://rpmavs.com/wp-content/uploads/2024/03/RPM-Team-Member-Image-4-1-scaled-960x600_c.jpg',
    'https://rpmavs.com/wp-content/uploads/2024/03/RPM-Team-Member-Image-5-1-scaled-960x600_c.jpg',
    'https://rpmavs.com/wp-content/uploads/2024/03/RPM-Team-Member-Image-6-1-scaled-960x600_c.jpg',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % teamMemberImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [teamMemberImages.length]);

  const scrollToForm = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamMemberImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamMemberImages.length) % teamMemberImages.length);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEmployerChange = (index: number, field: string, value: string) => {
    const updated = [...formData.previousEmployers];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, previousEmployers: updated }));
  };

  const addEmployer = () => {
    setFormData(prev => ({
      ...prev,
      previousEmployers: [...prev.previousEmployers, { employer: '', dates: '', position: '', phone: '' }],
    }));
  };

  const removeEmployer = (index: number) => {
    if (formData.previousEmployers.length > 1) {
      const updated = formData.previousEmployers.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, previousEmployers: updated }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Application submitted! (This is a demo - actual submission would connect to backend)');
  };

  const positions = [
    'AV Technician Level 1',
    'AV Technician Level 2',
    'AV Lead Technician',
    'AV Field Engineer',
    'AV Programmer',
    'AV Project Manager',
    'AV Project Coordinator',
    'Admin / Warehouse',
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section with Full-Screen Image Slideshow */}
        <section className="relative h-[90vh] sm:h-[80vh] min-h-[500px] sm:min-h-[600px] flex items-center overflow-hidden">
          {/* Full-Screen Slideshow Background */}
          <div className="absolute inset-0">
            <img
              key={currentSlide}
              src={teamMemberImages[currentSlide]}
              alt={`RPM Team Member Image – ${currentSlide + 1}`}
              className="w-full h-full object-cover"
              loading="eager"
            />
            
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
          </div>

          {/* Content Overlay */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20 pb-20">
            <div className="max-w-4xl">
              <div className="text-white">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6 leading-tight drop-shadow-2xl uppercase tracking-wider px-2" style={{ fontFamily: 'var(--font-oswald), sans-serif', letterSpacing: '0.1em' }}>
                  Forget the "job",<br />
                  Join the Family!
                </h1>
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 leading-relaxed drop-shadow-lg">
                    Our founder, Rodney Milner started the company over 30 years ago recognizing a need integrators had in outsourcing labor resources. Rodney, now retired, has passed the torch on to his son and daughter Matt Milner and Lindsey Hawk. The "family", once literal, has become the culture for the entire company.
                  </p>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 leading-relaxed drop-shadow-lg">
                    When you join the RPM Family, you've become a part of a much bigger picture, where your voice is heard, and a rewarding career path awaits. RPM doesn't make short-term hires, we expect all new hires to have a long term home here.
                  </p>
                </div>
                <div className="flex justify-start px-2">
                  <GlassButton 
                    onClick={scrollToForm}
                    variant="primary"
                    className="!bg-white/25 !backdrop-blur-md !border-2 !border-white/40 !text-white hover:!bg-white/35 !text-base sm:!text-lg !px-6 sm:!px-8 !py-3 sm:!py-4 shadow-xl"
                  >
                    Submit An Application Now!
                  </GlassButton>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows - Mobile: bottom aligned with dots, Desktop: sides */}
          <button
            onClick={prevSlide}
            className="absolute left-4 bottom-4 sm:bottom-6 md:bottom-auto md:left-2 md:top-1/2 md:-translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 active:bg-white/40 transition-all z-20 shadow-lg touch-manipulation min-h-[44px] min-w-[44px]"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 bottom-4 sm:bottom-6 md:bottom-auto md:right-2 md:top-1/2 md:-translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 active:bg-white/40 transition-all z-20 shadow-lg touch-manipulation min-h-[44px] min-w-[44px]"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-20">
            {teamMemberImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 sm:h-2.5 rounded-full transition-all touch-manipulation !min-h-0 ${
                  index === currentSlide
                    ? 'w-4 sm:w-8 md:w-10 bg-white shadow-lg'
                    : 'w-1.5 sm:w-2.5 bg-white/50 hover:bg-white/75 active:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>


        {/* Pros vs Cons Side-by-Side Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2075bf] mb-3 sm:mb-4 uppercase tracking-tight leading-tight px-2">
                  Are You Fit for the Family?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-2">
                  See what makes someone thrive at RPM – and what doesn't
                </p>
              </div>

              {/* Side-by-Side Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
                {/* Fit for Family Column */}
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-4 shadow-lg">
                      <span className="text-4xl text-white font-bold">✓</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-[#2075bf] uppercase">
                      Fit for a Family
                    </h3>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {fitForFamily.map((item, index) => (
                      <div key={index}>
                        <GlassCard className="h-full p-4 sm:p-6 border-l-4 border-[#2075bf] hover:shadow-xl transition-shadow">
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className="text-xl sm:text-2xl text-[#2075bf] font-bold flex-shrink-0 mt-1">{item.icon}</div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg sm:text-xl font-bold text-[#2075bf] mb-2 leading-tight">
                                {item.title}
                              </h4>
                              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </GlassCard>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Not a Good Fit Column */}
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-red-600 mb-4 shadow-lg">
                      <span className="text-4xl text-white font-bold">✗</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-gray-800">
                      Not a good fit
                    </h3>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {notGoodFit.map((item, index) => (
                      <div key={index}>
                        <GlassCard className="h-full p-4 sm:p-6 border-l-4 border-red-400 bg-red-50/20 hover:shadow-xl transition-shadow">
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className="text-xl sm:text-2xl text-red-600 font-bold flex-shrink-0 mt-1">{item.icon}</div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 leading-tight">
                                {item.title}
                              </h4>
                              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </GlassCard>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA in Middle */}
              <div className="text-center">
                <GlassCard className="glass-card-gradient p-6 sm:p-8 md:p-12">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                    Think You're a Fit?
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-white/95 mb-4 sm:mb-6 max-w-2xl mx-auto">
                    If you see yourself in the left column, we'd love to hear from you!
                  </p>
                  <div className="flex justify-center">
                    <GlassButton 
                      onClick={scrollToForm}
                      variant="primary"
                      className="!bg-white/25 !backdrop-blur-md !border-2 !border-white/40 !text-white hover:!bg-white/35 !text-base sm:!text-lg !px-6 sm:!px-8 !py-3 sm:!py-4"
                    >
                      Start Your Application
                    </GlassButton>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>


        {/* Video Section - See the Vision */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2075bf] mb-3 sm:mb-4 uppercase leading-tight px-2">
                  See the Vision
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-2">
                  Watch these videos to learn more about RPM and see what makes our family special
                </p>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {[
                  {
                    title: 'Welcome to the Family!',
                    videoId: '7sqfSFtNyxQ',
                    description: 'Get introduced to the RPM Family and what makes us unique.',
                  },
                  {
                    title: 'History of RPM AVS',
                    videoId: 'KnQDX5YXUOk',
                    description: 'Learn about our 30+ year journey and how we became who we are today.',
                  },
                  {
                    title: 'A Day in the Life at RPM AVS',
                    videoId: 'Y1L44_k6Puc',
                    description: 'Experience a day in the life of our team members and see the creativity and excellence we bring to every project.',
                  },
                  {
                    title: 'Kickstart Your Career with RPM AVS',
                    videoId: 'Zpvz8mMHVGc',
                    description: 'Discover how RPM can help launch and grow your career in the AV industry.',
                  },
                ].map((video, index) => (
                  <div key={video.videoId}>
                    <GlassCard className="p-4 sm:p-6 md:p-8 overflow-hidden">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        <div className="lg:col-span-2">
                          <div className="relative w-full aspect-video rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
                            <iframe
                              className="absolute inset-0 w-full h-full"
                              src={`https://www.youtube.com/embed/${video.videoId}`}
                              title={video.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            />
                          </div>
                        </div>
                        <div className="flex flex-col justify-center">
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2075bf] mb-2 sm:mb-3 leading-tight">
                            {video.title}
                          </h3>
                          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
                            {video.description}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12 mb-0">
                <GlassCard className="glass-card-gradient p-8 md:p-12 mb-0">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                    Ready to Join Us?
                  </h3>
                  <p className="text-xl text-white/95 max-w-2xl mx-auto mb-6">
                    If these videos resonate with you, we'd love to hear from you!
                  </p>
                  <div className="flex justify-center">
                    <div className="text-white">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section id="application-form" className="pt-12 sm:pt-16 md:pt-24 pb-12 sm:pb-20 md:pb-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div>
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-[#2075bf] uppercase tracking-tight leading-tight px-2">
                    Submit An Application
                  </h2>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 px-2">
                    <span className="text-base sm:text-lg text-gray-600">Step {currentStep} of {totalSteps}</span>
                    <div className="w-full sm:w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#2075bf] to-[#2d8dd4] transition-all duration-500"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                      />
                    </div>
                    <span className="text-base sm:text-lg text-gray-600">{Math.round((currentStep / totalSteps) * 100)}%</span>
                  </div>
                </div>

                <GlassCard className="p-4 sm:p-6 md:p-8 lg:p-12">
                  <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                      <div className="space-y-4 sm:space-y-6">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2075bf] mb-4 sm:mb-6 uppercase leading-tight">
                          Your Personal Information
                        </h3>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                            placeholder="First Last"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Your Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all text-base"
                              placeholder="Enter Email"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Confirm Email <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              name="confirmEmail"
                              value={formData.confirmEmail}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                              placeholder="Confirm Email"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                          <input
                            type="text"
                            name="streetAddress"
                            value={formData.streetAddress}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all mb-2"
                            placeholder="Street Address"
                          />
                          <input
                            type="text"
                            name="addressLine2"
                            value={formData.addressLine2}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                            placeholder="Address Line 2"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                            placeholder="City"
                          />
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                            placeholder="State / Province"
                          />
                          <input
                            type="text"
                            name="zip"
                            value={formData.zip}
                            onChange={handleInputChange}
                            className="px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                            placeholder="ZIP / Postal Code"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                          >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Other</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Your Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                              placeholder="(555) 123-4567"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Best Time To Call You</label>
                            <select
                              name="bestTimeToCall"
                              value={formData.bestTimeToCall}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                            >
                              <option value="">Select time</option>
                              <option value="mornings">Mornings</option>
                              <option value="early-afternoon">Early Afternoon</option>
                              <option value="late-afternoon">Late Afternoon</option>
                              <option value="early-evening">Early Evening</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                          <GlassButton
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            variant="primary"
                            className="!text-base !px-6 !py-3"
                          >
                            Next: Position & Employment
                          </GlassButton>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Position & Employment */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <h3 className="text-2xl sm:text-3xl font-bold text-[#2075bf] mb-6 uppercase">
                          Position & Previous Employment
                        </h3>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Position You're Applying For
                          </label>
                          <select
                            name="position"
                            value={formData.position}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                          >
                            <option value="">Select a position</option>
                            {positions.map((pos) => (
                              <option key={pos} value={pos}>{pos}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-semibold text-gray-700">
                              Your Previous Employers
                            </label>
                            <button
                              type="button"
                              onClick={addEmployer}
                              className="text-sm text-[#2075bf] hover:text-[#1a5d99] font-semibold"
                            >
                              + Add Employer
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">
                            Please list your previous employers, the dates you worked and the position you held for the last 5 years.
                          </p>
                          <div className="space-y-4">
                            {formData.previousEmployers.map((employer, index) => (
                              <GlassCard key={index} className="p-4 border border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <input
                                    type="text"
                                    value={employer.employer}
                                    onChange={(e) => handleEmployerChange(index, 'employer', e.target.value)}
                                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                                    placeholder="Employer"
                                  />
                                  <input
                                    type="text"
                                    value={employer.dates}
                                    onChange={(e) => handleEmployerChange(index, 'dates', e.target.value)}
                                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                                    placeholder="Dates"
                                  />
                                  <input
                                    type="text"
                                    value={employer.position}
                                    onChange={(e) => handleEmployerChange(index, 'position', e.target.value)}
                                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                                    placeholder="Position"
                                  />
                                  <div className="flex gap-2">
                                    <input
                                      type="tel"
                                      value={employer.phone}
                                      onChange={(e) => handleEmployerChange(index, 'phone', e.target.value)}
                                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                                      placeholder="Phone"
                                    />
                                    {formData.previousEmployers.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => removeEmployer(index)}
                                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                      >
                                        Remove
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </GlassCard>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between gap-4 pt-4">
                          <GlassButton
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            variant="secondary"
                            className="!text-base !px-6 !py-3"
                          >
                            ← Back
                          </GlassButton>
                          <GlassButton
                            type="button"
                            onClick={() => setCurrentStep(3)}
                            variant="primary"
                            className="!text-base !px-6 !py-3"
                          >
                            Next: More About You
                          </GlassButton>
                        </div>
                      </div>
                    )}

                    {/* Step 3: More About You */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <h3 className="text-2xl sm:text-3xl font-bold text-[#2075bf] mb-6 uppercase">
                          More About You
                        </h3>

                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-4">
                            Check the following boxes if the statements are true!
                          </p>
                          <div className="space-y-3">
                            {[
                              { name: 'workedInAV', label: 'I have worked in the Commercial A/V Industry before' },
                              { name: 'noFearOfHeights', label: 'I do not have a fear of heights that would prevent me from working on ladders' },
                              { name: 'canLift75lbs', label: 'I have no physical limitations lifting items weighing up to 75 pounds' },
                              { name: 'canTravel', label: 'I do not have issues traveling for work' },
                              { name: 'hasCleanDrivingRecord', label: 'I do NOT have a clean driving record for the past 3 years' },
                              { name: 'willSubmitToBackgroundCheck', label: 'I will submit to a common drug and background check' },
                            ].map(({ name, label }) => (
                              <label key={name} className="flex items-start gap-3 cursor-pointer group">
                                <input
                                  type="checkbox"
                                  name={name}
                                  checked={formData[name as keyof typeof formData] as boolean}
                                  onChange={handleInputChange}
                                  className="mt-1 w-5 h-5 text-[#2075bf] border-gray-300 rounded focus:ring-2 focus:ring-[#2075bf] cursor-pointer"
                                />
                                <span className="text-gray-700 group-hover:text-[#2075bf] transition-colors">{label}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Tell Us Why You'd Be A Great Fit for RPM AVS <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            name="whyGreatFit"
                            value={formData.whyGreatFit}
                            onChange={handleInputChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all resize-none"
                            placeholder="Tell us about yourself and why you'd be a great addition to the RPM Family..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Upload Your Resume
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#2075bf] transition-colors cursor-pointer">
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              className="hidden"
                              id="resume-upload"
                            />
                            <label htmlFor="resume-upload" className="cursor-pointer">
                              <div className="text-gray-600 mb-2">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              <span className="text-sm text-[#2075bf] font-semibold">Click to upload</span>
                              <span className="text-xs text-gray-500 block mt-1">PDF, DOC, or DOCX (Max. 25 MB)</span>
                            </label>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                          <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              name="termsAccepted"
                              checked={formData.termsAccepted}
                              onChange={handleInputChange}
                              required
                              className="mt-1 w-5 h-5 text-[#2075bf] border-gray-300 rounded focus:ring-2 focus:ring-[#2075bf] cursor-pointer"
                            />
                            <span className="text-sm text-gray-700 group-hover:text-[#2075bf] transition-colors">
                              <strong>Terms and Conditions</strong> <span className="text-red-500">*</span><br />
                              All information submitted is confidential, however this is not an encrypted form. Submission of an application does not constitute any form of employment obligation for RPM AVS. By accepting these terms and conditions you attest that all information submitted is true and accurate!
                            </span>
                          </label>
                        </div>

                        <div className="flex justify-between gap-4 pt-4">
                          <GlassButton
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            variant="secondary"
                            className="!text-base !px-6 !py-3"
                          >
                            ← Back
                          </GlassButton>
                          <GlassButton
                            type="submit"
                            variant="primary"
                            className="!text-base !px-8 !py-3"
                          >
                            Submit Application
                          </GlassButton>
                        </div>
                      </div>
                    )}
                  </form>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
