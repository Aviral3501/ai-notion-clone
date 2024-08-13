"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";


import toast from "react-hot-toast";
import {
  removeUserFromDocument,
} from "@/actions/actions";
import { X } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import useOwner from "@/lib/useOwner";
import { useRoom } from "@liveblocks/react/suspense";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";

const ManageUsers = () => {
  const { user } = useUser();
  const isOwner = useOwner(); //get the owner of the room
  const room = useRoom(); //get the room
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  // get the users in the room
  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );

  const handleDelete = (userId: string) => {
    console.log("deleteing the user :" + userId);
    //delete the user from the room
    startTransition(async () => {
      if (!user) return;
      const { success } = await removeUserFromDocument(room.id, userId);
      {
        success
          ? toast.success("User removed")
          : toast.error("Error in removing user");
      }
    });
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant={"outline"}>
          <DialogTrigger>
            Manage Users ({usersInRoom?.docs.length})
          </DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <span className="flex items-center justify-center">
                Users with Access
              </span>
            </DialogTitle>
            <DialogDescription>
              <span className="text-[15px] flex items-center justify-center">
                List of users who have access to this document.
              </span>
            </DialogDescription>
          </DialogHeader>

          <hr className="my-0.5 border-gray-600/40" />

          <div className="flex flex-col mx-auto gap-2 min-w-[90%]">
            {usersInRoom?.docs.map((doc, index) => (
              <div
                key={doc.data().userId}
                className="flex items-center justify-between"
              >
                <p className="font-md">
                  {doc.data().userId == user?.emailAddresses[0].toString()
                    ? `You (${doc.data().userId})`
                    : `${doc.data().userId}`}
                </p>

                <div className="flex items-center gap-2">
                  <Button variant={"outline"}>{doc.data().role}</Button>

                  {isOwner &&
                    doc.data().userId !==
                      user?.emailAddresses[0].toString() && (
                      <>
                        <Button
                          variant={"destructive"}
                          onClick={() => handleDelete(doc.data().userId)}
                          disabled={isPending}
                          size="sm"
                        >
                          {isPending ? "Removing..." : <X size={18} />}
                        </Button>
                      </>
                    )}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageUsers;
