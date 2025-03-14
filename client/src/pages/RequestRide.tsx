import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

export default function RequestRide() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Request a Ride</h1>
      
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Pickup Location"
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Destination"
                className="pl-10"
              />
            </div>
          </div>
          
          <Button className="w-full">
            Request Ride
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
