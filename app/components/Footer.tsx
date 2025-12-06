'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Company',
      links: [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/services', label: 'Services' },
        { href: '/careers', label: 'Careers' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { href: '/case-studies', label: 'Case Studies' },
        { href: '/contact', label: 'Contact Us' },
        { href: '/get-a-quote', label: 'Get A Quote', external: false },
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 mt-8 sm:mt-12 md:mt-16 lg:mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 lg:pr-8 xl:pr-12">
            <div className="mb-3 sm:mb-4">
              <Link href="/" className="inline-block">
                <Image
                  src="/rpm-avs-logo-dark.png"
                  alt="RPM Audio Visual Services"
                  width={200}
                  height={56}
                  className="h-auto w-auto max-w-[160px] sm:max-w-[180px] md:max-w-[200px]"
                  loading="eager"
                  priority
                />
              </Link>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4">
              Expert subcontractors for A/V sellers and consultants. RPM represents the largest team of commercial audio visual expertise in the country for any single location, using zero outsourcing.
            </p>
            <div className="flex space-x-4 mt-3 sm:mt-4">
              {/* Social media links can be added here if needed */}
            </div>
          </div>

          {/* Footer Sections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 lg:col-span-3">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 uppercase text-xs sm:text-sm">
                  {section.title}
                </h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-[#2075bf] transition-colors text-xs sm:text-sm cursor-pointer touch-manipulation block py-1"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-gray-600 hover:text-[#2075bf] transition-colors text-xs sm:text-sm cursor-pointer touch-manipulation block py-1"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            {/* Contact Info Section */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 uppercase text-xs sm:text-sm">
                Locations
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-gray-600 text-xs sm:text-sm">
                <li>Atlanta, GA</li>
                <li>Birmingham, AL</li>
                <li>Raleigh, NC</li>
                <li>Charlotte, NC</li>
                <li>Tampa, FL</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-5 sm:mt-6 md:mt-8 pt-5 sm:pt-6 md:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} RPM Audio Visual Services. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                href="/contact"
                className="text-gray-600 hover:text-[#2075bf] transition-colors text-xs sm:text-sm min-h-[44px] flex items-center cursor-pointer touch-manipulation"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
