import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { useFormStore } from "../../hooks/useFormStore";

interface IWSubmitProps {
  text: string;
}

export const WSubmit = ({ text }: IWSubmitProps) => {
  const { isFetching } = useFormStore(
    useShallow((state) => ({
      isFetching: state.isFetching,
    }))
  );

  return (
    <Button type="submit" size="lg" disabled={isFetching}>
      {isFetching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {text}
    </Button>
  );
};

// export const WSubmit = memo(Component);
