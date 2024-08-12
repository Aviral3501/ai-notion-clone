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
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { usePathname, useRouter } from "next/navigation";

import toast from "react-hot-toast"
import { Input } from "./ui/input";
import { inviteUserToDocument } from "@/actions/actions";


const InviteUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email,setEmail] = useState("");

  const [isPending,startTransition] = useTransition();
  const pathName = usePathname();
  const router = useRouter();
  

const handleInvite =async(e:FormEvent)=>{
    e.preventDefault();

    const roomId = pathName.split("/").pop();
    if(!roomId) return;

        startTransition(async()=>{
            const {success} = await inviteUserToDocument(roomId,email);
            if(success){
                setIsOpen(false);
                setEmail("");
                toast.success("User added to room successfully.");  
            }else{
                toast.error("Failed to add user to the room.");
            }
        })
}

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant={"outline"}>
          <DialogTrigger>Invite</DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <span>Invite a user to collaborate!</span>
            </DialogTitle>
            <DialogDescription>
              <span>Enter the email of the user you want to invite.</span>
              
            </DialogDescription>
          </DialogHeader>

            <form onSubmit={handleInvite} className="flex gap-2 ">
                <Input
                type="email"
                placeholder="Enter email"
                className="w-full p-2 mb-2"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <Button type="submit" disabled={(!email||isPending)} >
                    {isPending?"Inviting...":"Invite"}
                </Button>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InviteUser;


