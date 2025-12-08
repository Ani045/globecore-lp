import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import QuizSection from './components/QuizSection';
import ResultsPage from './components/ResultsPage';
import Footer from './components/Footer';
import './App.css';

function App() {
  const scrollToBooking = () => {
    const bookingElement = document.getElementById('booking-section');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={
          <>
            <Header onBookConsultation={scrollToBooking} />
            <QuizSection />
            <Footer />
          </>
        } />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;