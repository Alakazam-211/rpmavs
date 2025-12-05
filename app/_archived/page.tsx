'use client';

import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import GlassCard from './components/ui/GlassCard';
import GlassButton from './components/ui/GlassButton';

export default function Home() {
  const stats = [
    { number: '50', label: 'TECHNICIANS' },
    { number: '239', label: 'CERTIFICATIONS' },
    { number: '7331', label: 'PROJECTS' },
    { number: '0', label: 'OUTSOURCING' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="relative h-screen min-h-[500px] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: 'url(/hero-background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-20 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6 leading-tight drop-shadow-2xl uppercase tracking-wider px-2" style={{ fontFamily: 'var(--font-oswald), sans-serif', letterSpacing: '0.1em' }}>
                CERTIFIED<br />MATTERS
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-gray-50/50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
                <div className="mb-6 sm:mb-8 md:mb-12">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-[#2075bf] uppercase leading-tight">
                    A TRUE TEAM OF EXPERTS YOU CAN REALLY TRUST
                  </h2>
                  <hr className="border-t-2 border-gray-300 my-4 sm:my-6" />
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    RPM represents the largest team of commercial audio visual expertise in the country for any single location. All the while, using zero outsourcing. You read that right! You can trust your next project to RPM's 100% employee team.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2075bf] mb-1 sm:mb-2">
                        {stat.number}
                      </div>
                      <div className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-700 uppercase leading-tight">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
                <div className="order-2 md:order-1">
                  <img
                    src="https://rpmavs.com/wp-content/uploads/2024/11/US-EPS-01-3001-w-birmingham.png"
                    alt="US Map"
                    className="w-full h-auto rounded-xl sm:rounded-2xl shadow-xl"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <GlassCard className="h-full">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-[#2075bf] uppercase leading-tight">
                      WHERE YOU NEED US
                    </h2>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-gray-700 uppercase leading-tight">
                      BASED IN THE SOUTH EAST, WE CAN BE ON-SITE ANYWHERE IN THE U.S. WHEN YOU NEED US
                    </h3>
                    <hr className="border-t-2 border-gray-300 my-4 sm:my-6" />
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      We have offices in Atlanta, Birmingham, Raleigh, Charlotte, and Tampa, however consistency across the country using subcontractors is impossible. Get the same trusted RPM quality virtually anywhere in the world. We Travel!
                    </p>
                  </GlassCard>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
                <div>
                  <GlassCard className="h-full">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-[#2075bf] uppercase leading-tight">
                      EXPERIENCE AND QUALITY COUNTS.
                    </h2>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-gray-700 uppercase leading-tight">
                      YOUR COMPLETE AUDIO VISUAL TEAM
                    </h3>
                    <hr className="border-t-2 border-gray-300 my-4 sm:my-6" />
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      The RPM Team consists of Technicians, Project Managers, Engineers, Programmers, and Designers, all the experience required to complete your project just like you would.
                    </p>
                  </GlassCard>
                </div>
                <div>
                  <img
                    src="https://rpmavs.com/wp-content/uploads/2016/11/IMG_1216_2.png"
                    alt="RPM Team"
                    className="w-full h-auto rounded-xl sm:rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brands Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-[#2075bf] uppercase leading-tight">
                  TRUSTED BRANDS
                </h2>
                <p className="text-base sm:text-lg text-gray-700">
                  We work with the industry's leading manufacturers
                </p>
              </div>
              
              <GlassCard className="p-6 sm:p-8 md:p-12">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-center">
                  {[
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
                  ].map((brand, index) => (
                    <motion.a
                      key={index}
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-center h-16 sm:h-20 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/50 backdrop-blur-sm border border-gray-200 hover:bg-white/70 hover:scale-105 transition-all duration-300 group touch-manipulation"
                    >
                      <img
                        src={brand.useLogo ? brand.logo : brand.favicon}
                        alt={`${brand.name} logo`}
                        className="w-auto h-10 sm:h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = brand.logo;
                        }}
                      />
                    </motion.a>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-[#2075bf] via-[#2d8dd4] to-[#1a5d99] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '50px 50px',
            }} />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg leading-tight px-2">
              READY TO GET STARTED?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/95 max-w-2xl mx-auto leading-relaxed px-2">
              Contact us today to discuss your next audio visual project
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2">
              <GlassButton 
                href="/contact" 
                variant="primary"
                className="!bg-white/25 !backdrop-blur-md !border-2 !border-white/40 !text-white hover:!bg-white/35"
              >
                Contact Us
              </GlassButton>
              <GlassButton 
                href="/get-a-quote"
                variant="secondary"
                className="!bg-white/15 !backdrop-blur-md !border !border-white/25 !text-white hover:!bg-white/25"
              >
                Get A Quote
              </GlassButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
