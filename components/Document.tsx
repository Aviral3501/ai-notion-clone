"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import useOwner from "@/lib/useOwner";
import Editor from "./Editor";

const Document = ({ id }: { id: string }) => {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();
  const isOwner = useOwner();

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
    <div className="flex flex-col items-center max-w-6xl w-full mx-auto pb-5 px-2 bg-slate-400/10">
  <form onSubmit={updateTitle} className="flex w-full space-x-2">
    {/* update title */}
    <Input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="flex-grow"
    />
    <Button disabled={isUpdating} type="submit">
      {isUpdating ? "Updating..." : "Update"}
    </Button>
  </form>

  <div className="mt-5 w-full">
    {/* Manage users */}
    heelo
  </div>

  <hr className="w-full my-5" />

  {/* Collaborative editor */}
  <Editor />
</div>


  );
};

export default Document;













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