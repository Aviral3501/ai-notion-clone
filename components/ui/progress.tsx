// "use client"

// import * as React from "react"
// import * as ProgressPrimitive from "@radix-ui/react-progress"

// import { cn } from "@/lib/utils"

// const Progress = React.forwardRef<
//   React.ElementRef<typeof ProgressPrimitive.Root>,
//   React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
// >(({ className, value, ...props }, ref) => (
//   <ProgressPrimitive.Root
//     ref={ref}
//     className={cn(
//       "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
//       className
//     )}
//     {...props}
//   >
//     <ProgressPrimitive.Indicator
//       className="h-full w-full flex-1 bg-primary transition-all"
//       style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
//     />
//   </ProgressPrimitive.Root>
// ))
// Progress.displayName = ProgressPrimitive.Root.displayName

// export { Progress }
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-gray-300",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full bg-gradient-to-r from-blue-300 to-blue-700 transition-all duration-300 ease-in-out"
      style={{ width: `${value || 0}%` }}
    />
    <div
      className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"
      style={{ transform: `translateX(${value || 0}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

