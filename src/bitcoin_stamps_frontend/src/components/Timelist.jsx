import React, { useCallback, useEffect, useState } from "react";
import SidebarWithHeader from "../Sidebar";
import "../index.css";
import { useAuthClient } from "../use-auth-client";
import { createBackendActor, createClient } from "../helper/auth";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../lib/AuthContext";

const Timelist = () => {
  const [timestamps, setTimestamps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useAuth();
  const { identity } = useAuthClient();
  const toast = useToast();

  const fetchTimestamps = useCallback(async () => {
    setIsLoading(true);
    try {
      const authClient = await createClient();
      const actor = await createBackendActor(authClient.getIdentity());
      const response = await actor.get_timestamps();
      setIsLoading(false);
      setTimestamps(response);
    } catch (error) {
      console.error("Failed to fetch timestamps:", error);
      setIsLoading(false);
    }
  }, [identity]);

  useEffect(() => {
    if (!identity) return;
    fetchTimestamps();
  }, [fetchTimestamps, identity]);

  console.log(timestamps);

  return (
    <>
      <SidebarWithHeader />
      <div className="flex flex-col items-center justify-center py-16 bg-black bg-opacity-100 bg-opacity-40 min-h-screen">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center text-white mb-14">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            Timestamps
          </span>
        </h1>

        {isLoading && (
          <Box>
            <Spinner size="xl" color="white" />
          </Box>
        )}

        {!identity && (
          <>
            <h2 className="text-2xl text-white">
              Please login to view timestamps
            </h2>
          </>
        )}

        {timestamps.length === 0 && !isLoading && (
          <h2 className="text-2xl text-white">No timestamps found</h2>
        )}

        {/* Timestamps List */}
        {timestamps && timestamps.length > 0 && (
          <div className="w-full mt-16 px-4 sm:px-8 md:px-16">
            <div className="flex flex-wrap justify-center gap-8">
              {timestamps.map((timestamp, index) => (
                <Box key={index}>
                  <Card rounded="md" overflow={"hidden"}>
                    <CardHeader bg={"ButtonFace"}>
                      <h3 className="text-xl mb-2">{timestamp.name}</h3>
                    </CardHeader>
                    <CardBody>
                      <p className="text-lg text-black">
                        {new Date(
                          parseInt(timestamp.time) / 1000000
                        ).toDateString()}
                      </p>
                      <p className="text-lg text-black">
                        TxID: {timestamp.txid.slice(0, 20)}...
                      </p>
                    </CardBody>
                    <CardFooter bg={"blackAlpha.100"}>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(timestamp.txid);
                          toast({
                            title: "Copied!",
                            status: "success",
                            duration: 2000,
                            isClosable: true,
                          });
                        }}
                      >
                        Copy TxID
                      </Button>
                    </CardFooter>
                  </Card>
                </Box>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Timelist;
