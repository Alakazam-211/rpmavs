'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import GlassCard from '../../components/ui/GlassCard';
import GlassButton from '../../components/ui/GlassButton';

interface QuoteStatus {
  success: boolean;
  quoteId: string;
  opportunityName: string;
  dateSubmitted: string;
  status: string;
  isProcessed: boolean;
  email?: string;
  obfuscatedEmail?: string;
  error?: string;
}

export default function QuoteStatusPage() {
  const params = useParams();
  const quoteId = params?.quoteId as string;
  const [quoteStatus, setQuoteStatus] = useState<QuoteStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!quoteId) {
      setError('Invalid quote ID');
      setLoading(false);
      return;
    }

    const fetchQuoteStatus = async () => {
      try {
        const response = await fetch(`/api/quote-status/${quoteId}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Failed to load quote status');
          setLoading(false);
          return;
        }

        setQuoteStatus(data);
        setLoading(false);
      } catch (err) {
        setError('An unexpected error occurred');
        setLoading(false);
      }
    };

    fetchQuoteStatus();
  }, [quoteId]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[40vh] sm:h-[50vh] min-h-[350px] sm:min-h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://rpmavs.com/wp-content/uploads/2015/06/cover12.jpg)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2075bf]/20 to-transparent" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
            <div className="text-center text-white">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-3 sm:mb-4 leading-tight drop-shadow-2xl uppercase tracking-wider px-2" style={{ fontFamily: 'var(--font-oswald), sans-serif', letterSpacing: '0.1em' }}>
                Quote Request Status
              </h1>
            </div>
          </div>
        </section>

        {/* Status Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <GlassCard className="p-4 sm:p-6 md:p-8 lg:p-12">
                {loading && (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#2075bf]"></div>
                    <p className="mt-4 text-gray-600">Loading quote status...</p>
                  </div>
                )}

                {error && (
                  <div className="text-center py-12">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 mb-6">
                      <p className="font-semibold mb-1">Error</p>
                      <p className="text-sm">{error}</p>
                    </div>
                    <GlassButton
                      type="button"
                      onClick={() => window.location.href = '/get-a-quote'}
                      variant="primary"
                      className="!text-base !px-8 !py-3"
                    >
                      Submit a New Quote Request
                    </GlassButton>
                  </div>
                )}

                {quoteStatus && !loading && !error && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
                        quoteStatus.isProcessed 
                          ? 'bg-green-100' 
                          : 'bg-yellow-100'
                      }`}>
                        {quoteStatus.isProcessed ? (
                          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#2075bf] mb-4 uppercase">
                        {quoteStatus.status}
                      </h2>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-white/50 rounded-xl border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-600 mb-1">Opportunity Name</p>
                            <p className="text-lg text-gray-900">{quoteStatus.opportunityName}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600 mb-1">Date Submitted</p>
                            <p className="text-lg text-gray-900">{quoteStatus.dateSubmitted}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <p className="text-sm text-gray-700 mb-4">
                          Want to see all the details of this request? Create an account using the email you submitted the quote request with{quoteStatus.obfuscatedEmail ? ` (${quoteStatus.obfuscatedEmail})` : ''}.
                        </p>
                        <div className="flex justify-center">
                          <GlassButton
                            type="button"
                            variant="primary"
                            className="!text-base !px-8 !py-3"
                            disabled
                          >
                            Create Account (Coming Soon)
                          </GlassButton>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </GlassCard>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
