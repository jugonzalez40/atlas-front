import { SidebarHeader } from "@/components/ui/sidebar";
import Image from "next/image";
import AtlasPowered from "../../../../../../public/logo_v1.png";

export const WHeader = () => {
  return (
    <SidebarHeader className="border-b-2 px-8 py-2 items-center">
      <Image
        alt="Atlas logo"
        src={AtlasPowered}
        width={110}
        height={0}
        className="cursor-pointer"
      />
    </SidebarHeader>
  );
};
