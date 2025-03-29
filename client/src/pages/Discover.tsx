import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { 
  Search as SearchIcon, 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  Car,
  Filter,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Sample ride data for demonstration
const DEMO_RIDES = [
  {
    id: 1,
    driver: "Alex Johnson",
    from: "North Campus",
    to: "Downtown Library",
    date: "Today",
    time: "3:30 PM",
    seats: 3,
    price: 5,
    tags: ["Quick Ride", "Student Only"]
  },
  {
    id: 2,
    driver: "Sam Williams",
    from: "South Dorms",
    to: "Shopping Mall",
    date: "Tomorrow",
    time: "11:00 AM",
    seats: 2,
    price: 7,
    tags: ["Weekend Trip", "Shopping"]
  },
  {
    id: 3,
    driver: "Taylor Smith",
    from: "Engineering Building",
    to: "Airport",
    date: "May 5, 2024",
    time: "6:15 AM",
    seats: 4,
    price: 15,
    tags: ["Long Distance", "Early Morning"]
  },
  {
    id: 4,
    driver: "Jordan Lee",
    from: "Student Center",
    to: "Concert Hall",
    date: "May 8, 2024",
    time: "7:00 PM",
    seats: 3,
    price: 6,
    tags: ["Evening", "Event"]
  },
  {
    id: 5,
    driver: "Casey Brown",
    from: "Science Labs",
    to: "Beach",
    date: "May 10, 2024",
    time: "2:00 PM",
    seats: 5,
    price: 8,
    tags: ["Weekend Trip", "Leisure"]
  },
  {
    id: 6,
    driver: "Riley Green",
    from: "Central Campus",
    to: "Sports Stadium",
    date: "May 12, 2024",
    time: "5:30 PM",
    seats: 6,
    price: 4,
    tags: ["Game Day", "Group Ride"]
  },
  {
    id: 7,
    driver: "Avery Davis",
    from: "Library",
    to: "Art Museum",
    date: "May 15, 2024",
    time: "1:00 PM",
    seats: 2,
    price: 5,
    tags: ["Afternoon", "Cultural"]
  }
];

type RideType = typeof DEMO_RIDES[0];

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [rides, setRides] = useState<RideType[]>([]);
  const [filteredRides, setFilteredRides] = useState<RideType[]>([]);
  
  // Filters
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [seatsFilter, setSeatsFilter] = useState<string | undefined>(undefined);
  const [dateFilter, setDateFilter] = useState<string | undefined>(undefined);
  const [isFilterActive, setIsFilterActive] = useState(false);
  
  // Simulate loading data
  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setRides(DEMO_RIDES);
      setFilteredRides(DEMO_RIDES);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle search and filtering
  useEffect(() => {
    if (!rides.length) return;
    
    let results = [...rides];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        ride => 
          ride.from.toLowerCase().includes(query) ||
          ride.to.toLowerCase().includes(query) ||
          ride.driver.toLowerCase().includes(query) ||
          ride.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply price filter
    results = results.filter(
      ride => ride.price >= priceRange[0] && ride.price <= priceRange[1]
    );
    
    // Apply seats filter
    if (seatsFilter) {
      const minSeats = parseInt(seatsFilter);
      results = results.filter(ride => ride.seats >= minSeats);
    }
    
    // Apply date filter
    if (dateFilter) {
      if (dateFilter === "today") {
        results = results.filter(ride => ride.date === "Today");
      } else if (dateFilter === "tomorrow") {
        results = results.filter(ride => ride.date === "Tomorrow");
      } else if (dateFilter === "upcoming") {
        results = results.filter(ride => ride.date !== "Today" && ride.date !== "Tomorrow");
      }
    }
    
    // Check if any filter is active
    setIsFilterActive(
      !!searchQuery || 
      priceRange[0] > 0 || 
      priceRange[1] < 20 || 
      !!seatsFilter || 
      !!dateFilter
    );
    
    setFilteredRides(results);
  }, [searchQuery, rides, priceRange, seatsFilter, dateFilter]);
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 20]);
    setSeatsFilter(undefined);
    setDateFilter(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Discover Rides</h1>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className={isFilterActive ? "border-blue-500 text-blue-500" : ""}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {isFilterActive && (
                <Badge variant="default" className="ml-2 bg-blue-500 text-white">Active</Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium">Filter Rides</h4>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm">Price Range (${priceRange[0]} - ${priceRange[1]})</label>
                </div>
                <Slider 
                  defaultValue={[0, 20]} 
                  max={20} 
                  step={1} 
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm">Minimum Seats</label>
                <Select value={seatsFilter} onValueChange={setSeatsFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any number of seats" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any number of seats</SelectItem>
                    <SelectItem value="1">At least 1 seat</SelectItem>
                    <SelectItem value="2">At least 2 seats</SelectItem>
                    <SelectItem value="3">At least 3 seats</SelectItem>
                    <SelectItem value="4">At least 4 seats</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm">Date</label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any date</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full" 
                onClick={resetFilters}
              >
                Reset All Filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="relative">
        <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by location, driver or tags..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        // Loading skeletons
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-3 w-full">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-4/5" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {filteredRides.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center justify-center rounded-full bg-muted p-6 mb-4">
                <SearchIcon className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No rides found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters to find more rides
              </p>
              <Button onClick={resetFilters}>
                Clear All Filters
              </Button>
            </motion.div>
          ) : (
            <div className="grid gap-4">
              {filteredRides.map((ride) => (
                <motion.div
                  key={ride.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="overflow-hidden hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                            <Car className="h-6 w-6" />
                          </div>
                        </div>
                        
                        <div className="flex-grow space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h3 className="font-medium">{ride.driver}</h3>
                            <div className="text-sm font-medium text-green-500">${ride.price}</div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="flex items-center text-sm">
                              <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>From: <span className="font-medium">{ride.from}</span></span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{ride.date}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>To: <span className="font-medium">{ride.to}</span></span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{ride.time}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <div className="flex items-center text-sm bg-muted px-2 py-1 rounded-full">
                              <Users className="h-3.5 w-3.5 mr-1" />
                              <span>{ride.seats} seats</span>
                            </div>
                            {ride.tags.map((tag, i) => (
                              <Badge key={i} variant="secondary" className="font-normal">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/30 p-3 flex justify-between">
                      <Link href={`/rides/${ride.id}`}>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          View Details
                        </Button>
                      </Link>
                      <Button className="gap-2" size="sm">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Book this Ride</span>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
