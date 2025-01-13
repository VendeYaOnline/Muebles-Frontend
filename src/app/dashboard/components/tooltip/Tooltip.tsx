import React, { useState, useRef, useEffect, ReactNode } from "react";
import { Info } from "lucide-react";

interface TooltipProps {
  text: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAbove, setIsAbove] = useState(true);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePosition = () => {
      if (containerRef.current && tooltipRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const spaceAbove = containerRect.top;
        const spaceBelow = window.innerHeight - containerRect.bottom;

        setIsAbove(spaceAbove > spaceBelow || spaceBelow < tooltipRect.height);
      }
    };

    if (isVisible) {
      handlePosition();
      window.addEventListener("scroll", handlePosition);
      window.addEventListener("resize", handlePosition);
    }

    return () => {
      window.removeEventListener("scroll", handlePosition);
      window.removeEventListener("resize", handlePosition);
    };
  }, [isVisible]);

  return (
    <div className="relative inline-block" ref={containerRef}>
      <div
        className="flex items-center cursor-pointer"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <Info className="text-gray-500" size={13} />
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-10 px-3 py-2 text-sm text-white bg-gray-800 rounded-md shadow-lg transition-opacity duration-300 ease-in-out min-w-[200px]
            ${isAbove ? "bottom-full mb-2" : "top-full mt-2"}
            left-1/2 transform -translate-x-1/2`}
        >
          {text}
          <div
            className={`absolute w-2 h-2 bg-gray-800 transform rotate-45
              ${isAbove ? "bottom-[-4px]" : "top-[-4px]"}
              left-1/2 -translate-x-1/2`}
          ></div>
        </div>
      )}
    </div>
  );
};
