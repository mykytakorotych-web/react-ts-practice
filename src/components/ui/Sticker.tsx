import type { ImgHTMLAttributes } from "react"
import type { TStickersList } from "../../types/sticker.types"

interface StickerProps extends ImgHTMLAttributes<HTMLImageElement> {
  name: TStickersList
}

export function Sticker({ name, ...props }: StickerProps) {
  return (
    <div className="flex justify-center">
      <img
        className="w-50"
        width={200}
        height={200}
        src={`/stickers/${name}.webp`}
        alt={`${name} Sticker`}
        {...props}
      />
    </div>
  )
}
