import React from "react";

import { Button } from "@/components/ui/button";

import { WUsersTable } from "@/domains/users/ui/wrappers/WUsersTable";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageTitle } from "@/components/ui/page-title";
import { getUsers } from "@/domains/users/core/use-cases/getUsers";

export default async function UsersPage() {
  const users = (await getUsers()).data || [];

  return (
    <div className="flex-row mt-6">
      <PageTitle>Usuarios</PageTitle>
      <div className="mt-6">
        <WUsersTable users={users} />
        <Button asChild className="mt-6">
          <Link href="/hub/users/add">
            <Plus />
            Agregar
          </Link>
        </Button>
      </div>
    </div>
  );
}
