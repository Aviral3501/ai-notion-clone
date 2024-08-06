// "use client";

// import { usePathname } from "next/navigation";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Fragment } from "react";

// const Breadcrumbs = () => {
//   const path = usePathname();
//   // http://localhost:3000/doc/QWsoe3245sdmk234  a url for doc

//   const segments = path.split("/");
//   console.log(segments);

//   return (
//     <Breadcrumb>
//       <BreadcrumbList>
//         <BreadcrumbItem>
//           <BreadcrumbLink href="/" className="font-bold text-black">Home</BreadcrumbLink>
//         </BreadcrumbItem>
//         {segments.map((segment, index) => {
//           if (!segment) return null;

//           const href = `/${segments.slice(0, index + 1).join("/")}`;
//           const isLast = index ===segments.length -1;
//           return (
//            <>
//             <div className="font-bold flex flex-1 items-center justify-center flex-row">
//             <Fragment key={segment}>
//               <BreadcrumbSeparator/>
//             <BreadcrumbItem>
//             {isLast ? (
//               <BreadcrumbPage className="font-bold">{segment}</BreadcrumbPage>
//             ):(
//               <BreadcrumbLink href={href} className="font-bold text-black">{segment}</BreadcrumbLink>
//             )}
             
//             </BreadcrumbItem>
//             </Fragment>
//             </div>
//            </>
//           );
//         })}
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// };

// export default Breadcrumbs;
"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

const Breadcrumbs = () => {
  const path = usePathname();

  const segments = path.split("/").filter(segment => segment);
  console.log(segments);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="font-bold text-black">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <Fragment key={segment}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="font-bold text-black">{segment}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href} className="font-bold text-black">
                    {segment}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
