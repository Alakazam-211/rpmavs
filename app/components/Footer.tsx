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
        { href: 'https://rpmavs.quickbase.com/nav/app/bikmcn82r/action/showpage?pageid=35', label: 'Get A Quote', external: true },
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 mt-12 sm:mt-16 md:mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 lg:pr-8 xl:pr-12">
            <div className="mb-4">
              <Link href="/" className="inline-block">
                <Image
                  src="/rpm-avs-logo-dark.png"
                  alt="RPM Audio Visual Services"
                  width={200}
                  height={56}
                  className="h-auto w-auto max-w-[180px] sm:max-w-[200px]"
                />
              </Link>
            </div>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
              Expert subcontractors for A/V sellers and consultants. RPM represents the largest team of commercial audio visual expertise in the country for any single location, using zero outsourcing.
            </p>
            <div className="flex space-x-4 mt-4">
              {/* Social media links can be added here if needed */}
            </div>
          </div>

          {/* Footer Sections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:col-span-3">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold text-gray-900 mb-4 uppercase text-sm">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-[#2075bf] transition-colors text-sm cursor-pointer"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-gray-600 hover:text-[#2075bf] transition-colors text-sm cursor-pointer"
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
              <h4 className="font-semibold text-gray-900 mb-4 uppercase text-sm">
                Locations
              </h4>
              <ul className="space-y-2 text-gray-600 text-sm">
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
        <div className="border-t border-gray-200 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} RPM Audio Visual Services. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                href="/contact"
                className="text-gray-600 hover:text-[#2075bf] transition-colors text-xs sm:text-sm min-h-[44px] flex items-center cursor-pointer"
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
