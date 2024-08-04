"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import NewDocumentButton from "./NewDocumentButton";
import { MenuIcon } from "lucide-react";

const menuOptions = (
    <>
   <NewDocumentButton/>
   {/* My documents */}

   {/* My Lists */}

   {/* Shared with me */}

   {/* List */}
    </>
    
);

const Sidebar = () => {
  return (
    <div className="bg-red-200 p-2 md:p-5 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon
            className="p-2 hover:opacity-30 rounded-lg" size={40}/>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
             
              <div className="">
                {/* Options */}
                {menuOptions}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>


      <div className="hidden md:inline">
        {menuOptions}
      </div>
    </div>
  );
};

export default Sidebar;
