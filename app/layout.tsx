import type { Metadata } from "next";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Notion X",
  description:
    "Effortlessly manage your notes, tasks, and projects with our advanced AI-powered Notion clone. Designed to enhance productivity and streamline your workflow, our platform offers intelligent content suggestions, real-time collaboration, and a user-friendly interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-4 bg-gray-100/80 overflow-y-auto ">
              {children}
            </div>
          </div>
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
