import React from "react";

import { Button } from "@/components/ui/button";

// import { WCostsTable } from "@/domains/costs/ui/wrappers/WCostsTable";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageTitle } from "@/components/ui/page-title";

import { WCostsTable } from "@/domains/costs/ui/wrappers/WCostTable";
import { getCosts } from "@/domains/costs/core/use-cases/getCosts";

export default async function CostsPage() {
  const costs = (await getCosts()).data || [];

  return (
    <div className="flex-row mt-6">
      <PageTitle>Costos</PageTitle>
      <div className="mt-6">
        <WCostsTable costs={costs} />
        <Button asChild className="mt-6">
          <Link href="/hub/costs/add">
            <Plus />
            Agregar
          </Link>
        </Button>
      </div>
    </div>
  );
}
