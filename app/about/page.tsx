'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GlassCard from '../components/ui/GlassCard';
import LocationsMap from '../components/LocationsMap';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'history' | 'employees' | 'approach' | 'locations'>('history');

  const tabs = [
    { id: 'history' as const, label: 'Our History' },
    { id: 'employees' as const, label: 'Our Employees' },
    { id: 'approach' as const, label: 'Our Approach' },
    { id: 'locations' as const, label: 'Our Locations' },
  ];

  const tabContent = {
    history: {
      title: 'Our History',
      content: (
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed">
            In 1993, our founder, Rodney Milner recognized a major need in A/V Integration companies, external resources to help manage the dynamic workloads. RPM has experienced steady growth since by giving our customers' projects the personal attention they deserve.
          </p>
        </div>
      ),
    },
    employees: {
      title: 'Our Employees',
      content: (
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed">
            RPM is a big family of audio visual expertise. While demanding a lot of accountability from our employees, RPM also strives to provide the best available benefits and opportunities for advancement, that creates a sense of "career" vs. a day job. We recognize that every employee contributes to our success in unique ways. Our employees are our family.
          </p>
        </div>
      ),
    },
    approach: {
      title: 'Our Approach',
      content: (
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed">
            RPM has a totally unique approach to providing audio visual integration services. We don't "rent out" our talent or use sub-contractors, we provide a team of 100% employees along with a carefully managed process to complete projects efficiently and with impeccable quality.
          </p>
        </div>
      ),
    },
    locations: {
      title: 'Our Locations',
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            You can find us at the following locations:
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Map */}
            <div className="order-2 lg:order-1">
              <LocationsMap
                locations={[
                  { city: 'Birmingham', state: 'AL', lat: 33.5207, lng: -86.8025 },
                  { city: 'Canton', state: 'GA', lat: 34.2368, lng: -84.4908 },
                  { city: 'Charlotte', state: 'NC', lat: 35.2271, lng: -80.8431 },
                  { city: 'Dallas', state: 'TX', lat: 32.7767, lng: -96.7970 },
                  { city: 'Raleigh', state: 'NC', lat: 35.7796, lng: -78.6382 },
                  { city: 'Tampa', state: 'FL', lat: 27.9506, lng: -82.4572 },
                ]}
                className="h-[400px] lg:h-full"
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                <a 
                  href="https://www.google.com/maps/search/RPM+Audio+Visual+Services" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#2075bf] hover:underline"
                >
                  View all locations on Google Maps →
                </a>
              </p>
            </div>
            
            {/* Location List */}
            <div className="order-1 lg:order-2">
              <div className="space-y-4">
                {[
                  { city: 'Birmingham', state: 'AL', address: 'Birmingham, Alabama' },
                  { city: 'Canton', state: 'GA', address: 'Canton, Georgia' },
                  { city: 'Charlotte', state: 'NC', address: 'Charlotte, North Carolina' },
                  { city: 'Dallas', state: 'TX', address: 'Dallas, Texas' },
                  { city: 'Raleigh', state: 'NC', address: 'Raleigh, North Carolina' },
                  { city: 'Tampa', state: 'FL', address: 'Tampa, Florida' },
                ].map((location, index) => (
                  <a
                    key={index}
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.city + ', ' + location.state)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-200 hover:bg-white/70 hover:shadow-md hover:border-[#2075bf]/50 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2075bf]/10 group-hover:bg-[#2075bf]/20 flex items-center justify-center transition-colors">
                        <svg className="w-5 h-5 text-[#2075bf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-[#2075bf] transition-colors">
                          {location.city}, {location.state}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {location.address}
                        </p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-[#2075bf] transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
  };

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
      
      <main className="flex-1 pt-32 pb-20">
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white via-gray-50/50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-[#2075bf] uppercase">
                  About
                </h1>
              </div>
              
              <GlassCard className="overflow-hidden p-5 sm:p-6 md:p-8 mb-12">
                {/* Tabs */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 border-b border-white/20 pb-3 sm:pb-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{ outline: 'none', border: 'none' }}
                      onMouseDown={(e) => e.preventDefault()}
                      className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 focus:!outline-none focus-visible:!outline-none active:!outline-none focus:!ring-0 active:!ring-0 ring-0 border-0 active:scale-95 min-h-[44px] cursor-pointer ${
                        activeTab === tab.id
                          ? 'glass-button text-[#2075bf] bg-white/30 shadow-lg'
                          : 'text-gray-600 active:text-gray-800 active:bg-white/10 hover:bg-white/5'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-[200px]"
                >
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#2075bf] uppercase">
                    {tabContent[activeTab].title}
                  </h2>
                  {tabContent[activeTab].content}
                </motion.div>
              </GlassCard>

              {/* Certified Experts Section */}
              <div className="mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-[#2075bf] uppercase">
                  Certified Experts
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <GlassCard className="text-center p-6 h-full">
                        {member.image ? (
                          <div className="mb-4 flex justify-center">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-32 h-32 rounded-full object-cover border-4 border-white/50 shadow-lg"
                            />
                          </div>
                        ) : (
                          <div className="mb-4 flex justify-center">
                            <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white/50 shadow-lg flex items-center justify-center">
                              <span className="text-gray-400 text-4xl font-bold">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </div>
                        )}
                        <h3 className="text-lg font-bold mb-1 text-gray-800">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-600 uppercase">
                          {member.title}
                        </p>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Our Certifications Section */}
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-[#2075bf] uppercase">
                  Our Certifications
                </h2>
                <GlassCard className="p-8 md:p-12">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 items-center">
                    {certifications.map((cert, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-center h-20 p-4"
                      >
                        <img
                          src={cert.image}
                          alt={cert.name}
                          className="max-w-full max-h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300"
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
