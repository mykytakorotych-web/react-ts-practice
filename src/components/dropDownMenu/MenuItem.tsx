import { ChevronRight } from "lucide-react"

// Вспомогательный компонент для пунктов меню, чтобы не дублировать код
interface MenuItemProps {
  icon: React.ElementType
  label: string
  badge?: string | number
  hasArrow?: boolean
  onClick?: () => void
}

export function MenuItem({
  icon: Icon,
  label,
  badge,
  hasArrow,
  onClick,
}: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center px-4 py-2.5 hover:bg-gray-100 transition-colors text-left"
    >
      {/* Иконка */}
      <Icon className="w-5 h-5 text-gray-500 mr-4 stroke-[1.5]" />

      {/* Текст */}
      <span className="flex-1 text-[15px] font-medium text-foreground">
        {label}
      </span>

      {badge && (
        <span className="text-sm font-medium text-gray-400">{badge}</span>
      )}
      {hasArrow && <ChevronRight className="w-4 h-4 text-gray-300 stroke-2" />}
    </button>
  )
}
