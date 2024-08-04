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

import {useCollection} from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import { collectionGroup,where,query, DocumentData } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";

interface RoomDocument extends DocumentData{
  createdAt:string,
  role:"owner"|"editor",
  roomId:string,
  userId:string,
}


const Sidebar = () => {
  // getting the user form clerk


  const {user} = useUser();

  const [groupedData,setGroupedData] = useState<{
    owner:RoomDocument[];
    editor:RoomDocument[];
  }>({
    owner: [],
    editor:[],
  })

  const [data,loading,error] = useCollection(
    user&&(
      // in every users/collection/rooms --> userId matches the user that is currently logged in
        query(collectionGroup(db,'rooms'),where('userId','==',user.emailAddresses[0].toString()))
        // search the  rooms Collection where userId is the current users email

    )
  );

  // to group items based on -> if i am owner , or a doc is shared with me
  useEffect(() => {
    if (!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>((acc, curr) => {
      const roomData = curr.data() as RoomDocument;
      if (roomData.role === "owner") {
        acc.owner.push({
          id: curr.id,
          ...roomData,
        });
      } else {
        acc.editor.push({
          id: curr.id,
          ...roomData,
        });
      }
      return acc;
    }, {
      owner: [],
      editor: [],
    });

    setGroupedData(grouped);
  }, [data]);

  const menuOptions = (
    <>
   <NewDocumentButton/>
   {/* My documents */}
  
   {groupedData.owner.length===0?(
    <h2 className="text-gray-500 font-semibold text-lg py-4 ">No Documents Found</h2>
   ):(
   <>
   <h2 className="text-gray-500 font-semibold text-lg py-4">My Documents</h2>
   {groupedData.owner.map((doc)=>(
    <div key={doc.roomId} className="text-black">{doc.roomId}</div>
    // <SidebarOption key={doc.id} id={doc.id} href={`/doc/${docId}`}/>
   ))}

   </>

   )}

   {/* My Lists */}

   {/* Shared with me */}

   {/* List */}
    </>
    
);

  return (
    <div className=" p-2 md:p-5 relative bg-gray-200">
      <div className="md:hidden ">
        {/* mobile view */}
        <Sheet>
          <SheetTrigger>
            <MenuIcon
            className="p-2 hover:opacity-30 rounded-lg " size={40}/>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold tracking-normal">Menu</SheetTitle>
             
              <div className="">
                {/* Options */}
                {menuOptions}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      {/* big screen view */}
      <div className="hidden md:inline ">
        {menuOptions}
      </div>
    </div>
  );
};

export default Sidebar;
