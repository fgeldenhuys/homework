"use client";

import { useCallback, useRef, useEffect } from "react";

export function useSoundEffects() {
  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const wrongAudioRef = useRef<HTMLAudioElement | null>(null);
  const celebrationAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio elements on client side
    if (typeof window !== "undefined") {
      correctAudioRef.current = new Audio("/sounds/correct.mp3");
      correctAudioRef.current.volume = 0.5;

      wrongAudioRef.current = new Audio("/sounds/wrong.mp3");
      wrongAudioRef.current.volume = 0.3;

      celebrationAudioRef.current = new Audio("/sounds/celebration.mp3");
      celebrationAudioRef.current.volume = 0.5;
    }
  }, []);

  const playCorrect = useCallback(() => {
    if (correctAudioRef.current) {
      correctAudioRef.current.currentTime = 0;
      correctAudioRef.current.play().catch(() => {
        // Ignore errors if sound file is missing
      });
    }
  }, []);

  const playWrong = useCallback(() => {
    if (wrongAudioRef.current) {
      wrongAudioRef.current.currentTime = 0;
      wrongAudioRef.current.play().catch(() => {
        // Ignore errors if sound file is missing
      });
    }
  }, []);

  const playCelebration = useCallback(() => {
    if (celebrationAudioRef.current) {
      celebrationAudioRef.current.currentTime = 0;
      celebrationAudioRef.current.play().catch(() => {
        // Ignore errors if sound file is missing
      });
    }
  }, []);

  return {
    playCorrect,
    playWrong,
    playCelebration,
  };
}
