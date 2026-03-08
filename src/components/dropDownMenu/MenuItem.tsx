interface MenuItemProps {
  icon: React.ElementType
  label: string
  isWorking?: boolean
  onClick?: () => void
}

export function MenuItem({
  icon: Icon,
  label,
  isWorking = false,
  onClick,
}: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center px-4 py-2.5 hover:bg-chat-background transition-colors text-left"
    >
      <Icon className="w-5 h-5 text-secondary-foreground mr-4 stroke-[1.5]" />

      <span
        className={`flex-1 text-[15px] font-medium ${isWorking ? "text-foreground" : "text-secondary-foreground"}`}
      >
        {label}
      </span>
    </button>
  )
}
