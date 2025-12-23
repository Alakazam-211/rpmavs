'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';

export default function GetAQuotePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4; // Added step 4 for success page

  const [formData, setFormData] = useState({
    // Step 1: Contact & Project Information
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    opportunityName: '',
    projectName: '',
    clientEndUser: '',
    jobsiteAddress: {
      street1: '',
      street2: '',
      city: '',
      zip: '',
      state: '',
    },
    comments: '',
    quoteNeededBy: '',
    startWorkDate: '',
    completionDate: '',
    budget: '',
    
    // Step 2: Services
    services: {
      siteSurvey: false,
      preSalesDesign: false,
      designReview: false,
      cad: false,
      installation: false,
      projectManagement: false,
      programming: false,
      commissioning: false,
    },
    
    // Step 3: Documentation
    documentation: {
      bom: false,
      sow: false,
      sketches: false,
      wiringDiagrams: false,
      floorPlans: false,
      rcps: false,
      elevations: false,
      misc: false,
    },
    scopeOfWork: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Field ID to readable name mapping for error messages
  const getFieldName = (fieldId: number): string => {
    const fieldMap: Record<number, string> = {
      6: 'First Name',
      7: 'Last Name',
      8: 'Email Address',
      9: 'Installation',
      10: 'Programming',
      11: 'Design',
      12: 'Commissioning',
      13: 'Client',
      14: 'Project Management',
      15: 'CAD',
      16: 'Design Review',
      17: 'Pre-Sales Design',
      18: 'BOM',
      19: 'SOW',
      20: 'Scope of Work',
      21: 'Sketches',
      22: 'Floor Plans',
      24: 'Need by Date',
      25: 'Company Name',
      26: 'Project Name',
      27: 'Comments',
      34: 'Start Work Date',
      35: 'Completion Date',
      36: 'Budget',
      37: 'BOM',
      38: 'SOW',
      39: 'Sketches',
      40: 'Wiring Diagrams',
      41: 'Floor Plans',
      42: "RCP's",
      43: 'Elevations',
      46: 'Misc.',
      49: 'Street Address 1',
      50: 'Street Address 2',
      51: 'City',
      52: 'State/Region',
      53: 'Postal Code',
      55: 'Site Survey',
    };
    return fieldMap[fieldId] || `Field ${fieldId}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (name.startsWith('jobsiteAddress.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        jobsiteAddress: {
          ...prev.jobsiteAddress,
          [field]: value,
        },
      }));
    } else if (name.startsWith('services.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        services: {
          ...prev.services,
          [field]: checked,
        },
      }));
    } else if (name.startsWith('documentation.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        documentation: {
          ...prev.documentation,
          [field]: checked,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  // Email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Scroll to top of form section
  const scrollToFormTop = () => {
    setTimeout(() => {
      const formSection = document.querySelector('section.py-12');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Handle step navigation with scroll
  const handleStepChange = (newStep: number) => {
    setCurrentStep(newStep);
    scrollToFormTop();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent any form bubbling that might cause navigation
    
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    // Validate email format before submission
    if (formData.email && !isValidEmail(formData.email)) {
      setSubmitError('Please enter a valid email address (e.g., name@example.com)');
      setIsSubmitting(false);
      setTimeout(() => {
        const errorElement = document.querySelector('[data-error-message]');
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return;
    }

    try {
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Build detailed error message with field information
        let errorMessage = data.error || 'Failed to submit quote request';
        let fieldError = null;
        
        // Parse QuickBase field errors to identify which field failed
        if (data.details) {
          if (typeof data.details === 'object' && data.details.lineErrors) {
            const lineErrors = data.details.lineErrors;
            const errorDetails = Object.values(lineErrors).flat() as string[];
            
            // Try to identify which field failed from error message
            errorDetails.forEach((err: string) => {
              const fieldMatch = err.match(/field with ID '(\d+)'/);
              if (fieldMatch) {
                const fieldId = parseInt(fieldMatch[1]);
                const fieldName = getFieldName(fieldId);
                fieldError = `${fieldName}: ${err}`;
              } else {
                fieldError = err;
              }
            });
            
            if (!fieldError) {
              errorMessage += `. ${errorDetails.join(', ')}`;
            } else {
              errorMessage = fieldError;
            }
          } else if (typeof data.details === 'string') {
            errorMessage += `. ${data.details}`;
          }
        }
        
        // Stay on step 3, show error, keep form data intact
        setSubmitError(errorMessage);
        setIsSubmitting(false);
        
        // Scroll to error message
        setTimeout(() => {
          const errorElement = document.querySelector('[data-error-message]');
          if (errorElement) {
            errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
        
        return; // Exit early on error, stay on step 3
      }

      // Success - move to step 4 (success page)
      setSubmitSuccess(true);
      setCurrentStep(4); // Go to success page
      setIsSubmitting(false);
      
      // Store quote ID for potential future use
      if (data.quoteId) {
        // Could store in localStorage or state if needed for status page link
        // For now, the status URL is in the response
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Stay on step 3, show error, keep form data intact
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
      
      // Scroll to error message
      setTimeout(() => {
        const errorElement = document.querySelector('[data-error-message]');
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const handleSubmitAnother = () => {
    // Reset form and go back to step 1
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      opportunityName: '',
      projectName: '',
      clientEndUser: '',
      jobsiteAddress: {
        street1: '',
        street2: '',
        city: '',
        zip: '',
        state: '',
      },
      comments: '',
      quoteNeededBy: '',
      startWorkDate: '',
      completionDate: '',
      budget: '',
      services: {
        siteSurvey: false,
        preSalesDesign: false,
        designReview: false,
        cad: false,
        installation: false,
        projectManagement: false,
        programming: false,
        commissioning: false,
      },
      documentation: {
        bom: false,
        sow: false,
        sketches: false,
        wiringDiagrams: false,
        floorPlans: false,
        rcps: false,
        elevations: false,
        misc: false,
      },
      scopeOfWork: '',
    });
    setCurrentStep(1);
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  const services = [
    { key: 'siteSurvey', label: 'Site Survey' },
    { key: 'preSalesDesign', label: 'Pre-Sales Design' },
    { key: 'designReview', label: 'Design Review' },
    { key: 'cad', label: 'CAD' },
    { key: 'installation', label: 'Installation' },
    { key: 'projectManagement', label: 'Project Management' },
    { key: 'programming', label: 'Programming' },
    { key: 'commissioning', label: 'Commissioning' },
  ];

  const documentationItems = [
    { key: 'bom', label: 'BOM' },
    { key: 'sow', label: 'SOW' },
    { key: 'sketches', label: 'Sketches' },
    { key: 'wiringDiagrams', label: 'Wiring Diagrams (SLD)' },
    { key: 'floorPlans', label: 'Floor Plans' },
    { key: 'rcps', label: "RCP's" },
    { key: 'elevations', label: 'Elevations' },
    { key: 'misc', label: 'Misc.' },
  ];

  const usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

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
                Get A Quote
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light max-w-4xl mx-auto drop-shadow-lg px-2">
                Request a quote for your next project
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {currentStep !== 4 && (
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 px-2">
                      <span className="text-base sm:text-lg text-gray-600">Step {currentStep} of {totalSteps - 1}</span>
                      <div className="w-full sm:w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#2075bf] to-[#2d8dd4] transition-all duration-500"
                          style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <GlassCard className="p-4 sm:p-6 md:p-8 lg:p-12">
                  <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8" noValidate>
                    {/* Step 1: Contact & Project Information */}
                    {currentStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4 sm:space-y-6"
                      >
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2075bf] mb-4 sm:mb-6 uppercase leading-tight">
                          Section 1: Your Information
                        </h3>
                        <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">Please enter your information below:</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all text-base"
                              placeholder="First Name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                              placeholder="Last Name"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                              placeholder="email@example.com"
                            />
                            {formData.email && !isValidEmail(formData.email) && (
                              <p className="text-xs text-red-600 mt-1">Please enter a valid email address</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Company Name
                            </label>
                            <input
                              type="text"
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                              placeholder="Company Name"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            What should we call this opportunity? <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="opportunityName"
                            value={formData.opportunityName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                            placeholder="Opportunity Name"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              What is the unique project name?
                            </label>
                            <input
                              type="text"
                              name="projectName"
                              value={formData.projectName}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                              placeholder="Project Name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Who is the client / end-user?
                            </label>
                            <input
                              type="text"
                              name="clientEndUser"
                              value={formData.clientEndUser}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                              placeholder="Client / End-User"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Jobsite Address <span className="text-red-500">*</span>
                          </label>
                          <div className="space-y-2">
                            <input
                              type="text"
                              name="jobsiteAddress.street1"
                              value={formData.jobsiteAddress.street1}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                              placeholder="Street address 1"
                            />
                            <input
                              type="text"
                              name="jobsiteAddress.street2"
                              value={formData.jobsiteAddress.street2}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                              placeholder="Street address 2"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                              <input
                                type="text"
                                name="jobsiteAddress.city"
                                value={formData.jobsiteAddress.city}
                                onChange={handleInputChange}
                                required
                                className="px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all text-base"
                                placeholder="City"
                              />
                              <input
                                type="text"
                                name="jobsiteAddress.zip"
                                value={formData.jobsiteAddress.zip}
                                onChange={handleInputChange}
                                required
                                className="px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all text-base"
                                placeholder="ZIP code"
                              />
                              <select
                                name="jobsiteAddress.state"
                                value={formData.jobsiteAddress.state}
                                onChange={handleInputChange}
                                required
                                className="px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all text-base"
                              >
                                <option value="">State</option>
                                {usStates.map(state => (
                                  <option key={state} value={state}>{state}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Comments
                          </label>
                          <textarea
                            name="comments"
                            value={formData.comments}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all resize-none"
                            placeholder="Additional comments..."
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Quote Needed By
                            </label>
                            <input
                              type="date"
                              name="quoteNeededBy"
                              value={formData.quoteNeededBy}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all text-base"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Start Work Date
                            </label>
                            <input
                              type="date"
                              name="startWorkDate"
                              value={formData.startWorkDate}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Completion Date
                            </label>
                            <input
                              type="date"
                              name="completionDate"
                              value={formData.completionDate}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            What is your overall budget for outsourced labor?
                          </label>
                          <input
                            type="text"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all"
                            placeholder="$0.00"
                          />
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                          <GlassButton
                            type="button"
                            onClick={() => handleStepChange(2)}
                            variant="primary"
                            className="!text-base !px-6 !py-3"
                          >
                            Next: Services
                          </GlassButton>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Services */}
                    {currentStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                      >
                        <h3 className="text-2xl sm:text-3xl font-bold text-[#2075bf] mb-6 uppercase">
                          Section 2: Services
                        </h3>
                        <p className="text-gray-700 mb-6">Please check all the services you'd like us to quote:</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                          {services.map((service) => (
                            <label key={service.key} className="flex items-start gap-3 cursor-pointer group p-3 sm:p-4 rounded-lg bg-white/30 hover:bg-white/50 transition-all touch-manipulation min-h-[44px]">
                              <input
                                type="checkbox"
                                name={`services.${service.key}`}
                                checked={formData.services[service.key as keyof typeof formData.services]}
                                onChange={handleInputChange}
                                className="mt-1 w-5 h-5 text-[#2075bf] border-gray-300 rounded focus:ring-2 focus:ring-[#2075bf] cursor-pointer"
                              />
                              <span className="text-gray-700 group-hover:text-[#2075bf] transition-colors font-medium">
                                {service.label}
                              </span>
                            </label>
                          ))}
                        </div>

                        <div className="flex justify-between gap-4 pt-4">
                          <GlassButton
                            type="button"
                            onClick={() => handleStepChange(1)}
                            variant="secondary"
                            className="!text-base !px-6 !py-3"
                          >
                            ← Back
                          </GlassButton>
                          <GlassButton
                            type="button"
                            onClick={() => handleStepChange(3)}
                            variant="primary"
                            className="!text-base !px-6 !py-3"
                          >
                            Next: Documentation
                          </GlassButton>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Documentation */}
                    {currentStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                      >
                        <h3 className="text-2xl sm:text-3xl font-bold text-[#2075bf] mb-6 uppercase">
                          Section 3: Documentation
                        </h3>
                        <p className="text-gray-700 mb-6">
                          Here is a checklist of items that will help us provide an accurate quote, please check which items you are providing:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                          {documentationItems.map((item) => (
                            <label key={item.key} className="flex items-start gap-3 cursor-pointer group p-3 sm:p-4 rounded-lg bg-white/30 hover:bg-white/50 transition-all touch-manipulation min-h-[44px]">
                              <input
                                type="checkbox"
                                name={`documentation.${item.key}`}
                                checked={formData.documentation[item.key as keyof typeof formData.documentation]}
                                onChange={handleInputChange}
                                className="mt-1 w-5 h-5 text-[#2075bf] border-gray-300 rounded focus:ring-2 focus:ring-[#2075bf] cursor-pointer"
                              />
                              <span className="text-gray-700 group-hover:text-[#2075bf] transition-colors font-medium">
                                {item.label}
                              </span>
                            </label>
                          ))}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            You can paste your Scope of Work here if you prefer:
                          </label>
                          <textarea
                            name="scopeOfWork"
                            value={formData.scopeOfWork}
                            onChange={handleInputChange}
                            rows={8}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2075bf] focus:border-transparent transition-all resize-y text-base"
                            placeholder="Paste your Scope of Work here..."
                          />
                        </div>

                        {submitError && (
                          <div data-error-message className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                            <p className="font-semibold mb-1">Error submitting request</p>
                            <p className="text-sm">{submitError}</p>
                            <p className="text-xs mt-2 text-red-600">Please correct the issue above and try again. Your form data has been preserved.</p>
                          </div>
                        )}

                        <div className="flex justify-between gap-4 pt-4">
                          <GlassButton
                            type="button"
                            onClick={() => handleStepChange(2)}
                            variant="secondary"
                            className="!text-base !px-6 !py-3"
                            disabled={isSubmitting}
                          >
                            ← Back
                          </GlassButton>
                          <GlassButton
                            type="submit"
                            variant="primary"
                            className="!text-base !px-8 !py-3"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                          </GlassButton>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Success Page */}
                    {currentStep === 4 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6 text-center"
                      >
                        <div className="mb-8">
                          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <h3 className="text-3xl sm:text-4xl font-bold text-[#2075bf] mb-4 uppercase">
                            Request Submitted Successfully!
                          </h3>
                          <p className="text-lg text-gray-700 mb-2">
                            Thank you for your interest in RPM Audio Visual Services.
                          </p>
                          <p className="text-base text-gray-600 mb-4">
                            We've received your quote request and will be in touch soon.
                          </p>
                          <p className="text-sm text-gray-600">
                            You will receive a confirmation email with the details of your submission and a link to view the status of your submission.
                          </p>
                        </div>

                        <div className="pt-6 flex justify-center">
                          <GlassButton
                            type="button"
                            onClick={handleSubmitAnother}
                            variant="primary"
                            className="!text-base !px-8 !py-3"
                          >
                            Submit Another Request
                          </GlassButton>
                        </div>
                      </motion.div>
                    )}
                  </form>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
