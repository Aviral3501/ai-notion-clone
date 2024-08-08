"use client";
import { LiveList, LiveObject } from "@liveblocks/client";
import { RoomProvider as RoomProviderWrapper, ClientSideSuspense} from "@liveblocks/react/suspense";

const RoomProvider = ({roomId,children}:{roomId:string,children:React.ReactNode}) => {
  return (
    <RoomProviderWrapper
    id={roomId}
    initialPresence={{
        cursor:null
    }}>
        <ClientSideSuspense fallback = {<LoadingSpinner/>}>
            {children}
        </ClientSideSuspense>
    </RoomProviderWrapper>
  )
}
export default RoomProvider;