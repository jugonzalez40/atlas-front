import { SidebarHeader } from "@/components/ui/sidebar";
import Image from "next/image";
import AtlasPowered from "../../../../../../public/atlaspowerd.png";

export const WHeader = () => {
  return (
    <SidebarHeader className="bg-primary px-8 py-2">
      <Image
        alt="Atlas logo"
        src={AtlasPowered}
        width={0}
        height={0}
        className="cursor-pointer"
      />
    </SidebarHeader>
  );
};
