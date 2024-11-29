import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";

import { WHeader } from "@/domains/shared/menu/ui/wrappers/WHeader";
import { WMenu } from "@/domains/shared/menu/ui/wrappers/WMenu";
import { WFooter } from "@/domains/shared/menu/ui/wrappers/WFooter";

import { MenuBread } from "@/domains/shared/menu/ui/components/MenuBread";
import { WUserInitializator } from "@/domains/shared/auth/ui/wrappers/WUserInitializator";

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <WUserInitializator />
      <Sidebar>
        <WHeader />
        <WMenu />
        <WFooter />
      </Sidebar>
      <main className="h-screen w-full p-4 md:px-6  ">
        <MenuBread />
        {children}
      </main>
    </SidebarProvider>
  );
}
