import React, { useState } from 'react';
import SidebarWithHeader from '../Sidebar';
import '../index.css';

const Timelist = () => {
  const [file, setFile] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const timestamps = [
    { image: '/wood.png', name: 'Timestamp 1', date: '2024-11-01', width: '10px', height: '10px' },
    { image: '/wood.png', name: 'Timestamp 2', date: '2024-11-02', width: '200px', height: '200px' },
    { image: '/wood.png', name: 'Timestamp 3', date: '2024-11-03', width: '200px', height: '200px' },
  ];
  
  return (
    <>
      <SidebarWithHeader />
      <div className="flex flex-col items-center justify-center py-16 bg-black bg-opacity-100 bg-opacity-40 min-h-screen">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center text-white mb-14">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Timestamps</span>
        </h1>

        {/* Timestamps List */}
        <div className="w-full mt-16 px-4 sm:px-8 md:px-16">
          <div className="flex flex-wrap justify-center gap-8">
            {timestamps.map((timestamp, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-black bg-opacity-10 backdrop-blur-md p-6 rounded-lg w-full sm:w-64 md:w-80">
                <img
                  src={timestamp.image}
                  alt={timestamp.name}
                  className="w-full h-70 object-cover mb-4 rounded-lg"
                />
                <h3 className="text-xl text-white mb-2">{timestamp.name}</h3>
                <p className="text-lg text-black">{timestamp.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Timelist;
