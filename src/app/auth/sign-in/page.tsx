"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { GradientBorder } from "@/components/ui/gradient-border";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [authError, setAuthError] = useState<string | null>(null);

  const query = useSearchParams();

  useEffect(() => {
    if (query?.get("error")) {
      setAuthError(query.get("error"));
    }
  }, [query]);

  return (
    <div className="flex flex-col">
      {authError && (
        <Alert variant={"destructive"} className="mb-6 space-x-2">
          <AlertTriangle />
          <p>{"There was an error sending your sign in link"}</p>
        </Alert>
      )}
      <GradientBorder className="bg-white rounded-full w-fit dark:bg-black">
        <div className="grid w-10 h-10 shrink-0 place-items-center">
         <Lock size={18} />
        </div>
      </GradientBorder>

      <div className="flex flex-col py-8">
        <p className="text-lg font-medium text-black dark:text-white">Welcome</p>
        <p className="text-zinc-400">
          {"Please sign in or sign up below."}
        </p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col pb-4">
          <p className="pb-2 text-sm text-zinc-400">Email</p>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Insert your email address"
          />
        </div>
        <div className="flex flex-col space-y-2">
        <Button
          disabled={loading}
          onClick={() => {
            setLoading(true);
            signIn("email", { email: email, callbackUrl: "/dashboard" });
            setLoading(false);
          }}
          className="rounded-md"
        >
          Continue with Email
        </Button>
        <Button variant='secondary'
          disabled={loading}
          onClick={() => {
            setLoading(true);
            signIn("github", {callbackUrl: "/dashboard" });
            setLoading(false);
          }}
          className="rounded-md"
        >
          Signin with Github
        </Button>
        </div>
      </div>
      <p className="pt-4 text-xs text-zinc-400">
        By signing in, you agree to our terms, acceptable use, and privacy
        policy.
      </p>
    </div>
  );
}
