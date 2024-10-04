import type { Metadata } from "next";
import Image from "next/image";
import AtlasPowered from "../../../public/atlaspowerd.png";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { WMenu } from "@/domains/common/menu/ui/wrappers/WMenu";
import { Button } from "@/components/ui/button";

import { DropdownMenuIcon } from "@radix-ui/react-icons";

import {
  CircleUserRound,
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WHeader } from "../../domains/common/menu/ui/wrappers/WHeader";

export const metadata: Metadata = {
  title: "Atlas - Codima",
  description: "wharap",
};

export default function HubLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // init();
  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="w-[200px]  ">
        <div className="w-full px-2 py-2 bg-primary h-[60px]">
          <Image
            alt="Atlas logo"
            src={AtlasPowered}
            width={0}
            height={0}
            className="cursor-pointer"
          />
        </div>

        <div className="w-full h-[calc(100%-60px)]">
          <WMenu />
        </div>
      </div>
      <div className="flex flex-auto flex-col">
        <WHeader />

        <div className="w-full h-[calc(100%-60px)] bg-gray-100 px-6 py-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {children}
        </div>
      </div>
    </div>
  );
}
