import React from 'react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPhone, FiCalendar } = FiIcons;

const Header = ({ onBookConsultation }) => {
  const handleCallNow = () => {
    window.location.href = 'tel:7702841044';
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src="logo.webp"
              alt="GlobeCoRe Inc."
              className="h-12 md:h-16 w-auto object-contain"
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Call Now Button */}
            <button
              onClick={handleCallNow}
              className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-teal-700 text-white font-semibold rounded-lg hover:bg-teal-800 transition-colors duration-200 shadow-sm"
            >
              <SafeIcon icon={FiPhone} className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Call Now</span>
              <span className="sm:hidden">Call</span>
            </button>


          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;