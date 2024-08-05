import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="flex space-x-2 animate-pulse ">
        <div className="flex gap-2  items-center md:py-2">
          <ArrowLeftCircle className="w-6 h-6 sm:w-8 sm:h-8" />
          <h1 className="font-bold text-lg sm:text-xl">Get Started with creating a new document</h1>
        </div>
      </div>
    </>
  );
}
