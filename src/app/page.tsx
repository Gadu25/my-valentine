"use client";

import { useState, useEffect } from "react";
import { InitialScreen } from "@/components/valentine/InitialScreen";
import { LoadingScreen } from "@/components/valentine/LoadingScreen";
import { FinalScreen } from "@/components/valentine/FinalScreen";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Skeleton } from "@/components/ui/skeleton";

type AppState = "initial" | "loading" | "final";

export default function ValentinePage() {
  const [appState, setAppState] = useState<AppState>("initial");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-screen h-screen bg-background flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  const faceImages = [
    PlaceHolderImages.find((img) => img.id === "face1")!,
    PlaceHolderImages.find((img) => img.id === "face2")!,
    PlaceHolderImages.find((img) => img.id === "face3")!,
    PlaceHolderImages.find((img) => img.id === "face4")!,
  ].filter(Boolean);

  const happyImage = PlaceHolderImages.find((img) => img.id === "face_happy")!;

  const renderScreen = () => {
    switch (appState) {
      case "initial":
        return (
          <InitialScreen
            onYesClick={() => setAppState("loading")}
            images={faceImages}
          />
        );
      case "loading":
        return <LoadingScreen onLoadingComplete={() => setAppState("final")} />;
      case "final":
        return <FinalScreen happyImage={happyImage} />;
      default:
        return null;
    }
  };

  return <main className="bg-background">{renderScreen()}</main>;
}
