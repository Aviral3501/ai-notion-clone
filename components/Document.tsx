"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import useOwner from "@/lib/useOwner";
import Editor from "./Editor";
import { useUser } from "@clerk/nextjs";
import DeleteDocument from "./DeleteDocument";
import InviteUser from "./InviteUser";

const Document = ({ id }: { id: string }) => {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();
  const isOwner = useOwner();
  const  {user} = useUser();
  const camelCasedName = user?.fullName ? toCamelCase(user.fullName) : "";

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault(); // prevents the screen from refreshing
    startTransition(async () => {
      await updateDoc(doc(db, "documents", id), {
        title: input,
      });
    });
  };

  return (
    <div className="flex flex-col items-center max-w-6xl w-full mx-auto pb-5 px-2 bg-white">   {/*  bg-slate-400/10*/}
  <form onSubmit={updateTitle} className="flex w-full space-x-2 mt-4">
    {/* update title */}
    <Input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="flex-grow"
    />
    <Button disabled={isUpdating} type="submit">
      {isUpdating ? "Updating..." : "Update"}
    </Button>

    {isOwner && (
      <>
      <div className="flex gap-2">
        <DeleteDocument />
        <InviteUser/>
      </div>
      </>
    )}
  </form>

  <div className="mt-2 w-full flex justify-between items-center">
    {/* Manage users */}
    {isOwner && (
      <>
      {/* invite user */}
      {/* delete document */}
      <div className="text-sm font-semibold ml-1">Owned By: {camelCasedName || "Unknown Owner"}</div>
      <div className="flex justify-between items-center gap-2">
       
      </div>
      </>
    )}

  </div>

  <hr className="w-full my-5 border-t-2 border-gray-800/20" />


  {/* Collaborative editor */}
  <Editor />
</div>


  );
};

export default Document;




// Helper function to convert a string to camel case
function toCamelCase(str: string) {
  str= " "+str;
  return str
    .split(" ")
    .map((word, index) =>
      index === 0
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
}








    // <div className="flex justify-center max-w-6xl w-full mx-auto pb-5 px-2 bg-red-200 ">
    //   <form onSubmit={updateTitle} className="flex space-x-2 max-w-6xl w-full">
    //     {/* update title */}
    //     <Input
    //       value={input}
    //       onChange={(e) => setInput(e.target.value)}
    //       className="flex-grow"
    //     />
    //     <Button disabled={isUpdating} type="submit">
    //       {isUpdating ? "Updating..." : "Update"}
    //     </Button>
    //   </form>

    //   <div className="mt-5">
    //     {/* Manage users */}
    //     heelo

    //     {/* Avatars */}
    //   </div>

    //   <hr className="pb-10"/>

    //   {/* Collaborative editor */}
    //   <Editor/>
    // </div>