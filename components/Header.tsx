"use client";

import { useUser } from "@clerk/nextjs";


const Header = () => {
  const {user} =useUser();

  return (
    <div>
      Header
      
    </div>
  )
}

export default Header
