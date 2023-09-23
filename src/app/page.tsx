import { Footer } from "@/components/blocks/footer";
import { Header } from "@/components/blocks/header";
import { PricingTable } from "@/components/blocks/pricing/pricing-table";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import { getCompletedPlans } from "@/lib/billing";
import {
  ChevronRightCircle,
  Code2,
  CreditCard,
  Lock,
  Mail,
  Paintbrush,
  Server,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const plans = await getCompletedPlans();

  return (
    <main>
      <Header />
      <Hero />
      <div className={"relative z-10"}>
        <div className="z-10 w-full p-4 m-auto border max-w-7xl border-white/30 sm:p-8 bg-white/20 rounded-3xl">
          <Image
            alt="Billing"
            layout="responsive"
            width={100}
            height={100}
            src="/assets/billing.png"
            className="z-10 p-4 bg-black rounded-xl"
          />
        </div>
        <div className="top-20 bottom-20 w-full bg-gradient-conic from-teal-500 via-blue-600 to-indigo-900 absolute z-[-1]" />
      </div>
      <Features />
      <div className="px-4 py-20" id="pricing">
        <PricingTable plans={plans} />
      </div>
      <Footer />
    </main>
  );
}

function Features() {
  return (
    <div className="w-full max-w-4xl px-4 py-20 m-auto">
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-8">
          <FeatureCard
            icon={<Lock size={16} />}
            feature="Authentication"
            description="Use any OAuth provider supported by next-auth."
          />
          <FeatureCard
            icon={<CreditCard size={16} />}
            feature="Subscriptions"
            description="Create monthly and yearly billing plans. Let users manage thier billing plan."
          />
          <FeatureCard
            icon={<Paintbrush size={16} />}
            feature="Fully customizable"
            description="Fully customizable component library using Tailwind."
          />
        </div>
        <div className="flex flex-col gap-8">
          <FeatureCard
            icon={<Mail size={16} />}
            feature="Mail templates"
            description="Create email templates using react-email."
          />
          <FeatureCard
            icon={<Server size={16} />}
            feature="Serverless architecture"
            description="Deploy painlessly using Vercel or any serverless provider."
          />
          <FeatureCard
            icon={<Code2 size={16} />}
            feature="Developer experience"
            description="Easy to use, clean code, expertly crafted."
          />
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="max-w-7xl m-auto px-4 min-h-[70vh] grid items-center ">
      <div className="flex flex-col items-center">
        <h1 className="max-w-4xl text-4xl text-center text-transparent bg-gradient-to-r dark:from-white dark:to-zinc-300 from-black to-zinc-700 bg-clip-text sm:text-5xl sm:leading-none lg:text-6xl">
          Build this weekend.
          <br />
          <span className="text-transparent bg-gradient-to-r from-violet-500 via-rose-500 to-amber-500 bg-clip-text">
            Ship on monday.
          </span>
        </h1>
        <p className="text-center py-6 text-sm sm:text-base lg:text-lg text-muted max-w-[60ch] opacity-80">
          The best NextJS kit for starting and scaling your software business.
        </p>
        <div className="flex items-center gap-4">
          <Link href={"/starter-kits"}>
            <Button className="gap-2 rounded-full">
              Sign in
              <ChevronRightCircle size={16} />
            </Button>
          </Link>
          <Link href={"/templates"}>
            <Button variant={"ghost"} className="gap-2 rounded-full">
              Setup guide
              <ChevronRightCircle size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
