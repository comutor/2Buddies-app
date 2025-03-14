import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function Account() {
  const [, setLocation] = useLocation();

  const handleLoginClick = () => {
    setLocation("/auth");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <Avatar className="h-20 w-20">
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome</h1>
              <p className="text-muted-foreground">Please log in to access your account</p>
            </div>
            <Button 
              className="w-full mt-4" 
              onClick={handleLoginClick}
              variant="default"
            >
              Login / Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}