import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { memo } from "react"



interface ISubmitButtonProps {
	isLoading: boolean
	text: string
}

const Component = ({ isLoading, text }: ISubmitButtonProps) => {

	return (
		<Button type="submit" size="lg" disabled={isLoading}>
			{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
			{text}
		</Button>
	)
}

export const SubmitButton = memo(Component);
