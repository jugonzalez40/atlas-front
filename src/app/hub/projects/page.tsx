import React from "react";

import { Button } from "@/components/ui/button";

import { WProjectsTable } from "@/domains/projects/ui/wrappers/WProjectsTable";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageTitle } from "@/components/ui/page-title";
import { getProjects } from "@/domains/projects/core/use-cases/getProjects";

export default async function ProjectsPage() {
  const projects = (await getProjects()).data || [];

  return (
    <div className="flex-row mt-6">
      <PageTitle>Proyectos</PageTitle>
      <div className="mt-6">
        <WProjectsTable projects={projects} />
        <Button asChild className="mt-6">
          <Link href="/hub/projects/add">
            <Plus />
            Agregar
          </Link>
        </Button>
      </div>
    </div>
  );
}
