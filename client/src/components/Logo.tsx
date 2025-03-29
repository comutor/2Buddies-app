import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        {/* Car with people */}
        <path
          d="M90,50 Q90,35 75,35 H25 Q10,35 10,50 V65 Q10,70 15,70 H20 Q25,70 25,65 V60 H75 V65 Q75,70 80,70 H85 Q90,70 90,65 V50 Z"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Wheels */}
        <circle cx="25" cy="70" r="8" stroke="currentColor" strokeWidth="5" fill="none" />
        <circle cx="75" cy="70" r="8" stroke="currentColor" strokeWidth="5" fill="none" />
        {/* Person 1 */}
        <circle cx="35" cy="45" r="8" stroke="currentColor" strokeWidth="5" fill="none" />
        {/* Person 2 */}
        <circle cx="65" cy="45" r="8" stroke="currentColor" strokeWidth="5" fill="none" />
      </svg>
      
      {showText && (
        <div className="flex items-center">
          <span className="text-blue-500 font-bold text-xl">2</span>
          <span className="font-bold text-xl">Buddies</span>
        </div>
      )}
    </div>
  );
}