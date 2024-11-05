import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getMeuStructure } from "../../core/use-cases/getMenuStructure";

import { AuthService } from "@/services/AuthService";
import { headers } from "next/headers";

export const WMenu = async () => {
  const userMetadata = AuthService.getUserMetadata();
  const menuStructure = await getMeuStructure(userMetadata);

  // read the custom x-url header
  const url = headers().get("referer") || "";

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>{userMetadata.role.name}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuStructure.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                    {/* {url.includes(item.url) && (
                      <span className="w-1 h-full bg-primary block absolute right-[-8px]" />
                    )} */}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};
