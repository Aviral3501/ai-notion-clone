"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

// Define the types for other and self
interface User {
  id: string;
  info: {
    avatar?: string;
    name?: string;
  };
}

interface MemoizedAvatarProps {
  other: User | null;
  self: User | null;
}

// Memoized Avatar component
const MemoizedAvatar = React.memo(
  ({ other, self }: MemoizedAvatarProps) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Avatar className="border-2 hover:z-50">
            <AvatarImage
              src={other?.info.avatar || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <p>{self?.id === other?.id ? "You" : other?.info.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  (prevProps, nextProps) =>
    prevProps.other?.id === nextProps.other?.id &&
    prevProps.self?.id === nextProps.self?.id
);

const Avatars = () => {
  const others = useOthers();
  const self = useSelf();
  const all: User[] = [self, ...others];

  return (
    <div className="flex gap-2 items-center justify-center">
      <p className="font-light text-sm">Users currently editing this page</p>
      <div className="flex -space-x-5">
        {all.map((other, i) => (
          <MemoizedAvatar key={other?.id || i} other={other} self={self} />
        ))}
      </div>
    </div>
  );
};

export default Avatars;


// "use client";

// import { useOthers, useSelf } from "@liveblocks/react/suspense";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// const Avatars = () => {
//   const others = useOthers();
//   const self = useSelf();
//   const all = [self, ...others];

//   return (
//     <div className="flex gap-2 items-center justify-center">
//       <p className="font-light text-sm">Users currently editing this page</p>
//       <div className=" flex -space-x-5">
//         {all.map((other, i) => (
//           <TooltipProvider key={other?.id + i + Math.random() * 99}>
//             <Tooltip>
//               <TooltipTrigger>
//                 {" "}
//                 <Avatar className="border-2 hover:z-50">
//                   <AvatarImage
//                     src={other?.info.avatar || "https://github.com/shadcn.png"}
//                   />
//                   <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>{self?.id === other?.id ? "You" : other?.info.name}</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default Avatars;