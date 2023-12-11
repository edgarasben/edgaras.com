import { Header } from '@/components/header'
import React from 'react'

export default async function IndexPage({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full">
      <Header />
      <section className="ml-[320px] w-full">{children}</section>
    </div>
  )
}
