import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";
import Logo from "@/components/Logo";
import { Shield, Star, BookOpen, Car, User, Users } from "lucide-react";

export default function Account() {
  const [, setLocation] = useLocation();

  const handleLoginClick = () => {
    setLocation("/auth");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Account</h1>
      
      <Card className="overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-blue-600 to-blue-400"></div>
        <CardContent className="pt-16 p-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarFallback className="bg-blue-500 text-white text-xl">
                <User className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-1">
              <Logo className="mx-auto mb-2 text-blue-600 transform scale-125" />
              <h1 className="text-2xl font-bold">Welcome to 2Buddies</h1>
              <p className="text-muted-foreground">Please log in to access your account features</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full mt-2">
              <div className="flex items-center gap-2 text-sm p-3 rounded-lg border border-muted bg-muted/40">
                <Car className="h-5 w-5 text-blue-500" />
                <div className="text-left">
                  <p className="font-medium">Find Rides</p>
                  <p className="text-muted-foreground text-xs">Search available rides</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm p-3 rounded-lg border border-muted bg-muted/40">
                <Users className="h-5 w-5 text-blue-500" />
                <div className="text-left">
                  <p className="font-medium">Offer Rides</p>
                  <p className="text-muted-foreground text-xs">Share your journey</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm p-3 rounded-lg border border-muted bg-muted/40">
                <Star className="h-5 w-5 text-blue-500" />
                <div className="text-left">
                  <p className="font-medium">Rate Rides</p>
                  <p className="text-muted-foreground text-xs">Share your experience</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm p-3 rounded-lg border border-muted bg-muted/40">
                <Shield className="h-5 w-5 text-blue-500" />
                <div className="text-left">
                  <p className="font-medium">Secure Matching</p>
                  <p className="text-muted-foreground text-xs">Student verification</p>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full mt-4" 
              onClick={handleLoginClick}
              variant="default"
              size="lg"
            >
              Login / Sign Up
            </Button>
          </div>
        </CardContent>
        
        <CardFooter className="bg-muted/30 border-t p-4 flex flex-col sm:flex-row sm:justify-between gap-4 text-center sm:text-left">
          <div className="text-sm">
            <p className="font-medium">Student-exclusive ride sharing</p>
            <p className="text-muted-foreground">Join our community today</p>
          </div>
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setLocation("/discover")}
          >
            Browse Available Rides
          </Button>
        </CardFooter>
      </Card>
      
      {/* Additional information card */}
      <Card>
        <CardHeader>
          <CardTitle>Why Join 2Buddies?</CardTitle>
          <CardDescription>The student-exclusive ride sharing platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="bg-blue-500/10 p-2 rounded-full h-fit">
              <BookOpen className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium">For Students, By Students</h3>
              <p className="text-sm text-muted-foreground">
                Connect exclusively with other verified students from your campus and nearby schools.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="bg-blue-500/10 p-2 rounded-full h-fit">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium">Build Your Network</h3>
              <p className="text-sm text-muted-foreground">
                Meet students with similar commutes and schedules. Create lasting connections beyond just sharing rides.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="bg-blue-500/10 p-2 rounded-full h-fit">
              <Shield className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium">Safety First</h3>
              <p className="text-sm text-muted-foreground">
                All users are verified with their school email addresses. Rate your experience after each ride.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}