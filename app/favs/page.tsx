import type { Metadata } from "next"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from "@/types/supabase"

type Fav = Database['public']['Tables']['favs']['Row']

export const revalidate = 30 // revalidate every 30 secs

export const metadata: Metadata = {
  title: 'Favs'
}
export default async function FavsPage({ searchParams }: any) {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data } = await supabase.from('favs').select('title, tags, link')

  // Group Favs by tags
  const groupedFavs = data?.reduce((acc: any, fav: any) => {
    fav.tags?.forEach((tag: string) => {
      if (!acc[tag]) {
        acc[tag] = []
      }
      acc[tag].push(fav)
    })
    return acc
  }, {})

return   (  <nav className="h-full overflow-y-auto" aria-label="Directory">
{Object.keys(groupedFavs).map((tag) => (
  <div key={tag} className="relative">
    <div className="sticky top-0 z-10 border-y bg-neutral border-b-border-neutral-faded border-t-border-neutral-faded px-3 py-1.5 text-sm font-semibold leading-6 text-fg-primary">
      <h3>{tag}</h3>
    </div>
    <ul role="list" className="divide-y divide-border-neutral-faded">
      {groupedFavs[tag].map((fav: Fav) => (
       fav.link &&  
       ( <a key={fav.link} href={fav.link} className="block hover:bg-neutral transition-colors">
        <li className="flex gap-x-4 px-3 py-5">
       <div className="min-w-0 pl-3">
         <p className="text-sm font-semibold leading-6 text-fg-neutral">{fav.title}</p>
       </div>
     </li></a> )
      ))}
    </ul>
  </div>
))}
</nav>)
}