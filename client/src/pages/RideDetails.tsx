import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { 
  ArrowLeft, User, MapPin, Calendar, Clock, 
  Users, DollarSign, MessageCircle, Share, Phone
} from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JourneyMap from "@/components/JourneyMap";

interface RideDetailsProps {
  params: {
    id: string;
  };
}

// Demo ride data (in a real app, this would come from a backend API)
const RIDE = {
  id: "123",
  driver: {
    name: "Alex Johnson",
    rating: 4.8,
    avatar: null,
    phone: "555-123-4567"
  },
  from: "North Campus",
  to: "Downtown Library",
  date: "Today",
  time: "3:30 PM",
  status: "active", // "waiting" | "active" | "completed"
  progress: 35, // 0-100
  seats: 3,
  price: 5,
  description: "Regular ride from campus to downtown. Usually takes around 25 minutes. I have space for backpacks in the trunk.",
  tags: ["Quick Ride", "Student Only"],
  passengers: [
    { name: "Taylor Smith", avatar: null },
    { name: "Jordan Lee", avatar: null }
  ]
};

export default function RideDetails({ params }: RideDetailsProps) {
  const [, setLocation] = useLocation();
  const [showAnimation, setShowAnimation] = useState(false);
  
  useEffect(() => {
    // Show animation after a short delay
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setLocation("/discover")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Ride Details</h1>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-blue-500 text-white text-xl">
                {getInitials(RIDE.driver.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-1 flex-grow">
              <h2 className="text-xl font-bold">{RIDE.driver.name}</h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  Driver
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  {RIDE.driver.rating} rating
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button size="sm" variant="outline" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                Message
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <Phone className="h-4 w-4" />
                Call
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {/* Ride Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Ride Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">From</div>
                    <div className="font-medium flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                      {RIDE.from}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">To</div>
                    <div className="font-medium flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                      {RIDE.to}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Date</div>
                    <div className="font-medium flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                      {RIDE.date}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Time</div>
                    <div className="font-medium flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-blue-500" />
                      {RIDE.time}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Price</div>
                    <div className="font-medium flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                      ${RIDE.price}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Available Seats</div>
                    <div className="font-medium flex items-center">
                      <Users className="h-4 w-4 mr-1 text-blue-500" />
                      {RIDE.seats} seats
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1 mt-2">
                  <div className="text-sm text-muted-foreground">Description</div>
                  <p>{RIDE.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {RIDE.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Tabs for additional info */}
              <Tabs defaultValue="passengers" className="mt-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="passengers">Passengers</TabsTrigger>
                  <TabsTrigger value="questions">Q&A</TabsTrigger>
                </TabsList>
                
                <TabsContent value="passengers" className="space-y-4">
                  <div className="space-y-3">
                    {RIDE.passengers.map((passenger, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-muted">
                            {getInitials(passenger.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{passenger.name}</div>
                          <div className="text-sm text-muted-foreground">Passenger</div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-4">
                      <Button className="w-full">Join This Ride</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="questions" className="space-y-4">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No questions yet. Be the first to ask!</p>
                    <Button>Ask a Question</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-6">
              {/* Journey Map with animations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <JourneyMap 
                  from={RIDE.from} 
                  to={RIDE.to} 
                  status={RIDE.status as any}
                  progress={showAnimation ? RIDE.progress : 0}
                />
              </motion.div>
              
              {/* Status card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="bg-blue-500/5 border-blue-500/20">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Ride Status</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="text-sm">Current status</div>
                        <Badge className="capitalize bg-blue-500">
                          {RIDE.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Ride progress</span>
                          <span className="font-medium">{RIDE.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-blue-500" 
                            initial={{ width: "0%" }}
                            animate={{ width: `${showAnimation ? RIDE.progress : 0}%` }}
                            transition={{ duration: 1, delay: 0.8 }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm">Est. arrival</div>
                        <div className="font-medium">15 min</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Share ride button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Button variant="outline" className="w-full gap-2">
                  <Share className="h-4 w-4" />
                  Share Ride Details
                </Button>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}