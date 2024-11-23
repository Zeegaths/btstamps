import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AboutUs = () => {
  const navigate = useNavigate(); // Initialize navigate

  // Handle back navigation
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-8">
      {/* Title Section */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-white mb-6">
        About Us
      </h1>

      {/* Information Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-lg sm:text-xl text-gray-300">
          Welcome to our platform! We specialize in providing innovative solutions for secure and
          verifiable timestamps, enabling you to protect the integrity of your important documents and assets.
          Whether you need to timestamp legal documents, digital media, or any other file, we offer
          a seamless experience to ensure your records are protected with the highest level of security.
        </p>
      </div>

      {/* Key Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex flex-col items-center bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl text-teal-500 font-semibold mb-4">Security</h2>
          <p className="text-lg text-gray-300">
            Our platform uses advanced cryptographic techniques to ensure that every timestamp is immutable and secure.
          </p>
        </div>

        <div className="flex flex-col items-center bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl text-teal-500 font-semibold mb-4">Efficiency</h2>
          <p className="text-lg text-gray-300">
            Timestamping is done quickly and easily, allowing you to focus on your work without worrying about delays.
          </p>
        </div>

        <div className="flex flex-col items-center bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl text-teal-500 font-semibold mb-4">Transparency</h2>
          <p className="text-lg text-gray-300">
            Our transparent process lets you track and verify timestamps anytime, ensuring peace of mind.
          </p>
        </div>

        <div className="flex flex-col items-center bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl text-teal-500 font-semibold mb-4">API</h2>
          <p className="text-lg text-gray-300">
            Integrate our SDK in your project
          </p>
        </div>

        <div className="flex flex-col items-center bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl text-teal-500 font-semibold mb-4">Github</h2>
          <p className="text-lg text-gray-300">
            Access our codebase on github
          </p>
        </div>
      </div>

      {/* Footer or Additional Information */}
      <div className="mt-12 text-center">
        <p className="text-lg text-gray-300">
          Join us today and start protecting your important files with our timestamping solutions.
        </p>
      </div>

      {/* Back Arrow Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleGoBack}
          className="bg-transparent text-teal-500 hover:text-teal-300 text-xl font-semibold border-2 border-teal-500 px-4 py-2 rounded-full flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
