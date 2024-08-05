"use client";
import { db } from "@/firebase";
import { doc, DocumentData as FirebaseDocumentData, DocumentReference } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";


interface DocumentData extends FirebaseDocumentData {
  title: string;
  // Add other fields if necessary
}



const SidebarOption = ({ href, id }: { href: string; id: string }) => {
  const documentRef: DocumentReference<DocumentData> = doc(db, "documents", id) as DocumentReference<DocumentData>;
  const [data, loading, error] = useDocumentData<DocumentData>(documentRef);
  const pathname = usePathname(); // the path I am currently on
  const isActive = href.includes(pathname) && pathname !== '/';

  if (!data) return null;

  return (
    <Link href={href} className={`border p-2 rounded-md  ${isActive ? "bg-gray-300 font-bold border-black" : "border-gray-400"} flex items-center `}>
      <p className="whitespace-nowrap overflow-ellipsis overflow-hidden flex-grow" title={data.title}>{data.title}</p>
    </Link>
  );
};

export default SidebarOption;


