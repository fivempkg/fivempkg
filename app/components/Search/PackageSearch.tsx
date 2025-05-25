import { useRouteLoaderData } from "react-router";

export default function PackageSearch() {
  const packages = useRouteLoaderData("routes/home");

  return (
    <div className="bg-accent border rounded-md p-2 shadow-sm">
      <div className="space-y-1">
        {packages &&
          packages.map((pkg) => (
            <div className="hover:bg-neutral-200/50 p-1.5 rounded-md">
              <p className="text-sm">{pkg.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
