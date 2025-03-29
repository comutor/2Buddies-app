import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Car, MapPin, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface JourneyMapProps {
  from: string;
  to: string;
  duration?: number; // in minutes
  status?: "waiting" | "active" | "completed";
  progress?: number; // 0 to 100
}

export default function JourneyMap({
  from,
  to,
  duration = 30,
  status = "waiting",
  progress = 0,
}: JourneyMapProps) {
  const [currentProgress, setCurrentProgress] = useState(progress);

  // Simulate real-time progress updates when status is active
  useEffect(() => {
    if (status === "active" && currentProgress < 100) {
      const interval = setInterval(() => {
        setCurrentProgress((prev) => {
          const newProgress = Math.min(prev + 1, 100);
          return newProgress;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [status, currentProgress]);

  // Calculate estimated time remaining
  const timeRemaining = Math.ceil((duration * (100 - currentProgress)) / 100);

  return (
    <Card className="p-4 relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 z-0"
        style={{
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))"
        }}
      />
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Journey Progress</h3>
          <div className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">
            {status === "waiting" && "Waiting to start"}
            {status === "active" && "In progress"}
            {status === "completed" && "Completed"}
          </div>
        </div>

        {/* Map visualization */}
        <div className="my-6 relative">
          {/* Journey line */}
          <div className="absolute left-6 top-0 w-0.5 h-full bg-muted z-0" />
          
          {/* Progress overlay */}
          <div 
            className="absolute left-6 top-0 w-0.5 bg-blue-500 z-10 transition-all duration-300" 
            style={{height: `${currentProgress}%`}}
          />

          {/* Starting point */}
          <div className="flex items-center relative z-20 mb-8">
            <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-blue-500" />
            </div>
            <div className="ml-4">
              <div className="text-sm text-muted-foreground">From</div>
              <div className="font-medium">{from}</div>
            </div>
          </div>

          {/* Animated car on the journey */}
          <AnimatePresence>
            {status === "active" && (
              <motion.div 
                className="absolute left-6 z-30 flex items-center"
                initial={{ y: 0 }}
                animate={{ y: `${currentProgress}%` }}
                transition={{ type: "spring", damping: 20 }}
                style={{ transform: `translateX(-50%) translateY(${currentProgress}%)` }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [-5, 5, -5, 5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <Car className="h-5 w-5 text-white" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Destination point */}
          <div className="flex items-center relative z-20">
            <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
              <Navigation className="h-6 w-6 text-blue-500" />
            </div>
            <div className="ml-4">
              <div className="text-sm text-muted-foreground">To</div>
              <div className="font-medium">{to}</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-muted/30 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Progress</div>
            <div className="flex items-center">
              <div className="text-xl font-medium">{Math.round(currentProgress)}%</div>
              <div className="w-full bg-muted h-1.5 rounded-full ml-3">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full transition-all duration-300" 
                  style={{ width: `${currentProgress}%` }}
                />
              </div>
            </div>
          </div>
          <div className="bg-muted/30 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">
              {status === "completed" ? "Journey Duration" : "Est. Time Remaining"}
            </div>
            <div className="text-xl font-medium">
              {status === "completed" 
                ? `${duration} min` 
                : `${timeRemaining} min`
              }
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}