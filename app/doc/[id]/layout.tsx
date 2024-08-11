import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

const DocRoomLayout = ({children,params:{id}}:{children:React.ReactNode,params:{id:string}}) => {
    // protect this route
    auth().protect();
  return (
   <RoomProvider roomId={id}>
    {children}
   </RoomProvider>
  )
}

export default DocRoomLayout
