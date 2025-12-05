'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-32 pb-20">
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white via-gray-50/50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <GlassCard className="p-8 md:p-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[#2075bf] uppercase">
                  Contact Us
                </h1>
                <hr className="border-t-2 border-gray-300 my-6" />
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <GlassButton 
                    type="submit"
                    variant="primary"
                    className="w-full sm:w-auto"
                  >
                    Send Message
                  </GlassButton>
                </form>
              </GlassCard>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
