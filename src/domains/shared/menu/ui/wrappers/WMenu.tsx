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

export const WMenu = async () => {
  const userMetadata = AuthService.getUserMetadata();
  const menuStructure = await getMeuStructure(userMetadata);

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
