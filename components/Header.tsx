"use client";

import { SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";

const Header = () => {
  const { user } = useUser();

  return (
    <>
     <div className="flex justify-between items-center px-4">
     {user && (
        <div>
          <h1 className="font-medium text-xl tracking-tight py-4">{capitalizeFirstLetter(user?.firstName || '')}{`'s`} Space</h1>
        </div>
      )}
    
      {/* breadcrumbs */}
      <div>
        <SignedOut>
          <SignInButton/>
        </SignedOut>
        <SignedIn>
          <UserButton/>
        </SignedIn>
      </div>
      </div>
    </>
  );
};

export default Header;







// display name 
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
