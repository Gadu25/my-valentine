"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

const messages = [
  "Checking compatibility...",
  "Analyzing cuteness levels...",
  "Securing heart connection...",
  "Finalizing love protocol...",
  "Preparing for a lifetime of happiness...",
];

type LoadingScreenProps = {
  onLoadingComplete: () => void;
};

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessage((prevMessage) => {
        const currentIndex = messages.indexOf(prevMessage);
        return messages[(currentIndex + 1) % messages.length];
      });
    }, 1000);

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 2.5; // Fills in 4 seconds
      });
    }, 100);

    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 5000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 text-center">
      <div className="max-w-md w-full">
        <h2 className="text-2xl sm:text-3xl font-bold font-headline text-primary">
          Processing Valentine Request...
        </h2>
        <p className="mt-4 text-muted-foreground animate-pulse h-6">{message}</p>
        <Progress value={progress} className="w-full mt-8" />
      </div>
    </div>
  );
}
