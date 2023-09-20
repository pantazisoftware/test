import { prisma } from "./database";

export async function getComponents() {
  const allComponents = await prisma.components.findMany({
    where: { status: true },
    include: { category: true },
  });
  return allComponents;
}

export async function getComponent(slug: string) {
  // TODO
  // ----------------------------------------------------------------
  // DO SOME FILTERING WITH THE PRO COMPONENTS; CHECK IF THE USER HAS THE PRO ACCESS.
  // ----------------------------------------------------------------

  const component = await prisma.components.findUnique({
    where: { slug: slug },
    include: { category: true },
  });
  return component;
}
