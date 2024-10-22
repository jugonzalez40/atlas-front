import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { useFormStore } from "../../core/hooks/useFormStore";
import { TIcon } from "types/config";
import { cn } from "@/lib/utils";

interface IWSubmitProps {
  text: string;
  size?: "lg" | "default" | "sm" | "icon" | null | undefined;
  className?: string;
  icon?: TIcon;
}

export const WSubmit = ({
  text,
  size = "lg",
  className,
  icon,
}: IWSubmitProps) => {
  const { isFetching } = useFormStore(
    useShallow((state) => ({
      isFetching: state.isFetching,
    }))
  );

  return (
    <Button
      className={cn(className, "font-semibold")}
      type="submit"
      size={size}
      disabled={isFetching}
    >
      {isFetching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isFetching && icon}
      {text}
    </Button>
  );
};

// export const WSubmit = memo(Component);
