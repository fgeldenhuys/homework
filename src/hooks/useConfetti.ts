"use client";

import { useCallback } from "react";
import confetti from "canvas-confetti";

export function useConfetti() {
  const fireConfetti = useCallback(() => {
    // Center burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff9f45"],
    });

    // Left cannon
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ["#ff6b6b", "#ffd93d", "#6bcb77"],
    });

    // Right cannon
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ["#4d96ff", "#ff9f45", "#6bcb77"],
    });
  }, []);

  const fireStars = useCallback(() => {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ["#FFD700", "#FFA500", "#FF6347", "#FFE135"],
    };

    confetti({
      ...defaults,
      particleCount: 30,
      scalar: 1.2,
      shapes: ["star"],
    });

    confetti({
      ...defaults,
      particleCount: 20,
      scalar: 0.75,
      shapes: ["circle"],
    });
  }, []);

  const fireBigCelebration = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
        colors: ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff9f45"],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return { fireConfetti, fireStars, fireBigCelebration };
}
