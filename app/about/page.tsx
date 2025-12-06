'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GlassCard from '../components/ui/GlassCard';
import LocationsMap from '../components/LocationsMap';

export default function AboutPage() {

  const teamMembers = [
    { name: 'Rodney Milner', title: 'Founder (retired)', image: 'https://rpmavs.com/wp-content/uploads/2016/11/rodney_200x200.png' },
    { name: 'Matthew Milner', title: 'CEO', image: 'https://rpmavs.com/wp-content/uploads/2016/11/mattm_200x200.png' },
    { name: 'Jeff Braddock', title: 'COO', image: 'https://rpmavs.com/wp-content/uploads/2024/04/JeffB-300x300-1.jpg' },
    { name: 'Jacob Ayers', title: 'VP of Branch Operations', image: 'https://rpmavs.com/wp-content/uploads/2024/04/Jacob-300x300-1.jpg' },
    { name: 'Marc McClain', title: 'Director of Programming and Engineering', image: 'https://rpmavs.com/wp-content/uploads/2016/11/marc_200x200.png' },
    { name: 'Lindsey Hawk', title: 'Director of Administration', image: 'https://rpmavs.com/wp-content/uploads/2016/11/Lindsey_200x200.png' },
    { name: 'Jamie Milner', title: 'HR Manager', image: 'https://rpmavs.com/wp-content/uploads/2024/04/jamie-milner-2.jpg' },
    { name: 'Travis Davidson', title: 'General Manager - Georgia', image: 'https://rpmavs.com/wp-content/uploads/2016/11/travis_200x200.png' },
    { name: 'Donald Thornburg', title: 'General Manager - Carolinas', image: null },
    { name: 'Brent Davis', title: 'Director of Project Management', image: 'https://rpmavs.com/wp-content/uploads/2024/04/brent-davis-1.jpg' },
    { name: 'Brent Croft', title: 'Project Manager', image: 'https://rpmavs.com/wp-content/uploads/2022/02/Brent-Croft-Avatar.jpg' },
    { name: 'Justin Smith', title: 'Field Engineer', image: 'https://rpmavs.com/wp-content/uploads/2022/02/Justin-Smith-Avatar.jpg' },
    { name: 'Steven Hawk', title: 'Associate Project Manager', image: 'https://rpmavs.com/wp-content/uploads/2024/04/Steven-300x300-1.jpg' },
    { name: 'Aaron Bursmith', title: 'Associate Project Manager', image: 'https://rpmavs.com/wp-content/uploads/2024/04/Aaron-300x300-1.jpg' },
    { name: 'Amy Nealey', title: 'Business Administrator', image: 'https://rpmavs.com/wp-content/uploads/2022/02/Amy-Nealey-Avatar.jpg' },
    { name: 'Jessica Valentin', title: 'Administrative Assistant - Tampa', image: 'https://rpmavs.com/wp-content/uploads/2024/04/Jessica-300x300-1.jpg' },
  ];

  const certifications = [
    { name: 'AVIXA', image: 'https://rpmavs.com/wp-content/uploads/2020/04/avixa.png' },
    { name: 'Chief', image: 'https://rpmavs.com/wp-content/uploads/2016/11/Chief-logo_72.png' },
    { name: 'Crestron Integrated Partner', image: 'https://rpmavs.com/wp-content/uploads/2016/11/cert-integrated-partner-logo-hires.png' },
    { name: 'Dante', image: 'https://rpmavs.com/wp-content/uploads/2016/11/dante-certification-seal_72.png' },
    { name: 'Symetrix', image: 'https://rpmavs.com/wp-content/uploads/2016/11/symetrix_72.png' },
    { name: 'Crestron DMC-E-4K', image: 'https://rpmavs.com/wp-content/uploads/2016/11/dmc-e-4k_digitalmedia.png' },
    { name: 'ClearOne', image: 'https://rpmavs.com/wp-content/uploads/2016/05/clearone-logo-1.png' },
    { name: 'Biamp Tesira', image: 'https://rpmavs.com/wp-content/uploads/2016/05/TesiraCertified2FIN.png' },
    { name: 'Biamp Tesira', image: 'https://rpmavs.com/wp-content/uploads/2016/05/TesiraCertified1.png' },
    { name: 'Extron', image: 'https://rpmavs.com/wp-content/uploads/2016/05/extron.png' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[40vh] sm:h-[50vh] min-h-[350px] sm:min-h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://rpmavs.com/wp-content/uploads/2015/06/cover11.jpg)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2075bf]/20 to-transparent" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
            <div className="text-center text-white">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-3 sm:mb-4 leading-tight drop-shadow-2xl uppercase tracking-wider px-2" style={{ fontFamily: 'var(--font-oswald), sans-serif', letterSpacing: '0.1em' }}>
                About RPM-AVS
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light max-w-4xl mx-auto drop-shadow-lg px-2">
                A family culture.
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-gray-50/50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              
              {/* Newspaper-style layout */}
              <GlassCard className="overflow-hidden p-4 sm:p-6 md:p-8 lg:p-12 mb-8 sm:mb-12 bg-white/90">
                {/* Newspaper Header */}
                <div className="border-b-4 border-[#2075bf] pb-3 sm:pb-4 mb-6 sm:mb-8">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2075bf] uppercase tracking-tight mb-2 leading-tight" style={{ fontFamily: 'var(--font-oswald), sans-serif' }}>
                    About RPM-AVS
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">A Personal, Custom Approach for Every Client</p>
                </div>

                {/* Main Content - Multi-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
                  {/* Left Column - Main Story */}
                  <div className="lg:col-span-3 space-y-8">
                    {/* Our History */}
                    <article>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2075bf] uppercase mb-3 sm:mb-4 pb-2 border-b-2 border-[#2075bf]/30 leading-tight" style={{ fontFamily: 'var(--font-oswald), sans-serif' }}>
                        Our History
                      </h3>
                      <div className="prose prose-lg max-w-none">
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                          In 1993, our founder, Rodney Milner recognized a major need in A/V Integration companies, external resources to help manage the dynamic workloads. RPM has experienced steady growth since by giving our customers' projects the personal attention they deserve.
                        </p>
                      </div>
                    </article>

                    {/* Our Approach */}
                    <article>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2075bf] uppercase mb-3 sm:mb-4 pb-2 border-b-2 border-[#2075bf]/30 leading-tight" style={{ fontFamily: 'var(--font-oswald), sans-serif' }}>
                        Our Approach
                      </h3>
                      <div className="prose prose-lg max-w-none">
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                          RPM has a totally unique approach to providing audio visual integration services. We don't "rent out" our talent or use sub-contractors, we provide a team of 100% employees along with a carefully managed process to complete projects efficiently and with impeccable quality.
                        </p>
                      </div>
                    </article>

                    {/* Our Employees */}
                    <article>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2075bf] uppercase mb-3 sm:mb-4 pb-2 border-b-2 border-[#2075bf]/30 leading-tight" style={{ fontFamily: 'var(--font-oswald), sans-serif' }}>
                        Our Employees
                      </h3>
                      <div className="prose prose-lg max-w-none">
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                          RPM is a big family of audio visual expertise. While demanding a lot of accountability from our employees, RPM also strives to provide the best available benefits and opportunities for advancement, that creates a sense of "career" vs. a day job. We recognize that every employee contributes to our success in unique ways. Our employees are our family.
                        </p>
                      </div>
                    </article>
                  </div>

                  {/* Right Column - Sidebar */}
                  <div className="lg:col-span-2">
                    {/* Our Locations */}
                    <article className="mb-6 sm:mb-8 lg:sticky lg:top-8">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2075bf] uppercase mb-3 sm:mb-4 pb-2 border-b-2 border-[#2075bf]/30 leading-tight" style={{ fontFamily: 'var(--font-oswald), sans-serif' }}>
                        Our Locations
                      </h3>
                      
                      {/* Map */}
                      <div className="rounded-lg overflow-hidden shadow-md mb-3 sm:mb-4">
                        <LocationsMap
                          locations={[
                            { city: 'Birmingham', state: 'AL', lat: 33.5207, lng: -86.8025 },
                            { city: 'Canton', state: 'GA', lat: 34.2368, lng: -84.4908 },
                            { city: 'Charlotte', state: 'NC', lat: 35.2271, lng: -80.8431 },
                            { city: 'Dallas', state: 'TX', lat: 32.7767, lng: -96.7970 },
                            { city: 'Raleigh', state: 'NC', lat: 35.7796, lng: -78.6382 },
                            { city: 'Tampa', state: 'FL', lat: 27.9506, lng: -82.4572 },
                          ]}
                          className="h-[200px] sm:h-[250px]"
                        />
                      </div>
                      
                      {/* Location list with pin icons */}
                      <div className="space-y-2 mb-3">
                        {[
                          { city: 'Birmingham', state: 'AL' },
                          { city: 'Canton', state: 'GA' },
                          { city: 'Charlotte', state: 'NC' },
                          { city: 'Dallas', state: 'TX' },
                          { city: 'Raleigh', state: 'NC' },
                          { city: 'Tampa', state: 'FL' },
                          ].map((location, index) => (
                          <a
                            key={index}
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.city + ', ' + location.state)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-gray-50 hover:bg-[#2075bf]/5 hover:border-l-4 border-[#2075bf] transition-all duration-200 cursor-pointer group touch-manipulation min-h-[44px]"
                          >
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2075bf]/10 group-hover:bg-[#2075bf]/20 flex items-center justify-center transition-colors">
                              <svg className="w-4 h-4 text-[#2075bf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-gray-800 group-hover:text-[#2075bf] transition-colors">
                                {location.city}, {location.state}
                              </h4>
                            </div>
                            <svg className="w-4 h-4 text-gray-400 group-hover:text-[#2075bf] transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        ))}
                      </div>
                      
                      <p className="text-xs text-gray-500 text-center">
                        <a 
                          href="https://www.google.com/maps/search/RPM+Audio+Visual+Services" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#2075bf] hover:underline"
                        >
                          View all locations →
                        </a>
                      </p>
                    </article>
                  </div>
                </div>
              </GlassCard>

              {/* Certified Experts Section */}
              <div className="mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-[#2075bf] uppercase leading-tight">
                  Certified Experts
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <GlassCard className="text-center p-4 sm:p-6 h-full">
                        {member.image ? (
                          <div className="mb-3 sm:mb-4 flex justify-center">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white/50 shadow-lg"
                              loading="eager"
                            />
                          </div>
                        ) : (
                          <div className="mb-3 sm:mb-4 flex justify-center">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-200 border-4 border-white/50 shadow-lg flex items-center justify-center">
                              <span className="text-gray-400 text-2xl sm:text-4xl font-bold">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </div>
                        )}
                        <h3 className="text-base sm:text-lg font-bold mb-1 text-gray-800 leading-tight">
                          {member.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 uppercase leading-tight">
                          {member.title}
                        </p>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Our Certifications Section */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-[#2075bf] uppercase leading-tight">
                  Our Certifications
                </h2>
                <GlassCard className="p-6 sm:p-8 md:p-12">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-center">
                    {certifications.map((cert, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-center h-16 sm:h-20 p-3 sm:p-4"
                      >
                        <img
                          src={cert.image}
                          alt={cert.name}
                          className="max-w-full max-h-12 sm:max-h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                          loading="eager"
                        />
                      </motion.div>
                    ))}
                  </div>
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
