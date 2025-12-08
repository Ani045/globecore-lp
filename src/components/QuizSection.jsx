import React from 'react';
import DepressionScreeningQuiz from './DepressionScreeningQuiz';

const QuizSection = () => {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Mental Health Screening Quiz
          </h1>
          <h2 className="text-xl sm:text-2xl text-teal-700 font-medium mb-4">
            Should You Consider Seeing a Psychiatrist?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            <strong>Instructions:</strong> Answer questions honestly based on how you've been feeling over the past 2-4 weeks. Select the response that best describes your experience.
          </p>
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10">
          <DepressionScreeningQuiz />
        </div>
      </div>
    </section>
  );
};

export default QuizSection;