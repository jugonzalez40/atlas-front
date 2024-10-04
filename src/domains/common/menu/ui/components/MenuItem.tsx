import { cn } from "@/lib/utils";
import {
  ArchiveRestore,
  BookUser,
  Forklift,
  HandCoins,
  Handshake,
  Notebook,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import { headers } from "next/headers";

export interface IMenuItemProps {
  href: string;
  text: string;
  id: string;
}

const MENU_STATICS_CONFIG = {
  REQUESTS_VIEW: {
    icon: ArchiveRestore,
  },
  MACHINES_VIEW: { icon: Forklift },
  OPERATORS_VIEW: { icon: BookUser },
  CLIENTS_VIEW: { icon: Handshake },
  COSTS_VIEW: { icon: HandCoins },
  PROJECTS_VIEW: { icon: Notebook },
};

type TMenuStatics = keyof typeof MENU_STATICS_CONFIG;

export const MenuItem = ({ href, text, id }: IMenuItemProps) => {
  const staticConfig = MENU_STATICS_CONFIG[id as TMenuStatics];

  const StaticIcon = Boolean(staticConfig)
    ? MENU_STATICS_CONFIG[id as TMenuStatics].icon
    : ArchiveRestore;

  const baseStyles = `flex px-2 py-1 mb-1 w-full items-center whitespace-nowrap
      ring-offset-background transition-colors
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
      focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
      hover:bg-gray-100 hover:text-accent-foreground rounded-md`;

  const pathUrl = headers().get("referer");
  const isActive = pathUrl?.includes(href);

  return (
    <Link
      href={href}
      className={cn(baseStyles, { "bg-primary text-muted hover:bg-primary hover:text-muted": isActive })}
    >
      <StaticIcon className="h-4 w-4" />
      <p className="ml-2 align-middle text-base">{text}</p>
    </Link>
  );
};
