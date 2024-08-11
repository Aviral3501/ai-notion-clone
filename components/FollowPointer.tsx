import React from "react";
import { motion } from "framer-motion";
import stringToColor from "@/lib/stringToColor";

// Define the props interface
interface FollowPointerProps {
  key: number;
  info: {
    name: string;
    email: string;
    avatar: string;
  }; // Define the type of info if you have a specific structure
  x: number;
  y: number;
}

const FollowPointer: React.FC<FollowPointerProps> = ({ info, x, y }) => {
  // unique color for every user
  const color = stringToColor(info.email || "1");

  return (
    <>
      <motion.div
        className="h-4 w-4 rounded-full absolute z-50"
        style={{
          top: y,
          left: x,
          pointerEvents: "none",
        }}
        initial={{
          scale: 1,
          opacity: 1,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0,
          opacity: 0,
        }}
      >
        <svg
          stroke={color}
          fill={color}
          strokeWidth={1}
          viewBox="0 0 24 24"
          className={`h-6 w-6 text-[${color}] transform  -translate-x-[5px] -translate-y-[5px] stroke-[${color}]`}
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3.1,4.46l7.21,15.92A1.17,1.17,0,0,0,12.5,20l1.26-6.23L20,12.5a1.17,1.17,0,0,0,.39-2.19L4.46,3.1A1,1,0,0,0,3.1,4.46Z" />
        </svg>

        <motion.div
          style={{
            top: y,
            left: x,
            pointerEvents: "none",
          }}
          initial={{
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0.5,
            opacity: 0,
          }}
          className="px-2 bg-neutral-200 text-black font-bold whitespace-nowrap min-w-max text-xs rounded-full"
        >
          {info.name || info.email}
        </motion.div>
      </motion.div>
    </>
  );
};

export default FollowPointer;
