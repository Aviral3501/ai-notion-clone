import type { Metadata } from "next";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import Header from "@/components/Header";



export const metadata: Metadata = {
  title: "Notion X",
  description: "Effortlessly manage your notes, tasks, and projects with our advanced AI-powered Notion clone. Designed to enhance productivity and streamline your workflow, our platform offers intelligent content suggestions, real-time collaboration, and a user-friendly interface.",
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
        <Header/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
