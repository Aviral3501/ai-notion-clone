"use client";

import LiveBlocksProvider from "@/components/LiveBlocksProvider";

const DocLayout = ({children}:{children:React.ReactNode}) => {
  return (
   <LiveBlocksProvider>
    {children}
   </LiveBlocksProvider>
  )
}

export default DocLayout
