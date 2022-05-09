import { ReactNode } from "react"
import { SpinnerGreenSmall } from "./Spinner"

interface SubmitButtonProps {
  isLoading?: boolean
  children: ReactNode
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  isLoading,
}) => {
  if (isLoading) return <SpinnerGreenSmall />

  return (
    <button className="w-full py-2 px-4 bg-primary hover:bg-green-600 rounded text-black font-bold">
      {children}
    </button>
  )
}
