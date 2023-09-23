import { Header } from "@/components/blocks/header";
import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";
import { getComponents } from "@/lib/components";
import Image from "next/image";
import Link from "next/link";



export default async function Components() {
  const components = await getComponents();
  return (
    <main>
      <Header />
      <div className="w-full px-4 m-auto my-10 max-w-7xl">
        <h1 className="pt-5 text-3xl font-bold lg:pt-10">Components Page</h1>
        <p className="mb-5 text-gray-500 lg:mb-10">Discover our latest components</p>
        <div className="grid grid-cols-12 gap-4 lg:gap-8">
          {components && components.map((component) => (
            <Card key={component.id} className="col-span-12 md:col-span-6 lg:col-span-4">
              <CardHeader className="flex flex-row items-center justify-between">
                <Link href={`components/${component.slug}`} className="inline-flex items-center space-x-2 font-medium group">
                  <p>{component.name}</p>
                  <svg fill="none" className="w-4 h-4 transition duration-150 ease-linear group-hover:translate-x-2" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
</svg>

                </Link>
                {component.pro ? 
                  <Link href="/componen" className="inline-flex items-center space-x-2 text-xs font-medium transition-all duration-150 ease-linear hover:underline underline-offset-2">
                    <svg fill="none" stroke="currentColor" strokeWidth={2}  className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
</svg>
                    <span>Get Code</span></Link>
                 : '' }
                
              </CardHeader>
              <CardContent>
                <Image src={`${component.thumb}`} layout="responsive" width={100} height={70} className="object-cover rounded-lg" alt={`${component.name}`} />
                <div className="flex flex-row justify-between w-full mt-3 rounded-lg">
                  <p className="inline-flex items-center space-x-2">
                    <svg fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
</svg>
                    <span className="text-sm">{component.category?.name}</span></p>
                    <p className="inline-flex space-x-2 text-sm itmes-center">
                      <svg fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>
                      <span>{component.pro ? 'Pro' : 'Free'}</span></p>
                </div>
                </CardContent>
              </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
