import React from 'react';
import {motion ,AnimatePresence,useMotionValue} from "framer-motion";
import stringToColor from '@/lib/stringToColor';

// Define the props interface
interface FollowPointerProps {
  key: number;
  info:{
    name:string,
    email:string,
    avatar:string,
  } // Define the type of info if you have a specific structure
  x: number;
  y: number;
}

const FollowPointer: React.FC<FollowPointerProps> = ({ info, x, y }) => {
    // unique color for every user
    const color = stringToColor(info.email || '1');

  return(
    <>
    <motion.div>
        FoolowPointer
    </motion.div>

    </>
  )
}

export default FollowPointer;
