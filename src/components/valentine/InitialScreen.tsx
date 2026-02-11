"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type InitialScreenProps = {
  onYesClick: () => void;
};

export function InitialScreen({ onYesClick }: InitialScreenProps) {
  const [noCount, setNoCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState<
    { top: number; left: number } | undefined
  >(undefined);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const cursorPositionRef = useRef({ x: 0, y: 0 });

  const images = [
    {
      id: "1",
      imageUrl: "/images/valentine-1.jpg",
      description: "Valentine background 1",
    },
    {
      id: "2",
      imageUrl: "/images/valentine-2.jpg",
      description: "Valentine background 2",
    },
    {
      id: "3",
      imageUrl: "/images/valentine-3.jpg",
      description: "Valentine background 3",
    },
    {
      id: "4",
      imageUrl: "/images/valentine-4.jpg",
      description: "Valentine background 4",
    },
  ];

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      cursorPositionRef.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);


  useEffect(() => {
    // We get the button's initial position and set it.
    // This makes it a "fixed" element from the start, allowing smooth transitions.
    if (noButtonRef.current && !noButtonPosition) {
      const rect = noButtonRef.current.getBoundingClientRect();
      setNoButtonPosition({ top: rect.top, left: rect.left });
    }
  }, [noButtonPosition]);

  const getCurrentImage = () => {
    if (noCount < 2) return images[0];
    if (noCount < 4) return images[1];
    if (noCount < 6) return images[2];
    return images[3];
  };

  const currentImage = getCurrentImage();

  const handleNoInteraction = () => {
    setNoCount((prev) => prev + 1);

    if (noButtonRef.current) {
      const button = noButtonRef.current;
      const buttonWidth = button.offsetWidth;
      const buttonHeight = button.offsetHeight;
      const { x: cursorX, y: cursorY } = cursorPositionRef.current;

      let newX = 0;
      let newY = 0;
      let isOverlapping = true;
      let attempts = 0;

      while (isOverlapping && attempts < 20) {
        newX = Math.random() * (window.innerWidth - buttonWidth);
        newY = Math.random() * (window.innerHeight - buttonHeight);

        // Check for overlap with cursor
        const overlapsX = cursorX >= newX && cursorX <= newX + buttonWidth;
        const overlapsY = cursorY >= newY && cursorY <= newY + buttonHeight;

        isOverlapping = overlapsX && overlapsY;
        attempts++;
      }
      setNoButtonPosition({ top: newY, left: newX });
    }
  };

  const getYesButtonText = () => {
    const texts = [
      "YES ❤️", "Luh? ❤️", "please? ❤️", 
      "Maawa ka! ❤️", "Just click it! ❤️", "You know you want to 😉",
      "Say yes!😭", "I'll be sad...😟", "grabe ka ha! 😡"
    ];
    return texts[Math.min(noCount, texts.length - 1)];
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      {images.map((image) => (
        <Image
          key={image.id}
          src={image.imageUrl}
          alt={image.description}
          fill
          className={`object-cover transition-opacity duration-1000 ${
            currentImage.id === image.id ? "opacity-100" : "opacity-0"
          }`}
          quality={100}
          priority
        />
      ))}

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white font-headline drop-shadow-lg animate-fade-in-up">
          Will you be my Valentine?
        </h1>

        <div className="mt-8 flex items-center justify-center gap-6">
          <Button
            onClick={onYesClick}
            className="text-lg px-6 py-4 h-auto"
            size="lg"
          >
            {getYesButtonText()}
          </Button>

          {noButtonPosition && (
            <Button
              className="text-lg px-6 py-4 h-auto transition-all duration-300 w-[100px] opacity-0 z-0"
              variant="destructive"
              size="lg"
            >
              ...
            </Button>
          )}

          <Button
            ref={noButtonRef}
            onClick={handleNoInteraction}
            onPointerEnter={handleNoInteraction}
            className="text-lg px-6 py-4 h-auto transition-all duration-300 w-[100px] z-1"
            variant="destructive"
            size="lg"
            style={
              noButtonPosition
                ? { position: "fixed", top: noButtonPosition.top, left: noButtonPosition.left }
                : { position: "relative", opacity: 0 }
            }
          >
            NO 🙅
          </Button>
        </div>
      </div>
    </div>
  );
}
