import { Header } from "@/components/blocks/header";
import { getComponents } from "@/lib/components";



export default async function Components() {
  const components = await getComponents();
  return (
    <main>
      <Header />
      <div className="w-full m-auto my-10 max-w-7xl">
        <h1 className="text-3xl font-bold">Components Page</h1>
        <div className="grid grid-cols-12 gap-4 lg:gap-8">
          {components.map((component) => (
            <div key={component.id}>
              {component.name}
              </div>
          ))}
        </div>
      </div>
    </main>
  );
}
