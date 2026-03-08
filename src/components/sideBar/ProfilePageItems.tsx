import { AtSign, Cake, Phone } from "lucide-react"
import type { IUser } from "../../types/user.types"
import { formatDate } from "../../utils/formatDate"
import { InfoRow } from "../ui/InfoRow"
import { LogoutButton } from "../ui/LogoutButton"

export function ProfilePageItems({ user }: { user: IUser | undefined }) {
  return (
    <>
      <div className="flex flex-col px-2 mb-4">
        <InfoRow
          Icon={Phone}
          title={user?.phone || "+1 234 567 890"}
          subtitle="Phone"
        />
        <InfoRow
          Icon={AtSign}
          title={`@${user?.username}`}
          subtitle="Username"
        />
        <InfoRow
          Icon={Cake}
          title={user?.birthDate ? formatDate(user.birthDate) : "Not provided."}
          subtitle="Birth Date"
        />
      </div>

      <div className="h-px bg-gray-200 my-1.5 mx-2" />

      <div className="flex flex-col mt-2">
        <LogoutButton />
      </div>
    </>
  )
}
