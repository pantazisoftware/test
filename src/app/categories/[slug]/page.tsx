import { Header } from "@/components/blocks/header";

export default async function Category({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <main>
      <Header />
      <div className="w-full px-4 m-auto my-10 max-w-7xl">
        <h1 className="pt-5 text-3xl font-bold lg:pt-10">Category name</h1>
        <p>components listed here based on category</p>
      </div>
    </main>
  );
}
