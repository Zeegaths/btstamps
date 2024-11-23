import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correct import for useNavigate
import "../../src/index.css";
import seal from '../../public/seal-a.png';
import snap from '../../public/snap-a.png';

function Landing() {
  const [animateImage, setAnimateImage] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Trigger animation once component mounts
  useEffect(() => {
    setAnimateImage(true);
  }, []);

  // Redirect to upload page when button is clicked
  const handleCreateTimestamp = () => {
    navigate('/upload'); // Navigate to upload page
  };
  const handleAboutUs = () => {
    navigate('/about'); // Navigate to upload page
  };


  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Header without background */}
      <header className="flex justify-between items-center p-6 text-pink-500">
        <div className="text-xl font-semibold">btstamps</div>
        <div className="text-sm">Bitcoin Timestamps</div>
      </header>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center py-16 space-y-24 relative z-10 text-center">
        {/* Title Section */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 font-extrabold text-center leading-tight max-w-3xl relative z-20">
          Timestamp{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 animate-fadeText">
            Legal Documents
          </span>
        </h1>

        {/* Seal image behind text (blinking effect) */}
        <img
          src={seal}
          alt="Seal"
          className="absolute top-[10px] w-[3%] sm:w-3% md:w-[3%] lg:w-[25%] opacity-30 z-0"
        />

        {/* Snap image (slider animation) */}
        <img
          src={snap}
          alt="Snap"
          className={`absolute top-[230px] right-30 w-[40%] sm:w-[60%] md:w-[55%] lg:w-[20%] h-[40%] object-cover opacity-70 z-0 transform transition-all duration-1000 ease-in-out ${animateImage ? 'animate-slide' : ''}`}
        />

        {/* Navbar Buttons */}
        <div className="flex flex-col justify-space-between sm:flex-row sm:space-x-96">
          <button
            onClick={handleCreateTimestamp}
            className="bg-transparent px-6 py-3 sm:px-6 sm:py-3 rounded-full text-xl sm:text-lg font-semibold border-2 border-white hover:bg-pink-500 transition-all duration-300 ease-in-out">
            CREATE TIMESTAMP
          </button>
          <button
            onClick={handleAboutUs}
            className="bg-transparent px-6 py-3 sm:px-6 sm:py-3 rounded-full text-xl sm:text-lg font-semibold border-2 border-white hover:bg-pink-500 to-pink-300 transition-all duration-300 ease-in-out">
            EDUCATE ME, PLEASE
          </button>
        </div>

        {/* Stats Section with Transparency */}
        <div className="flex flex-col sm:flex-row items-center justify-center pt-80 pb-40 space-x-8 sm:space-x-8 mt-8">
          <div className="flex flex-col items-center bg-teal-500 bg-opacity-20 backdrop-blur-md px-10 py-6 rounded-lg w-80">
            <div className="text-lg">Current Speed</div>
            <div className="text-4xl font-bold">10 Tps</div>
          </div>

          <div className="flex flex-col items-center bg-teal-500 bg-opacity-20 backdrop-blur-md px-10 py-6 rounded-lg w-80">
            <div className="text-lg">Fees</div>
            <div className="text-4xl font-bold">0.05%</div>
          </div>

          <div className="flex flex-col items-center bg-teal-500 bg-opacity-20 backdrop-blur-md px-10 py-6 rounded-lg w-80">
            <div className="text-lg">Total Timestamps</div>
            <div className="text-4xl font-bold">24,542</div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex justify-between items-center px-12 py-8 w-full bg-black bg-opacity-60 text-white absolute bottom-0 z-20">
          <div className="flex-1 text-center">Want 0% Commission Forever?</div>
          <div className="flex space-x-8 justify-center">
            <button className="hover:underline text-white">Tell me more</button>
            <button className="bg-transparent hover:underline text-white">Buy a Dronie NFT on Magic Eden</button>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Landing;
