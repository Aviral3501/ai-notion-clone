"use client";

import {LiveblocksProvider} from "@liveblocks/react/suspense";

function LiveBlocksProvider({children}:{children:React.ReactNode}){
    // throw error if env var are wrong
    if(!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY){
        throw new Error("NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY :is not set properly.")
    }
    // if(!process.env.NEXT_PUBLIC_LIVEBLOCKS_PRIVATE_KEY){
    //     throw new Error("NEXT_PUBLIC_LIVEBLOCKS_PRIVATE_KEY :is not set properly.")
    // }


  return (
    <LiveblocksProvider authEndpoint={`auth-endpoint`} throttle={16}>
        {children}
    </LiveblocksProvider>
  )
}

export default LiveBlocksProvider;
