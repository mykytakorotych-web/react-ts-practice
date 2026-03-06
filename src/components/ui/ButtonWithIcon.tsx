import type { LucideIcon } from "lucide-react"
import type { ButtonHTMLAttributes } from "react"

interface ButtonWithIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: LucideIcon
  additionalStyles?: string
}

export function ButtonWithIcon({
  Icon,
  additionalStyles,
  ...props
}: ButtonWithIconProps) {
  return (
    <button
      className={`p-2 hover:bg-secondary-foreground/10 rounded-full duration-300 ${additionalStyles}`}
      {...props}
    >
      <Icon />
    </button>
  )
}
