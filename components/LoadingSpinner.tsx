"use client";

import React, { useState, useEffect } from "react";
import { Progress } from "./ui/progress"; // Adjust the path to where the component is located

export default function ExamplePage() {
  const [progress, setProgress] = useState(30); // Start progress at 40%

  useEffect(() => {
    // Set up an interval to increase the progress every 500ms
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        // Stop incrementing at 100%
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 24;
      });
    }, 400);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen -translate-y-[80px] sm:-translate-y-[100px]">
    <div className="w-full max-w-md p-4">
      <h2 className="mb-4 text-xl font-semibold text-center">Progress</h2>
      <Progress value={progress} />
    </div>
  </div>
  );
}



// import { ClipLoader } from "react-spinners"
// import { Progress } from "./ui/progress"

// const LoadingSpinner = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <ClipLoader size={50} color="red" />
//       <p className="mt-4 text-lg font-semibold text-gray-700">Redirecting...</p>
//     </div>
//   )
// }

// export default LoadingSpinner
