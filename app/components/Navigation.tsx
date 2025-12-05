'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/careers', label: 'Careers' },
    { href: '/contact', label: 'Contact Us' },
  ];

  useEffect(() => {
    // Check if this is the first visit in this session
    const hasVisited = sessionStorage.getItem('navbar-shown');
    if (!hasVisited) {
      setShouldAnimate(true);
      sessionStorage.setItem('navbar-shown', 'true');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <div 
      className="fixed left-1/2 -translate-x-1/2 z-50 max-w-7xl w-[calc(100%-0.5rem)] sm:w-[calc(100%-1rem)] md:w-[calc(100%-2rem)]" 
      style={{ top: scrolled ? '0.5rem' : '0.75rem' }}
    >
      <motion.nav
        initial={{ y: shouldAnimate ? -100 : 0 }}
        animate={{ 
          y: isHovered ? 2 : 0,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ duration: shouldAnimate ? 0.5 : 0.2, ease: 'easeOut' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="glass-nav w-full"
        style={{
          borderRadius: '2rem',
          transformOrigin: 'center',
          transition: 'box-shadow 0.2s ease-out',
          boxShadow: isHovered 
            ? '0 12px 40px 0 rgba(32, 117, 191, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2) inset'
            : '0 8px 32px 0 rgba(32, 117, 191, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.15) inset'
        }}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3">
          <div className="flex items-center justify-between min-h-12 sm:min-h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center group min-h-[44px] min-w-[44px] flex-shrink-0 cursor-pointer -ml-1 sm:ml-0">
              {/* Mobile Logo - White Icon */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="lg:hidden h-10 sm:h-12 w-auto"
              >
                <Image
                  src="/rpmavs_icon.png"
                  alt="RPM Audio Visual Services Atlanta, GA"
                  width={120}
                  height={120}
                  className="h-full w-auto object-contain brightness-0 invert"
                  priority
                />
              </motion.div>
              {/* Desktop Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="hidden lg:block h-8 md:h-10 w-auto"
              >
                <Image
                  src="/rpm-avs-logo-white.png"
                  alt="RPM Audio Visual Services Atlanta, GA"
                  width={200}
                  height={56}
                  className="h-full w-auto object-contain max-w-[120px] md:max-w-[140px]"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 xl:px-5 py-2 rounded-full text-sm xl:text-base font-semibold transition-all duration-200 text-white/90 hover:text-white relative group cursor-pointer whitespace-nowrap"
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
              
              {/* CTA Button */}
              <Link href="/get-a-quote" className="ml-2 cursor-pointer">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="px-5 py-2.5 rounded-full text-sm xl:text-base font-semibold bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:border-white/40 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 group cursor-pointer whitespace-nowrap">
                    Get A Quote
                    <motion.svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </button>
                </motion.div>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 active:bg-white/40 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer touch-manipulation"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <motion.svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </motion.svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden py-3 space-y-1 overflow-hidden"
              >
                {navLinks.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 rounded-full text-base font-semibold transition-all relative min-h-[48px] flex items-center cursor-pointer touch-manipulation ${
                          active 
                            ? 'text-white bg-white/10' 
                            : 'text-white/90 active:text-white active:bg-white/10'
                        }`}
                      >
                        {item.label}
                        {active && (
                          <div className="absolute bottom-2 left-4 right-4 h-0.5 bg-white rounded-full" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
                
                <div className="pt-3 border-t border-white/20 mt-2">
                  <Link href="/get-a-quote" onClick={() => setIsOpen(false)} className="block cursor-pointer">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-4 py-3 rounded-full text-base font-semibold bg-white/20 backdrop-blur-md border border-white/30 text-white active:bg-white/30 transition-all shadow-lg flex items-center justify-center gap-2 group min-h-[48px] cursor-pointer touch-manipulation"
                    >
                      Get A Quote
                      <motion.svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  );
}
