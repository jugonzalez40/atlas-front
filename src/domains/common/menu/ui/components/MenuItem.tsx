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

  return (
    <Link
      href={href}
      className="flex p-2 w-full items-center whitespace-nowrap
      font-medium ring-offset-background transition-colors
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
      focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
      hover:bg-gray-100 hover:text-accent-foreground rounded-md"
    >
      <StaticIcon size={20} />
      <h3 className="ml-2 align-middle">{text}</h3>
    </Link>
  );
};
