import { Header } from "~/components/Header";
import type { Route } from "./+types/home";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import PackageSearch from "~/components/Search/PackageSearch";
import { database } from "~/database/context";
import { desc, eq } from "drizzle-orm";
import { packages, packageVersions } from "~/database/schema";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "fivempkg" },
    { name: "description", content: "fivempkg - FiveM CLI" },
  ];
}

export async function loader() {
  const pkgs = await database().query.packages.findMany({
    with: {
      packageVersions: {
        orderBy: desc(packageVersions.publishedAt),
        limit: 1,
      },
    },
  });
  return pkgs;
}

export default function Home() {
  return (
    <main className="w-full mx-auto max-w-5xl min-h-screen w-screen">
      <Header />

      <div className="mt-4 flex items-stretch space-x-2">
        <div className="w-full space-y-1">
          <Input
            className="w-full px-3 py-2 text-sm bg-gray-100 outline-none active:ring-1 focus:ring-1 ring-black"
            placeholder="Search packages..."
          />

          <PackageSearch />
        </div>

        <Button className="bg-black text-white text-sm px-4 font-medium">
          Search
        </Button>
      </div>
    </main>
  );
}
