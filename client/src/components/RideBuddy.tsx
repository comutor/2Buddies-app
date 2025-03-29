import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

interface RideBuddyProps {
  userName?: string;
  page?: string;
  onClose?: () => void;
}

type TipType = {
  id: number;
  message: string;
  page: string;
};

export default function RideBuddy({ 
  userName = "buddy", 
  page = "home",
  onClose 
}: RideBuddyProps) {
  const [showBubble, setShowBubble] = useState(false);
  const [currentTip, setCurrentTip] = useState<TipType | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  // Collection of tips based on different pages
  const tips: TipType[] = [
    { id: 1, message: "Welcome to 2Buddies! Need a ride? Create or request one from the Rides tab.", page: "home" },
    { id: 2, message: "Pro tip: Add all your details to make ride matching easier!", page: "home" },
    { id: 3, message: "Looking for a specific destination? Try the search function in Discover.", page: "home" },
    
    { id: 4, message: "Find rides based on destination, date, or available seats.", page: "discover" },
    { id: 5, message: "Filter results to find the perfect ride match for your needs.", page: "discover" },
    
    { id: 6, message: "Offering a ride? Make sure to specify how many seats you have available.", page: "rides" },
    { id: 7, message: "Need a ride? Add your preferred departure time to find better matches.", page: "rides" },
    { id: 8, message: "Remember to provide accurate pickup and dropoff locations!", page: "rides" },
    
    { id: 9, message: "Keep your profile updated for better ride matches!", page: "account" },
    { id: 10, message: "You can track your ride history from your account page.", page: "account" },
  ];

  // Filter tips based on current page
  const pageSpecificTips = tips.filter((tip) => tip.page === page);

  // Show a random tip when component mounts or page changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * pageSpecificTips.length);
      setCurrentTip(pageSpecificTips[randomIndex] || tips[0]);
      setShowBubble(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [page]);

  // Auto-hide the bubble after some time
  useEffect(() => {
    if (showBubble) {
      const timer = setTimeout(() => {
        setShowBubble(false);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [showBubble]);

  // Show a new tip
  const showNewTip = () => {
    setShowBubble(false);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * pageSpecificTips.length);
      setCurrentTip(pageSpecificTips[randomIndex] || tips[0]);
      setShowBubble(true);
    }, 300);
  };

  // Toggle the minimized state
  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
    if (isMinimized) {
      showNewTip();
    } else {
      setShowBubble(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <AnimatePresence>
        {showBubble && !isMinimized && currentTip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-2 bg-blue-500 text-white p-3 rounded-lg rounded-br-none max-w-[260px] shadow-lg"
          >
            <div className="flex justify-between items-start mb-1">
              <div className="font-medium">Ride Buddy</div>
              <button 
                onClick={() => setShowBubble(false)} 
                className="text-blue-100 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm">{currentTip.message}</p>
            <div className="absolute bottom-0 right-0 transform translate-y-2 w-4 h-4 bg-blue-500 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={toggleMinimized}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        >
          {!isMinimized ? (
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Simple car mascot face */}
                <circle cx="50" cy="50" r="40" fill="currentColor" />
                <circle cx="35" cy="40" r="5" fill="white" />
                <circle cx="65" cy="40" r="5" fill="white" />
                <path d="M35 65 Q50 75 65 65" stroke="white" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </motion.div>
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </button>
      </motion.div>
    </div>
  );
}