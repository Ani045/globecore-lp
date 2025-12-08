import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import Header from './Header';
import Footer from './Footer';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiCalendar, FiPhone, FiMail, FiMessageSquare, FiAlertCircle } = FiIcons;

const ResultsPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    score: 12,
    riskLevel: 'moderate',
    name: 'Demo User',
    email: 'demo@example.com',
    phone: '+1 (555) 123-4567',
    message: 'This is a demonstration of the results page. Complete the screening to see your personalized results.'
  });

  useEffect(() => {
    // Function to get cookie value
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
      return '';
    };

    // Read data from cookies
    const score = getCookie('mentalHealthScore');
    const riskLevel = getCookie('riskLevel');
    const name = getCookie('userName');
    const email = getCookie('userEmail');
    const phone = getCookie('userPhone');
    const message = getCookie('userMessage');

    // If no score found (direct access or missing data), use default data
    if (!score || score === '') {
      setUserData({
        score: 12,
        riskLevel: 'moderate',
        name: 'Demo User',
        email: 'demo@example.com',
        phone: '+1 (555) 123-4567',
        message: 'This is a demonstration of the results page. Complete the screening to see your personalized results.'
      });
    } else {
      setUserData({
        score: parseInt(score) || 0,
        riskLevel: riskLevel || 'low',
        name: name || 'User',
        email: email || '',
        phone: phone || '',
        message: message || ''
      });
    }
  }, []);

  const getResultsMessage = (score) => {
    if (score <= 5) {
      return {
        level: "Low Risk",
        summary: "Your responses suggest you're managing well currently.",
        recommendation: "No immediate action needed, but stay aware of your mental wellness. Continue monitoring your mental health and practice self-care. If symptoms develop or worsen, don't hesitate to reach out for support.",
        color: "text-green-700",
        bgColor: "bg-green-50",
        borderColor: "border-green-200"
      };
    } else if (score <= 12) {
      return {
        level: "Moderate Risk",
        summary: "Your responses indicate you're experiencing some mental health challenges that are affecting your quality of life.",
        recommendation: "Schedule a consultation with a psychiatrist or mental health professional within the next 1-2 weeks. You would benefit from a professional evaluation. Early intervention can prevent symptoms from worsening and help you regain balance.",
        color: "text-yellow-700",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200"
      };
    } else if (score <= 18) {
      return {
        level: "High Risk",
        summary: "Your responses suggest you're dealing with significant mental health symptoms that are substantially impacting your daily life and well-being.",
        recommendation: "Contact a mental health provider this week. Professional treatment is strongly recommended. You may be experiencing a treatable condition such as depression, anxiety disorder, OCD, PTSD, or bipolar disorder. Treatment can make a significant difference.",
        color: "text-orange-700",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200"
      };
    } else {
      return {
        level: "Very High Risk",
        summary: "Your responses indicate severe symptoms that require immediate professional attention.",
        recommendation: "Seek help immediately. You're likely struggling considerably, and help is available and necessary. Contact a psychiatrist or mental health crisis service today.",
        color: "text-red-700",
        bgColor: "bg-red-50",
        borderColor: "border-red-200"
      };
    }
  };

  const scrollToBooking = () => {
    const bookingElement = document.getElementById('booking-section');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If no score found in cookies, show error message
  if (userData.score === null) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onBookConsultation={scrollToBooking} />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center max-w-md mx-auto">
            <SafeIcon icon={FiAlertCircle} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Results Found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find your quiz results. Please take the quiz first to see your personalized recommendations.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-teal-700 text-white font-bold rounded-lg hover:bg-teal-800 transition-colors"
            >
              Take the Quiz
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const results = getResultsMessage(userData.score);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onBookConsultation={scrollToBooking} />
      <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Your Mental Health Assessment Results
          </h1>
          <p className="text-lg text-gray-600">
            Hello {userData.name}, here are your personalized results and next steps.
          </p>
        </div>

        {/* Results Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <div className="text-center mb-6">
            <div className={`inline-block px-8 py-6 rounded-xl border-2 ${results.bgColor} ${results.borderColor}`}>
              <p className="text-sm uppercase tracking-wide font-bold text-gray-500 mb-2">Your Total Score</p>
              <p className={`text-4xl font-bold ${results.color}`}>
                {userData.score} / 21
              </p>
              <p className={`text-xl font-semibold mt-2 ${results.color}`}>
                {results.level}
              </p>
            </div>
          </div>

          {/* Analysis */}
          <div className={`p-6 rounded-xl border ${results.bgColor} ${results.borderColor} mb-6`}>
            <h3 className={`text-lg font-bold mb-3 ${results.color}`}>Your Analysis</h3>
            <p className="text-gray-800 mb-4 leading-relaxed">
              {results.summary}
            </p>
            <h3 className={`text-lg font-bold mb-3 ${results.color}`}>Our Recommendation</h3>
            <p className="text-gray-800 leading-relaxed font-medium">
              {results.recommendation}
            </p>
          </div>

          {/* User Information */}
          {/* <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <SafeIcon icon={FiUser} className="w-5 h-5 mr-2" />
              Your Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-gray-900">{userData.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-gray-900">{userData.email}</p>
              </div>
              {userData.phone && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-gray-900">{userData.phone}</p>
                </div>
              )}
              {userData.message && (
                <div className="sm:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Additional Message</p>
                  <p className="text-gray-900">{userData.message}</p>
                </div>
              )}
            </div>
          </div> */}
        </div>

        {/* How Harmony Neurocare Can Help */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              How Harmony Neurocare Can Help
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              If your score suggests you could benefit from professional care, Harmony Neurocare specializes in treating various mental health conditions with personalized, evidence-based approaches.
            </p>
          </div>

          {/* Conditions We Treat */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              We Specialize in Treating:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Depression",
                "Anxiety Disorders", 
                "Obsessive-Compulsive Disorder (OCD)",
                "Post-Traumatic Stress Disorder (PTSD)",
                "Bipolar Disorder"
              ].map((condition, index) => (
                <div key={index} className="flex items-center p-3 bg-teal-50 rounded-lg border border-teal-100">
                  <SafeIcon icon={FiCheck} className="w-5 h-5 text-teal-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{condition}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-8 text-center mb-8">
            <h3 className="text-2xl font-bold text-teal-800 mb-4">Take Action Today</h3>
            <p className="text-teal-700 mb-6 text-lg">
              Contact our team to schedule a discovery call and take the first step towards better mental health.
            </p>
            <button
              onClick={() => window.location.href = 'tel:7702841044'}
              className="inline-flex items-center px-8 py-4 bg-teal-700 text-white font-bold text-lg rounded-lg hover:bg-teal-800 transition-colors shadow-lg transform hover:scale-105"
            >
              <SafeIcon icon={FiCalendar} className="w-6 h-6 mr-3" />
              Book Complementary Discovery Call
            </button>
            <p className="text-teal-600 mt-3 text-sm">
              <SafeIcon icon={FiPhone} className="w-4 h-4 inline mr-1" />
              (770) 284-1044
            </p>
          </div>

          {/* Our Providers */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Meet Our Expert Providers
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="mb-6">
                  <div className="relative inline-block">
                    <img 
                      src="doctor-1.png" 
                      alt="Dr. Megan Bowers, MD, PhD" 
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg border-4 border-white"
                    />
                    {/* <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <SafeIcon icon={FiUser} className="w-5 h-5 text-white" />
                    </div> */}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Dr. Megan Bowers, MD, PhD</h4>
                <div className="bg-teal-50 rounded-lg px-4 py-2 mb-4 inline-block">
                  <p className="text-teal-700 font-semibold text-sm">Child, Adolescent, and Adult Integrative Psychiatrist</p>
                </div>
             
              </div>
              
              <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="mb-6">
                  <div className="relative inline-block">
                    <img 
                      src="doctor-2.png" 
                      alt="Marjorie Armstrong, MSN, PMHNP-BC" 
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg border-4 border-white"
                    />
                    {/* <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <SafeIcon icon={FiUser} className="w-5 h-5 text-white" />
                    </div> */}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Marjorie Armstrong, MSN, PMHNP-BC</h4>
                <div className="bg-purple-50 rounded-lg px-4 py-2 mb-4 inline-block">
                  <p className="text-purple-700 font-semibold text-sm">Adult Psychiatric and Mental Health Nurse Practitioner</p>
                </div>
              
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start">
              <SafeIcon icon={FiAlertCircle} className="w-5 h-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-sm text-gray-600 italic">
                This quiz is a screening tool, not a diagnosis. Only a qualified mental health professional can provide an accurate diagnosis and treatment plan. Seeking help is a sign of strength, and effective treatment is available.
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResultsPage;