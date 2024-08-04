import { Header } from "@/components/blocks/header";
import HighightCode from "@/components/highlight-code";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getComponent } from "@/lib/components";

interface Params {
  slug: string;
}

export default async function Component({
  params,
}: {
  params: { slug: string };
}) {
  const component = await getComponent(params.slug);
  return (
    <main>
      <Header />
      <div className="w-full px-4 m-auto my-10 max-w-7xl">
        <p>Something new!!</p>
        <h1 className="pt-5 text-3xl font-bold lg:pt-10">{component!.name}</h1>
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <iframe
              className="w-full bg-transparent border border-gray-200 rounded-xl"
              srcDoc={
                `<script src="https://cdn.tailwindcss.com"></script><body class="bg-inherit">` +
                component!.code! +
                `</body>`
              }></iframe>
          </TabsContent>
          <TabsContent value="code">
            <HighightCode code={component!.code!} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
