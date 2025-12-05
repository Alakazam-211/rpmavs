'use client';

import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GlassCard from '../components/ui/GlassCard';

export default function ServicesPage() {
  const advantages = [
    {
      title: 'FIXED SCOPE, FIXED PRICE',
      description: "Send us your project documentation and we'll give you a fixed price at no charge.",
      icon: '📋',
    },
    {
      title: 'ZERO OUTSOURCING',
      description: 'Depend on our 100% employee work force for your next project.',
      icon: '👥',
    },
    {
      title: 'Maximum Flexibility',
      description: 'When project delays are out of your control, we have a staff large enough to accommodate your changing schedule.',
      icon: '🔄',
    },
    {
      title: 'ACCOUNTABILITY',
      description: 'When you trust RPM to handle your project, our partners guarantee our work.',
      icon: '💬',
    },
    {
      title: 'CERTIFIED MATTERS',
      description: 'Why take a chance on un-vetted subcontractors, RPM holds top industry certifications.',
      icon: '🏆',
    },
    {
      title: '3 YEAR WARRANTY',
      description: "RPM stands behind our work, if you find a workmanship defect, we'll return and fix it for free.",
      icon: '🛡️',
    },
  ];

  const services = [
    {
      title: 'INSTALLATION & RACK FABRICATION',
      description: "RPM blends systematic management and efficient communications to collaborate with our clients. RPM AVS's installation team is highly decorated in countless industry and manufacturer certifications. Each technician is expected to complete hours of continuing education each quarter",
      icon: '🔧',
    },
    {
      title: 'DSP CONFIGURATION',
      description: "RPM AVS's DSP Engineers are educated and certified on all DSP platforms. With endless hours of manufacturer and on the job training the end result will be impeccable",
      icon: '🎛️',
    },
    {
      title: 'FIELD ENGINEERING',
      description: "Our dedication to our clients is the drive for our focus to detail. Our Field Engineers hold multiple industry and manufacturer certifications. Our Quality Control process is second to none. With a detailed check out procedure, our FE's will quickly diagnose and fix any issue. Our documentation process for project close out exceeds the industry standard and guarantees a high-quality product.",
      icon: '👁️',
    },
    {
      title: 'CONTROL SYSTEM PROGRAMMING',
      description: 'Our creative programmers are dedicated to providing a user-friendly interface for our clients that allows the end user to navigate freely through the operations of their AV system.',
      icon: '💻',
    },
    {
      title: 'PRE-SALES DESIGN',
      description: 'Is your sales team complaining about the lack of design bandwidth? Let our CTS-D Design Engineers add some bandwidth so you can take advantage of opportunities you might otherwise have to pass on.',
      icon: '✏️',
    },
    {
      title: 'Smart CAD',
      description: "Our entire CAD team is supervised by Design Engineers, we won't give you multitudes of revisions that don't make sense. Each and every revision is reviewed by our Design team to ensure it's ready and complete.",
      icon: '📐',
    },
  ];

  const processSteps = [
    {
      title: 'Analyze',
      description: "It's essential to understand a project – from the big picture down to the smallest detail – before getting started. To plan is to succeed.",
      icon: '📊',
    },
    {
      title: 'Assign',
      description: 'Our employees are proven specialists. From that talented pool, we build a project team with the exact skills to match the job requirements.',
      icon: '👤',
    },
    {
      title: 'Assess',
      description: 'We never take our eye off a project, not even for a day. We evaluate progress and performance using our proprietary software management system.',
      icon: '📏',
    },
    {
      title: 'Accountability',
      description: 'When we take on a project we take ownership of its success – providing daily reporting, quality control test reports, and project close-out documentation.',
      icon: '🔗',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://rpmavs.com/wp-content/uploads/2015/06/cover12.jpg)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2075bf]/20 to-transparent" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl uppercase tracking-wider">
                RPM-AVS Services
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8"
              >
                A unique approach to delivering outstanding results to our partners.
              </motion.h2>
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {advantages.map((advantage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <GlassCard className="h-full p-6 md:p-8">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl flex-shrink-0">{advantage.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-bold text-[#2075bf] uppercase mb-3">
                            {advantage.title}
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            {advantage.description}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <GlassCard className="h-full p-6 md:p-8">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl flex-shrink-0">{service.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-bold text-[#2075bf] uppercase mb-3">
                            {service.title}
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section - 4-A Road to Success */}
        <section 
          className="relative py-20 md:py-32 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://rpmavs.bobkadrie.com/wp-content/uploads/2015/06/cover11.jpg?id=30)',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-16 uppercase"
              >
                Our Process: The 4-A Road to Success
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <GlassCard className="h-full p-6 md:p-8 text-center bg-white/10 backdrop-blur-md border border-white/20">
                      <div className="text-5xl mb-4">{step.icon}</div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white uppercase mb-4">
                        {step.title}
                      </h3>
                      <p className="text-white/90 leading-relaxed">
                        {step.description}
                      </p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
