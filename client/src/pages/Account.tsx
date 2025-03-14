import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Account() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">User Name</h1>
              <p className="text-muted-foreground">user@example.com</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            Edit Profile
          </Button>
          <Separator />
          <Button variant="outline" className="w-full justify-start">
            Notifications
          </Button>
          <Separator />
          <Button variant="outline" className="w-full justify-start">
            Privacy
          </Button>
          <Separator />
          <Button variant="outline" className="w-full justify-start text-destructive">
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
