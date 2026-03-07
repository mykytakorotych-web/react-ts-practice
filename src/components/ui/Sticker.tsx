import type { StickersList } from "../../types/sticker.types"

export function Sticker({ name }: { name: StickersList }) {
  return (
    <div className="flex justify-center">
      <img
        className="max-w-50"
        src={`/stickers/${name}.png`}
        alt="I don't know Sticker"
      />
    </div>
  )
}
