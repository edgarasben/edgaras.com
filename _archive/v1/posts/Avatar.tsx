import Image from 'next/image'
export function Avatar() {
  return (
    <Image
      src="/avatar.jpg"
      className="border-bg-base w-12 h-12 rounded-full border-2 shadow-md"
      alt="Edgaras avatar"
      width={48}
      height={48}
    />
  )
}
