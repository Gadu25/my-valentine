"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { ImagePlaceholder } from "@/lib/placeholder-images";

type InitialScreenProps = {
  onYesClick: () => void;
  images: ImagePlaceholder[];
};

export function InitialScreen({ onYesClick, images }: InitialScreenProps) {
  const [noCount, setNoCount] = useState(0);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [noButtonPosition, setNoButtonPosition] = useState<
    { top: number; left: number } | undefined
  >(undefined);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const getCurrentImage = () => {
    if (noCount < 2) return images[0];
    if (noCount < 4) return images[1];
    if (noCount < 6) return images[2];
    return images[3];
  };

  const currentImage = getCurrentImage();

  const handleNoInteraction = () => {
    setNoCount((prev) => prev + 1);
    setYesButtonScale((prev) => prev + 0.1);

    if (noButtonRef.current) {
      const button = noButtonRef.current;
      const newX = Math.random() * (window.innerWidth - button.offsetWidth);
      const newY = Math.random() * (window.innerHeight - button.offsetHeight);
      setNoButtonPosition({ top: newY, left: newX });
    }
  };

  const getYesButtonText = () => {
    const texts = [
      "YES ❤️", "Please? ❤️", "Pretty please? ❤️", 
      "I'm begging! ❤️", "Just click it! ❤️", "You know you want to...",
      "Say yes!", "I'll be sad...", "One last chance..."
    ];
    return texts[Math.min(noCount, texts.length - 1)];
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      {images.map((image) => (
        image && (
          <Image
            key={image.id}
            src={image.imageUrl}
            alt={image.description}
            data-ai-hint={image.imageHint}
            fill
            className={`object-cover transition-opacity duration-1000 ${
              currentImage && currentImage.id === image.id ? "opacity-100" : "opacity-0"
            }`}
            quality={100}
            priority
          />
        )
      ))}

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white font-headline drop-shadow-lg animate-fade-in-up">
          Will you be my Valentine?
        </h1>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={onYesClick}
            className="text-lg px-8 py-6 h-auto transition-transform duration-300"
            style={{ transform: `scale(${yesButtonScale})` }}
            size="lg"
          >
            {getYesButtonText()}
          </Button>

          <div className="w-[130px] h-[60px]">
            <Button
              ref={noButtonRef}
              onClick={handleNoInteraction}
              onPointerEnter={handleNoInteraction}
              className="text-lg px-8 py-6 h-auto w-full transition-all duration-300"
              variant="destructive"
              size="lg"
              style={
                noButtonPosition
                  ? { position: "fixed", top: noButtonPosition.top, left: noButtonPosition.left }
                  : { position: "relative" }
              }
            >
              NO 🙅
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
