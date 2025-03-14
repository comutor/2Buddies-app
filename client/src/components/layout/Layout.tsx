import { ReactNode } from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      {!isMobile && <Header />}
      <main className="container mx-auto px-4 pb-20 pt-4">
        {children}
      </main>
      {isMobile && <BottomNav />}
    </div>
  );
}