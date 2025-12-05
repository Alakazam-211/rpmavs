'use client';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';

interface CaseStudy {
  id: number;
  client: string;
  location: string;
  image: string;
  description: string;
  imagePosition: 'left' | 'right';
}

function CaseStudySection({ study, index }: { study: CaseStudy; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <section
      className={`relative min-h-[80vh] flex items-center py-20 ${
        isEven ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      {/* Case Study Number Indicator */}
      <div
        className={`absolute top-8 ${
          study.imagePosition === 'right' ? 'left-8' : 'right-8'
        } z-20 hidden lg:block`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[#2075bf]/20 blur-2xl rounded-full w-24 h-24" />
          <div className="relative bg-[#2075bf] text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold shadow-xl">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-center ${
            study.imagePosition === 'right' ? '' : 'lg:grid-flow-dense'
          }`}>
            {/* Image Section - Full Width Background Style */}
            <div
              className={`relative h-[60vh] min-h-[500px] lg:h-[70vh] order-1 group cursor-pointer overflow-hidden ${
                study.imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${study.image})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/5 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-black/5 to-transparent" />
              </div>
              
              {/* Overlay gradient for subtle depth */}
              <div className={`absolute inset-0 ${
                study.imagePosition === 'right' 
                  ? 'bg-gradient-to-r from-transparent via-black/5 to-black/15' 
                  : 'bg-gradient-to-l from-transparent via-black/5 to-black/15'
              }`} />
              
              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </div>

            {/* Content Section */}
            <div
              className={`relative z-10 p-8 md:p-12 lg:p-16 order-2 ${
                study.imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'
              }`}
            >
              <div className="max-w-2xl mx-auto lg:mx-0">
                <div>
                  {/* Case Study Number - Mobile */}
                  <div className="lg:hidden mb-6">
                    <div className="inline-flex items-center gap-3">
                      <div className="bg-[#2075bf] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="h-px bg-gray-300 flex-1" />
                    </div>
                  </div>

                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2075bf] uppercase mb-4 leading-tight tracking-tight">
                    {study.client}
                  </h2>
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 uppercase mb-8 tracking-wider">
                    {study.location}
                  </p>
                  <div className="w-24 h-1 bg-[#2075bf] mb-8" />
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-800 leading-relaxed font-light">
                    {study.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CaseStudiesPage() {
  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      client: 'TI / WELLSTAR',
      location: 'MARIETTA, GA',
      image: 'https://rpmavs.com/wp-content/uploads/2016/11/IMG_2459.jpg',
      description: 'Technical Innovation needed additional resources integrating several systems for Wellstar. RPM provided complete field installation, DSP code, and field engineering / system commissioning to keep projects on schedule.',
      imagePosition: 'right',
    },
    {
      id: 2,
      client: 'Elite Multimedia / Bridgestone Arena',
      location: 'NASHVILLE, TN',
      image: 'https://rpmavs.com/wp-content/uploads/2015/09/bridgestone_wall_edited.png',
      description: 'Elite Multimedia had a unique opportunity to install the very first convex shaped video wall (one which wraps around on outward curving wall). Elite asked RPM to install the first-ever wall and support systems, which included control system and DSP programming and commissioning.',
      imagePosition: 'left',
    },
    {
      id: 3,
      client: 'ASD / COMCAST SPOTLIGHT',
      location: 'ATLANTA, GA',
      image: 'https://rpmavs.com/wp-content/uploads/2015/09/CaseStudy-Comcast.png',
      description: 'Comcast had a problem with their user interfaces for their conference rooms: No one wanted to use them. Users were intimidated by the current design and wanted to avoid operating the system. Automated System Design (ASD) approached RPM\'s programming department with the task of designing a new user interface that the users would feel confident operating. RPM met with Comcast to analyze the actual problems with the old design, and created a new design that incorporated a 3D rendering of the room, along with automated features that did not require the use of the control system at all. Just plug in a laptop and the system will automatically turn on and properly display the image.',
      imagePosition: 'right',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://rpmavs.com/wp-content/uploads/2016/11/IMG_2459.jpg)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2075bf]/20 to-transparent" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight drop-shadow-2xl uppercase tracking-wider" style={{ fontFamily: 'var(--font-oswald), sans-serif', letterSpacing: '0.15em' }}>
                Case Studies
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-light max-w-4xl mx-auto drop-shadow-lg">
                Real Projects. Real Results. Real Expertise.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        {caseStudies.map((study, index) => (
          <CaseStudySection key={study.id} study={study} index={index} />
        ))}

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-gradient-to-r from-[#2075bf] via-[#2d8dd4] to-[#1a5d99] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '50px 50px',
            }} />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg uppercase tracking-wider">
                Trust RPM-AVS With Your Next Project
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl mb-12 text-white/95 max-w-3xl mx-auto leading-relaxed font-light">
                Turnkey Service. Certified Experts. Award-Winning Service.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <GlassButton 
                  href="/contact" 
                  variant="primary"
                  className="!bg-white/25 !backdrop-blur-md !border-2 !border-white/40 !text-white hover:!bg-white/35 !text-lg !px-8 !py-4"
                >
                  Contact Us
                </GlassButton>
                <GlassButton 
                  href="https://rpmavs.quickbase.com/nav/app/bikmcn82r/action/showpage?pageid=35" 
                  target="_blank"
                  variant="secondary"
                  className="!bg-white/15 !backdrop-blur-md !border !border-white/25 !text-white hover:!bg-white/25 !text-lg !px-8 !py-4"
                >
                  Get A Quote
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
