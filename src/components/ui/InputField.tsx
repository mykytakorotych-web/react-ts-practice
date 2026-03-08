import type { LucideIcon } from "lucide-react"
import type { InputHTMLAttributes } from "react"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string
  Icon: LucideIcon // Например, ваша иконка <Phone />
}

export function InputField({
  labelText,
  Icon,
  placeholder,
  id,
  type,
  ...props
}: Props) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-3 w-full bg-window-background rounded-md cursor-text transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
    >
      <span className="sr-only">{labelText}</span>
      <div className="bg-primary shrink-0 flex items-center justify-center p-3 rounded-l-md text-background">
        <Icon size={24} />
      </div>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="flex-1 bg-transparent border-none outline-none text-foreground"
        {...props}
      />
    </label>
  )
}
