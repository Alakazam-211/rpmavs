'use client';

import { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GlassCard from '../components/ui/GlassCard';

export default function ContactPage() {
  useEffect(() => {
    // Load Fillout embed script
    const script = document.createElement('script');
    script.src = 'https://server.fillout.com/embed/v1/';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script on unmount
      const existingScript = document.querySelector('script[src="https://server.fillout.com/embed/v1/"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-24 sm:pt-32 pb-12 sm:pb-20">
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-gray-50/50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <GlassCard>
                <div className="px-6 sm:px-8 md:px-12 pt-6 sm:pt-8 md:pt-12 pb-2 sm:pb-3">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-[#2075bf] uppercase leading-tight">
                    Contact Us
                  </h1>
                  <hr className="border-t-2 border-gray-300 mb-2 sm:mb-3" />
                </div>
                
                <div 
                  style={{ width: '100%', height: '500px' }}
                  data-fillout-id="pKBZoetVMLus"
                  data-fillout-embed-type="standard"
                  data-fillout-inherit-parameters
                  data-fillout-dynamic-resize
                  data-fillout-domain="forms.discover-nocode.com"
                />
              </GlassCard>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
