import { Button } from "@/components/ui/button";
import { LifeBuoy } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function QuickHelp() {
  return (
    <div className="fixed bottom-20 right-4 z-50 md:bottom-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" className="h-12 w-12 rounded-full shadow-lg">
            <LifeBuoy className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Need Help?</SheetTitle>
            <SheetDescription>
              We're here to assist you with any questions or issues you might have.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>• How to request a ride</li>
              <li>• Safety guidelines</li>
              <li>• Payment methods</li>
              <li>• Account settings</li>
            </ul>
            <div className="pt-4">
              <Button className="w-full">Contact Support</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
