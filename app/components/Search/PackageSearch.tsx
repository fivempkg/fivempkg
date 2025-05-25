import { useRouteLoaderData } from "react-router";
import type { Package } from "~/database/schema";

export default function PackageSearch() {
  const packages = useRouteLoaderData("routes/home") as Package[];

  console.log(packages);

  return (
    <div className="bg-white border rounded-md p-2 shadow-sm">
      <div className="space-y-1">
        {packages &&
          packages.map((pkg) => (
            <div className="hover:bg-accent p-1.5 rounded-md flex flex-row justify-between">
              <p className="text-sm">{pkg.name}</p>
              <p className="text-xs">
                updated at:{" "}
                {pkg.packageVersions[0]?.publishedAt.toDateString() ??
                  pkg.createdAt.toDateString()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
