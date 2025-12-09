import React, { useState } from 'react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowRight, FiArrowLeft, FiCheck, FiPhone, FiUser, FiAlertCircle, FiMail } = FiIcons;

const DepressionScreeningQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState('quiz'); // 'quiz', 'form'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  });

  const questions = [
    {
      id: 1,
      category: "Emotional Well-being",
      text: "Over the past 2-4 weeks, how often have you felt down, depressed, anxious, or hopeless?",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" }
      ]
    },
    {
      id: 2,
      category: "Sleep and Appetite",
      text: "Have you experienced significant changes in your sleep or eating patterns (sleeping too much/too little, eating much more/less than usual)?",
      options: [
        { value: 0, label: "No changes" },
        { value: 1, label: "Minor changes that don't bother me much" },
        { value: 2, label: "Significant changes that are concerning" },
        { value: 3, label: "Severe changes that affect my health and daily life" }
      ]
    },
    {
      id: 3,
      category: "Thoughts and Behaviors",
      text: "Do you experience repetitive, unwanted thoughts OR feel compelled to perform certain behaviors/rituals repeatedly?",
      options: [
        { value: 0, label: "Never or rarely" },
        { value: 1, label: "Occasionally, but I can manage them" },
        { value: 2, label: "Frequently, and they cause distress" },
        { value: 3, label: "Constantly, and they significantly interfere with my life" }
      ]
    },
    {
      id: 4,
      category: "Mood Patterns",
      text: "Do you experience unusual mood patterns, such as extreme mood swings, periods of very high energy followed by very low energy, or racing thoughts?",
      options: [
        { value: 0, label: "No, my mood is generally stable" },
        { value: 1, label: "Occasionally notice some ups and downs" },
        { value: 2, label: "Yes, I have noticeable mood swings or energy shifts" },
        { value: 3, label: "Yes, severe mood episodes that disrupt my life" }
      ]
    },
    {
      id: 5,
      category: "Physical Symptoms",
      text: "Do you experience physical symptoms like rapid heartbeat, muscle tension, restlessness, headaches, or unexplained aches that may be related to stress or anxiety?",
      options: [
        { value: 0, label: "Rarely or never" },
        { value: 1, label: "Occasionally" },
        { value: 2, label: "Frequently" },
        { value: 3, label: "Almost constantly, and they're distressing" }
      ]
    },
    {
      id: 6,
      category: "Relationships and Social Life",
      text: "Have you withdrawn from friends, family, or social activities, or have your relationships been strained due to your mental or emotional state?",
      options: [
        { value: 0, label: "No, my relationships and social life are fine" },
        { value: 1, label: "Minor withdrawal or some tension" },
        { value: 2, label: "Significant withdrawal or relationship problems" },
        { value: 3, label: "Severe isolation or serious relationship damage" }
      ]
    },
    {
      id: 7,
      category: "Coping and Functioning",
      text: "How long have you been experiencing these difficulties, and are your usual coping strategies helping?",
      options: [
        { value: 0, label: "Less than 2 weeks OR not experiencing difficulties" },
        { value: 1, label: "2 weeks to 1 month, some coping strategies help" },
        { value: 2, label: "1-3 months, coping strategies barely help" },
        { value: 3, label: "More than 3 months, nothing seems to help" }
      ]
    }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep('form');
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, value) => sum + value, 0);
  };

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

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Save the score and user data to cookies
    const score = calculateScore();
    const results = getResultsMessage(score);

    // Create cookies with 24-hour expiry
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (24 * 60 * 60 * 1000)); // 24 hours
    const expires = `expires=${expiryDate.toUTCString()}`;

    document.cookie = `mentalHealthScore=${score}; ${expires}; path=/`;
    document.cookie = `riskLevel=${encodeURIComponent(results.level)}; ${expires}; path=/`;
    document.cookie = `userName=${encodeURIComponent(formData.name)}; ${expires}; path=/`;
    document.cookie = `userEmail=${encodeURIComponent(formData.email)}; ${expires}; path=/`;
    document.cookie = `userPhone=${encodeURIComponent(formData.phone)}; ${expires}; path=/`;
    document.cookie = `userLocation=${encodeURIComponent(formData.location)}; ${expires}; path=/`;
    document.cookie = `userMessage=${encodeURIComponent(formData.message)}; ${expires}; path=/`;

    // Prepare form data for submission
    const form = e.target;
    const data = new FormData(form);

    try {
      // Submit to Formester via AJAX
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Redirect to static thank you page
        window.location.href = '/depression-quiz/thankyou.html';
      } else {
        console.error('Form submission failed');
        // Fallback: try to redirect anyway or show error
        window.location.href = '/depression-quiz/thankyou.html';
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Fallback redirect
      window.location.href = '/tms-quiz/thankyou.html';
    }
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // ----------------------------------------------------------------------
  // VIEW: FORM (Gate to Results)
  // ----------------------------------------------------------------------
  if (step === 'form') {
    const score = calculateScore();
    const results = getResultsMessage(score);

    // Prepare detailed quiz answers for Formester
    const quizDetailsText = questions.map((q, index) => {
      const answerValue = answers[q.id];
      const answerLabel = q.options.find(opt => opt.value === answerValue)?.label || 'Not answered';
      return `Q${index + 1}. [${q.category}] ${q.text}\nAnswer: ${answerLabel} (Score: ${answerValue})`;
    }).join('\n\n');

    return (
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Almost Done!
          </h2>
          <p className="text-gray-600">
            Enter your details to view your personalized assessment results.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <form
            acceptCharset='UTF-8'
            action='https://app.formester.com/forms/MLiLrbkHQ/submissions'
            method='POST'
            onSubmit={handleFormSubmit}
            className="p-6 sm:p-8 space-y-5"
          >
            {/* Hidden fields for quiz data */}
            <input type="hidden" name="quiz_score" value={score} />
            <input type="hidden" name="quiz_max_score" value="21" />
            <input type="hidden" name="risk_level" value={results.level} />
            <input type="hidden" name="quiz_details" value={quizDetailsText} />

            {/* Individual question answers for better tracking */}
            {questions.map((q) => {
              const answerValue = answers[q.id];
              const answerLabel = q.options.find(opt => opt.value === answerValue)?.label || 'Not answered';
              return (
                <input
                  key={q.id}
                  type="hidden"
                  name={`question_${q.id}_${q.category.replace(/\s+/g, '_')}`}
                  value={`${answerLabel} (Score: ${answerValue})`}
                />
              );
            })}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleFormChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleFormChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-gray-400 text-xs font-normal ml-1">(Optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                placeholder="(123) 456-7890"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleFormChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                placeholder="Enter your city/state"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Details <span className="text-gray-400 text-xs font-normal ml-1">(Optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleFormChange}
                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none"
                placeholder="Any specific concerns?"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-sm flex items-center justify-center text-lg"
              >
                See My Results
                <SafeIcon icon={FiArrowRight} className="w-5 h-5 ml-2" />
              </button>

              <p className="text-center mt-3 text-xs text-gray-500">
                Your information is secure and confidential.
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }


  // ----------------------------------------------------------------------
  // VIEW: QUIZ QUESTIONS
  // ----------------------------------------------------------------------
  const currentQ = questions[currentQuestion];
  const currentAnswer = answers[currentQ.id];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-teal-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
          {currentQ.category}
        </span>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 leading-relaxed">
          {currentQ.text}
        </h2>

        <div className="space-y-3">
          {currentQ.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(currentQ.id, option.value)}
              className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ${currentAnswer === option.value
                ? 'border-teal-600 bg-teal-50 text-teal-900'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                }`}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center flex-shrink-0 ${currentAnswer === option.value
                  ? 'border-teal-600 bg-teal-600'
                  : 'border-gray-300'
                  }`}>
                  {currentAnswer === option.value && (
                    <SafeIcon icon={FiCheck} className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="font-medium text-sm sm:text-base">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${currentQuestion === 0
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
            }`}
        >
          <SafeIcon icon={FiArrowLeft} className="w-4 h-4 mr-2" />
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={currentAnswer === undefined}
          className={`inline-flex items-center px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${currentAnswer !== undefined
            ? 'bg-teal-700 text-white hover:bg-teal-800'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          {currentQuestion === questions.length - 1 ? 'Next' : 'Next'}
          <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default DepressionScreeningQuiz;