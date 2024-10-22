"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { NAVIGATION_MAP } from "../../data/navigation";
import React from "react";

export const MenuBread = () => {
  const pathname = usePathname();
  const breads = NAVIGATION_MAP.filter(({ url }) => {
    const pathFragments = pathname.split("/");
    const urlFragments = url.split("/");

    const realUrl = urlFragments
      .map((fragment, index) =>
        fragment.replace("*", pathFragments[index] || "*")
      )
      .join("/");

    return pathname.includes(realUrl);
  });

  return (
    <div className="flex">
      <SidebarTrigger className="mr-3" />
      <Breadcrumb>
        <BreadcrumbList>
          {breads.map((bread, index) => (
            <React.Fragment key={`br_${bread.title}`}>
              <BreadcrumbItem>
                <BreadcrumbLink href={bread.url}>{bread.title}</BreadcrumbLink>
              </BreadcrumbItem>
              {index !== breads.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
