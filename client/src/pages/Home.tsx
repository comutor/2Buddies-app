import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Users, MapPin, CalendarDays } from "lucide-react";
import { Link } from "wouter";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center py-6">
        <Logo className="mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Welcome to 2Buddies</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Student ride-sharing made simple. Connect with fellow students for convenient and affordable transportation.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-blue-500/20">
          <CardHeader className="pb-2">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
              <Car className="h-5 w-5 text-blue-500" />
            </div>
            <CardTitle>Offer a Ride</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Have empty seats in your car? Offer a ride to fellow students and share the journey.
            </p>
            <Link href="/rides">
              <Button className="w-full">Create Ride</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20">
          <CardHeader className="pb-2">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <CardTitle>Need a Ride?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Looking for transportation? Connect with students who are offering rides.
            </p>
            <Link href="/rides">
              <Button className="w-full">Request Ride</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20">
          <CardHeader className="pb-2">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
              <MapPin className="h-5 w-5 text-blue-500" />
            </div>
            <CardTitle>Discover Rides</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Browse available rides and find the perfect match for your transportation needs.
            </p>
            <Link href="/discover">
              <Button className="w-full">Find Rides</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6 border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarDays className="mr-2 h-5 w-5" />
            How 2Buddies Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mb-2">
                <span className="text-primary-foreground font-bold">1</span>
              </div>
              <h3 className="font-medium mb-1">Create or Request</h3>
              <p className="text-sm text-muted-foreground">
                Either offer a ride or request a ride based on your needs
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mb-2">
                <span className="text-primary-foreground font-bold">2</span>
              </div>
              <h3 className="font-medium mb-1">Connect</h3>
              <p className="text-sm text-muted-foreground">
                Match with other students going your way
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mb-2">
                <span className="text-primary-foreground font-bold">3</span>
              </div>
              <h3 className="font-medium mb-1">Travel Together</h3>
              <p className="text-sm text-muted-foreground">
                Share the ride and make your journey more affordable
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
