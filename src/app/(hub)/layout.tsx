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
    <div className="flex flex-row w-screen h-screen border-4">
      <div className="w-[200px]  ">
        <div className="w-full px-2 py-4 border-b-4 bg-primary">
          <Image
            alt="Atlas logo"
            src={AtlasPowered}
            width={0}
            height={0}
            className="w-full cursor-pointer"
          />
        </div>

        <div className="w-full border-r-4 h-[calc(100%-100px)]">
          <WMenu />
        </div>
      </div>
      <div className="flex flex-auto flex-col">
        <div className="h-[100px] bg-primary border-b-4">
          <Avatar className="w-14 h-14">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div>
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
