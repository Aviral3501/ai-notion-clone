"use client";

import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { useEffect, useState } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import {BlockNoteView} from "@blocknote/shadcn";
import {BlockNoteEditor} from "@blocknote/core";
import {useCreateBlockNote} from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import stringToColor from "@/lib/stringToColor";


type EditorProps = {
    doc: Y.Doc;
  provider: any;
  darkMode: boolean;
}

function BlockNote({ doc, provider, darkMode }: EditorProps) {
      // Initialize the editor

const userInfo = useSelf((me)=>me.info)  //who is typing
  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration:{
        provider,
        fragment:doc.getXmlFragment("document-store"), //where we are storing it
        user:{
            name:userInfo?.email,
            color:stringToColor(userInfo?.email),
        }
    }
  });


  return(
    <>
    <div className="relative max-w-6xl mx-auto ">
        <BlockNoteView className="min-h-screen" editor={editor} theme={darkMode?"dark":"light"}/>
    </div>
    </>
  )
}


const Editor = () => {
    const room = useRoom();
    const [doc,setDoc] = useState<Y.Doc>();
    const [provider,setProvider] = useState<LiveblocksYjsProvider>();
    const [darkMode,setDarkMode ] = useState(false);


    useEffect(()=>{
        // create new doc and nre provider
        const yDoc = new Y.Doc();
        const yProvider = new LiveblocksYjsProvider(room,yDoc);

        // set the doc and docProvider
        setDoc(yDoc);
        setProvider(yProvider);

        // perform cleanup
        return () => {
            yDoc?.destroy();
            yProvider?.destroy();
        };
    },[room])

    if(!doc || !provider){
        return null;
    }



    const style= `hover:text-white ${
        darkMode ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
        :"text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
    }`;


    return (
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex justify-between items-center w-full mb-10">
            <div className="flex gap-2 w-full">
              {/* Other components like Translate document and Chat with document */}
              {/* Translate document */}
              {/* Chat with Document */}
            </div>
      
            {/* Dark mode */}
            <Button className={style} onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </Button>
          </div>


          {/* Blocknote */}
          <BlockNote doc={doc} provider={provider} darkMode={darkMode}/>
        </div>
      );
      
    }      

export default Editor
