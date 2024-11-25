import React, { useState } from "react";
import SidebarWithHeader from "../Sidebar";
import "../index.css";
import { Button, useToast } from "@chakra-ui/react";
import { createBackendActor, createClient } from "../helper/auth";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [timestampName, setTimestampName] = useState(""); // State for timestamp name
  const [isLoading, setIsLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  // Handle timestamp name change
  const handleNameChange = (event) => {
    setTimestampName(event.target.value);
  };

  const toast = useToast();

  const createTimestamp = async (name, hash) => {
    const authClient = await createClient();
    const actor = await createBackendActor(authClient.getIdentity());
    const response = await actor.create_timestamp({
      name,
      data: hash,
    });
    toast({
      title: "Success",
      description: `Timestamp created successfully. TXID: ${response}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  // Handle file upload and create timestamp (add your logic here)
  const handleCreateTimestamp = async () => {
    if (file && timestampName) {
      // alert(`File uploaded: ${file.name}\nTimestamp Name: ${timestampName}`);
      // Add logic to handle file (e.g., save it or create timestamp)
      const reader = new FileReader();
      reader.onload = async (event) => {
        setIsLoading(true);
        const data = event.target.result;
        const hash = await crypto.subtle.digest("SHA-256", new Uint8Array(data));
        const hashArray = Array.from(new Uint8Array(hash));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        console.log("Hash:", hashHex);
        try {
          await createTimestamp(timestampName, hashHex);
        } catch (error) {
          console.error("Failed to create timestamp:", error);
        }
        setIsLoading(false);
      };
      reader.readAsArrayBuffer(file);
      console.log("File uploaded:", file.name);
    } else {
      // alert('Please select a file and provide a name for the timestamp.');
      toast({
        title: "Error",
        description:
          "Please select a file and provide a name for the timestamp.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <SidebarWithHeader />
      <div className="flex flex-col items-center justify-center py-16 bg-black bg-opacity-50 min-h-screen">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center text-white mb-14">
          Upload Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            File
          </span>
        </h1>

        {/* File upload section with glass-like effect */}
        <div className="flex flex-col items-center justify-center p-14 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 xl:w-1/3 bg-white bg-opacity-10 backdrop-blur-md">
          <div className="flex flex-col items-center mb-4">
            {/* File Input */}
            <input
              type="file"
              onChange={handleFileChange}
              className="mb-4 px-4 py-2 rounded-lg border-2 border-gray-300"
            />

            <p className="text-lg text-black">
              Select a file to create a timestamp.
            </p>
          </div>

          {/* Timestamp Name Input */}
          <div className="flex flex-col items-center mb-4">
            <input
              type="text"
              value={timestampName}
              onChange={handleNameChange}
              placeholder="Enter Timestamp Name"
              className="px-4 py-2 rounded-lg border-2 border-black mb-4 w-full text-center"
            />
            <p className="text-lg text-black">
              Enter a name for the timestamp.
            </p>
          </div>

          {/* Create Timestamp Button */}
          <Button
            onClick={handleCreateTimestamp}
            isLoading={isLoading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-full text-xl font-semibold text-white hover:bg-pink-600 w-full mt-6"
          >
            Create Timestamp
          </Button>
        </div>

        {/* Optional file name display */}
        {file && (
          <div className="mt-6 text-white">
            <p className="text-lg">Selected File: {file.name}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Upload;
