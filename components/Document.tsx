"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

const Document = ({id}:{id:string}) => {

  const [data,loading,error] = useDocumentData(doc(db,"documents",id));
  const [input,setInput] = useState("");
  const [isUpdating,startTransition] = useTransition();

  useEffect(() => {
    if(data){
      setInput(data.title);
    }
  }, [data]);
  

  const updateTitle =(e:FormEvent)=>{
    e.preventDefault(); //prevents the screen from refreshing
    startTransition(async()=>{
      await updateDoc(doc(db,"documents",id),{
        title:input,
      });
    });
  };

  return (
    <div>

      <form onSubmit={updateTitle}>
        {/* update title */}
        <Input
        value={input}
        onChange={(e)=>setInput(e.target.value)}
          />

        <Button disabled={isUpdating} type="submit">{isUpdating?"Updating...":"Update"}</Button>

        {/* if */}

        {/* isOwner && InviteUser , delete document */}
      </form>

      <div>
        {/* Manage users */}

        {/* Avatars */}
      </div>


      {/* Collaborative editor */}

    </div>
  )
}
export default Document