// "use client";

// import { useState, useEffect } from 'react';

// // Define the type for owner data
// interface Owner {
//   name: string;
//   // Add other fields if necessary
// }

// const useOwner = (): Owner | null => {
//   const [owner, setOwner] = useState<Owner | null>(null);

//   useEffect(() => {
//     // Logic to fetch or determine the owner
//     const fetchOwner = async () => {
//       // Simulate a fetch call with a timeout
//       const ownerData = { name: "John Doe" }; // Replace with actual fetch logic
//       setOwner(ownerData);
//     };

//     fetchOwner();
//   }, []);

//   return owner;
// };

// export default useOwner;
"use client";

import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import { collectionGroup, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

function useOwner() {
  const { user } = useUser(); // Assuming useUser returns an object with a `user` property
  const room = useRoom(); // Assuming useRoom returns an object with a `room` ID
  const [isOwner, setIsOwner] = useState(false);

  const [usersInRoom, loading, error] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );

  useEffect(() => {
  if(usersInRoom?.docs && usersInRoom.docs.length >0){
    const owners = usersInRoom.docs.filter(
      (doc)=>doc.data().role ==="owner"
    );
    if(owners.some((owner)=>owner.data().userId ===user?.emailAddresses[0].toString())){
      setIsOwner(true);
    }
  }
  }, [usersInRoom, user]);

  return isOwner;
}

export default useOwner;
