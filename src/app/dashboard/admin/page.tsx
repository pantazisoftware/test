import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSignedInUser } from "@/lib/auth/helper";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { OverviewPage } from "./(overview)/overview";
import { PlansPage } from "./(plans)/plans";
import { UsersPage } from "./(users)/users";
import { toast } from "@/components/ui/use-toast";

export default async function Page() {
  const session = await getSignedInUser();

  if (!(session.user.role == Role.ADMIN)) {
    toast({
      title: "No permission",
      description: "You don't have the role ADMIN and can't view this page. ",
    });
    redirect("/dashboard");
  }

  return (
    <main>
      <h1 className="font-display text-2xl mb-4 pb-4 dark:border-zinc-800 border-zinc-200 border-b">
        Admin
      </h1>
      <OverviewPage />
    </main>
  );
}
