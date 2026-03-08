interface SkeletonProps {
  width?: string | number
  height?: string | number
  count?: number
  className?: string
}

export function Skeleton({
  width = "100%",
  height = "24px",
  count = 1,
  className = "",
}: SkeletonProps) {
  if (count === 1) {
    return (
      <div
        style={{ width, height }}
        className={`bg-gray-200 animate-pulse rounded-md ${className}`}
      />
    )
  } else {
    const skeletons = Array.from({ length: count }, (_, index) => (
      <div
        key={index}
        style={{ width, height }}
        className={`bg-gray-200 animate-pulse rounded-md ${className}`}
      />
    ))
    return <div className="flex flex-col gap-3 w-full">{skeletons}</div>
  }
}
