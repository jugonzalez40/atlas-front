import React from "react";

import { Button } from "@/components/ui/button";

import { WMachinesTable } from "@/domains/machines/ui/wrappers/WMachinesTable";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageTitle } from "@/components/ui/page-title";
import { getMachines } from "@/domains/machines/core/use-cases/getMachines";

export default async function MachinesPage() {
  const machines = (await getMachines()).data || [];

  return (
    <div className="flex-row mt-6">
      <PageTitle>Maquinas</PageTitle>
      <div className="mt-6">
        <WMachinesTable machines={machines} />
        <Button asChild className="mt-6">
          <Link href="/hub/machines/add">
            <Plus />
            Agregar
          </Link>
        </Button>
      </div>
    </div>
  );
}
