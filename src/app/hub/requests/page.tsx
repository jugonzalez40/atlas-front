import React from "react";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { Plus } from "lucide-react";
import { PageTitle } from "@/components/ui/page-title";
import { getRequests } from "@/domains/requests/core/use-cases/getRequests";
import { RequestStoreProvider } from "@/domains/requests/data/RequestProvider";
import { WRequestsList } from "@/domains/requests/ui/wrappers/WRequestsList";
import { WRequestsFilter } from "@/domains/requests/ui/wrappers/WRequestsFilter";
import { getRequestsView } from "@/domains/requests/core/use-cases/getRequestsView";

export default async function RequestsPage() {
  const result = await getRequestsView();

  if (!result.data) return;

  const { requests, filters } = result.data;

  return (
    <div className="flex-row mt-6">
      <PageTitle>Solicitudes</PageTitle>
      <div className="mt-6">
        <RequestStoreProvider requests={requests}>
          <WRequestsFilter {...filters} />
          <WRequestsList />
          <Button asChild className="mt-6">
            <Link href="/hub/requests/add">
              <Plus />
              Agregar
            </Link>
          </Button>
        </RequestStoreProvider>
      </div>
    </div>
  );
}
