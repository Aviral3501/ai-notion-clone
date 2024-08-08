"use client";

import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import { PointerEvent } from "react";
import FollowPointer from "./FollowPointer";

const LiveCursorProvider = ({children}:{children:React.ReactNode}) => {
    // use useMyPresence Hook - realtime cursor coordnitates
    const [myPresence,updateMyPresence] = useMyPresence();
    const others = useOthers(); //for other presence - cursor pinter coordinates

    function handlePointerMove(e:PointerEvent<HTMLDivElement>){
        //update my presence with cursor coordinates
        // update clientx and clienty to pagex and pagey for full page cursor tracking
        const cursor = {x:Math.floor(e.pageX),y:Math.floor(e.pageY)};
        updateMyPresence({cursor});
    }

    function handlePointerLeave(){
        // do nothuing when i leave 
        updateMyPresence({cursor:null});
    }

  return (
    <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
        {/* render cursors */}
        {others.filter((other)=>other.presence.cursor !=null).map(({connectionId,presence,info})=> (
            <FollowPointer key={connectionId} info={info} x={presence.cursor!.x} y={presence.cursor!.y}/>
        ))}
        {children}
        </div>
  )
}
export default LiveCursorProvider