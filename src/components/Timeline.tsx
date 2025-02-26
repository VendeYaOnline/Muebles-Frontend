import { useEffect, useState } from "react";

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

  return (
    <div className="flex justify-between items-center relative mb-10 mx-10">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`z-20 w-9 h-9 rounded-full flex justify-center flex-col items-center relative mb-3 ${
            index < animatedStep
              ? "bg-indigo-500 text-white"
              : "bg-gray-200 text-white"
          }`}
        >
          {index + 1}

          <span className="text-black absolute top-10 font-bold text-center w-[150px]">
            {step}
          </span>
        </div>
      ))}

      <div
        style={{
          width: "100%",
        }}
        className="bg-gray-200 rounded-lg absolute transition-all duration-500 ease-in-out h-1 bottom-7"
      />
      <div
        style={{
          width: currentStep === 1 ? "0%" : "100%",
        }}
        className="bg-indigo-600 rounded-lg absolute transition-all duration-500 ease-in-out h-1 bottom-7"
      />
    </div>
  );
};

export default Timeline;
