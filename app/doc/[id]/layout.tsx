import { auth } from "@clerk/nextjs/server";
import { RoomProvider } from "@liveblocks/react/suspense";

const DocRoomLayout = ({children,params:{id}}:{children:React.ReactNode,params:{id:string}}) => {
    // protect this route
    auth().protect();
  return (
    <div>
        {children}
    </div>
  )
}

export default DocRoomLayout
