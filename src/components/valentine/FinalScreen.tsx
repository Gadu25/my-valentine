"use client";

import Image from "next/image";
import { Confetti } from "./Confetti";
import { Card, CardContent } from "@/components/ui/card";


export function FinalScreen() {
  const happyImage = "/images/happy-valentines.webp";

  return (
    <div className="relative w-screen h-screen flex items-center justify-center">
      {happyImage && (
        <Image
          src={happyImage}
          alt="happy valentines"
          data-ai-hint="happy portrait"
          fill
          className="object-cover"
          quality={100}
        />
      )}
      <div className="absolute inset-0 bg-black/30" />
      <Confetti />
      <div className="relative z-10 text-center text-white animate-fade-in-up p-4">
        <Card className="bg-white/30 backdrop-blur-md border-white/20">
          <CardContent className="p-8 sm:p-12">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-headline drop-shadow-lg">
              YAY ❤️ Thank you!
            </h1>
            <p className="mt-4 text-lg sm:text-xl md:text-2xl drop-shadow">
              You just made me the happiest person alive.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
