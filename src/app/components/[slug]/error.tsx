"use client"; // Error components must be Client Components

import { Header } from "@/components/blocks/header";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="m-auto max-w-7xl">
      <Header />
      <div className="w-full p-6 mx-auto my-10 bg-gray-100 rounded-lg dark:bg-white/10 md:w-6/12">
        <h2 className="pb-10 text-2xl font-bold">Something went wrong!</h2>
        <Button
          variant={"destructive"}
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }>
          Try again
        </Button>
      </div>
    </div>
  );
}
