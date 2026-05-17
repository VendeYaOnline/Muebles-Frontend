"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface TimelineProps {
  steps: string[];
  currentStep: number;
}

const Timeline = ({ steps, currentStep }: TimelineProps) => {
  const [animatedStep, setAnimatedStep] = useState(currentStep);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedStep(currentStep), 50);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const progressPercent = ((animatedStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="relative flex justify-between items-center max-w-md mx-auto mb-16">
      {/* Track background */}
      <div className="absolute top-4 left-0 right-0 h-px bg-warm-border" />

      {/* Track progress */}
      <motion.div
        className="absolute top-4 left-0 h-px bg-gold origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progressPercent / 100 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ width: "100%" }}
      />

      {steps.map((step, index) => {
        const isDone = index + 1 < animatedStep;
        const isActive = index + 1 === animatedStep;

        return (
          <div key={step} className="relative z-10 flex flex-col items-center gap-3">
            <motion.div
              animate={{
                backgroundColor: isDone || isActive ? "#b8975a" : "#f9f6f2",
                borderColor: isDone || isActive ? "#b8975a" : "#e8e0d8",
                scale: isActive ? 1.1 : 1,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
            >
              {isDone ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                </motion.div>
              ) : (
                <motion.span
                  animate={{ color: isActive ? "#ffffff" : "#7c6f64" }}
                  className="text-xs"
                  style={{ fontFamily: "var(--font-semibold)" }}
                >
                  {index + 1}
                </motion.span>
              )}
            </motion.div>

            <motion.span
              animate={{
                color: isDone || isActive ? "#1a1714" : "#7c6f64",
              }}
              className="text-xs text-center w-32 leading-snug"
              style={{ fontFamily: isActive ? "var(--font-semibold)" : "var(--font-regular)" }}
            >
              {step}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
