import React from "react";

import { Button } from "@/components/ui/button";

import { WClientsTable } from "@/domains/clients/ui/wrappers/WClientsTable";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageTitle } from "@/components/ui/page-title";
import { getClients } from "@/domains/clients/core/use-cases/getClients";

export default async function ClientsPage() {
  const clients = (await getClients()).data || [];

  return (
    <div className="flex-row mt-6">
      <PageTitle>Clientes</PageTitle>
      <div className="mt-6">
        <WClientsTable clients={clients} />
        <Button asChild className="mt-6">
          <Link href="/hub/clients/add">
            <Plus />
            Agregar
          </Link>
        </Button>
      </div>
    </div>
  );
}
