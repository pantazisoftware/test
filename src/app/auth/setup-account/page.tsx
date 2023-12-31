import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/database";
import { getServerSession } from "next-auth";
import { OnboardingForm } from "./_components/onboarding-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findFirst({ where: { id: session?.user.id } });

  if (!user) {
    return redirect("/auth/sign-in");
  }

  return (
    <main className="w-full">
      <OnboardingForm user={user} />
    </main>
  );
}
