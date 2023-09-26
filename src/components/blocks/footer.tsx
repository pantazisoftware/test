import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <div className="dark:border-zinc-800 border-zinc-200 border-y">
      <div className="px-4 py-20 m-auto max-w-7xl">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-5">
          <div className="flex flex-col col-span-2 gap-6">
            <Link href="/">
              <Image
                width={30}
                height={30}
                alt="Logo"
                src="/logo.svg"
                className="w-10 h-10 rounded-full"
              />
            </Link>
            <p className="text-sm opacity-80">
              © Acme, Inc. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-neutral-600"> PRODUCT</p>
            <Link href="/components" className="text-base hover:underline">
              <p>Components</p>
            </Link>
            <Link href="/#pricing" className="text-base hover:underline">
              <p>Pricing</p>
            </Link>
            <Link href="/#features" className="text-base hover:underline">
              <p>Features</p>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-neutral-600">COMPANY</p>
            <Link
              href="https://discord.gg/sAcvuQACYQ"
              className="text-base hover:underline">
              <p>Discord</p>
            </Link>
            <Link href="/blog" className="text-base hover:underline">
              <p>Blog</p>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-neutral-600">LEGAL</p>
            <Link href="/#" className="text-base hover:underline">
              <p>Terms of Service</p>
            </Link>
            <Link href="/#" className="text-base hover:underline">
              <p>Privacy Policy</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
