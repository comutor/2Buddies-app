import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search as SearchIcon } from "lucide-react";

export default function Discover() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Discover</h1>
      
      <div className="relative">
        <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-muted" />
                <div>
                  <h3 className="font-medium">Search Result {i}</h3>
                  <p className="text-sm text-muted-foreground">
                    Description for search result {i}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
