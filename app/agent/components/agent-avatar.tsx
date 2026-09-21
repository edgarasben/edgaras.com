import Image from "next/image";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "size-7",
  md: "size-9",
  lg: "size-20 lg:size-24",
  xl: "size-32"
};

export function AgentAvatar({
  size = "md",
  priority = false,
  className,
}: {
  size?: keyof typeof sizes;
  priority?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full bg-black",
        sizes[size],
        className,
      )}
    >
      <Image
        src="/edgaras-dithered.png"
        alt="Edgaras Benediktavičius"
        fill
        priority={priority}
        sizes="96px"
        className="object-cover"
      />
    </span>
  );
}
