export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-radial from-white to-zinc-100 dark:from-zinc-900/60 dark:to-black">
      <div className="grid place-items-center sm:min-h-screen sm:py-0 py-8">
        <div className="flex flex-col">
          <h2 className="sm:text-3xl text-lg text-center pb-8">👋 Welcome, {"let's get started"}</h2>
          <div className="w-full sm:min-w-[400px] min-w-[300px] max-w-sm p-8 border dark:border-zinc-800 border-zinc-400 rounded-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
