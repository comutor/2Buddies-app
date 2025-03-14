import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Car, Plus } from "lucide-react";

export default function Rides() {
  const [, setLocation] = useLocation();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Rides</h1>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:bg-accent cursor-pointer" onClick={() => setLocation("/rides/create")}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Create Ride</h3>
                <p className="text-sm text-muted-foreground">
                  Offer a ride to other students
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:bg-accent cursor-pointer" onClick={() => setLocation("/rides/request")}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Request Ride</h3>
                <p className="text-sm text-muted-foreground">
                  Find a ride to your destination
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
