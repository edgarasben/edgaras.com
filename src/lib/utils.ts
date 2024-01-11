import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export const getRootURL = () => {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL_LIVE ?? // Set this to your site URL in production env.
    process.env.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    `http://localhost:3000`
  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`
  // Make sure to including trailing `/`.
  /*   url = url.charAt(url.length - 1) === "/" ? url : `${url}/` */
  return url
}
