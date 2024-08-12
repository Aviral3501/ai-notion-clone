"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { usePathname, useRouter } from "next/navigation";

import toast from "react-hot-toast"

const DeleteDocument = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending,startTransition] = useTransition();
  const pathName = usePathname();
  const router = useRouter();
  
//   delte the document
const handleDelete =async()=>{
    // get the id of the doc
    const roomId = pathName.split("/").pop();
    console.log("deleting document : "+roomId);

    startTransition(async()=>{
        // server action to delete the document
        // const {success} = await deleteDocument(roomId);
        const success = false;

        if(success){
            setIsOpen(false);
            router.replace("/");
            toast.success("Room deleted successfully!");
        }else{
            toast.error("Failed to delete room");
        }
    })

}

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant={"destructive"}>
          <DialogTrigger>Delete</DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to{" "}
              <span className="text-red-400 font-bold">
                Delete this Document?
              </span>
            </DialogTitle>
            <DialogDescription>
              <span className="flex flex-col">
              <span>
              This action is irreversible. Once deleted, your document data will
              be permanently removed from our servers.
              </span>
              <span className="mt-2  font-semibold text-sm">
              Upgrade to premium for 30 days of backup and never lose your work.
              </span>
              </span>
              
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
            type="button"
            variant={"destructive"}
            onClick={handleDelete}
            disabled={isPending}
            >{isPending?"Deleting...":"Delete"}
            </Button>
            <DialogClose asChild>
                <Button type="button" variant={"secondary"}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteDocument;
