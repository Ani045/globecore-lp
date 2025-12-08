import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Logo - Added bg-white and padding because the logo has dark text */}
          <div className="bg-white rounded-lg px-3 py-2">
            <img
              src="logo.webp"
              alt="GlobeCoRe Inc."
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Tagline and Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-300 mb-1">
              Committed to Diversity & Cultural Inclusion at Every Stage of Life
            </p>
            <p className="text-sm text-gray-400">
              © GlobeCoRe, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;