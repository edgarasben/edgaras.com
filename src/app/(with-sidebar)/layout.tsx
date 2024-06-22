import { Header } from '@/components/header'
import React from 'react'

export default async function IndexPage({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full flex-col md:flex-row">
      <Header />
      <section className="w-full md:ml-[320px]">{children}</section>
    </div>
  )
}
