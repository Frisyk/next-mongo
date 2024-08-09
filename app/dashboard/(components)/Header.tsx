'use client'
import React from 'react'
import Link from 'next/link'
import { PackageIcon } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export default function Header({username, point}: {username: string, point: number}) {
    const path = usePathname().split('/').pop()
  return (
    <header className="flex h-14 items-center border-b border-purple-100 px-4 md:gap-4">
          <Link
            className="flex items-center rounded-md bg-purple-100 px-2 py-2 lg:hidden"
            href="#"
          >
            <PackageIcon className="h-6 w-6" />
            <span className="sr-only">Batik</span>
          </Link>
          <h1 className="md:block hidden text-lg font-semibold capitalize">{path}</h1>
          <div className="ml-auto flex items-center gap-2">
            <h1>Halo, </h1><span className='uppercase font-semibold'>{username}!</span>
            <Button className="rounded-full hidden md:block bg-purple-300" size="icon" variant="ghost">
              <div
                className="rounded-full "
                style={{
                  aspectRatio: '32/32',
                  objectFit: 'cover',
                }}
              />
              <span className="sr-only">View profile</span>
            </Button>
          <h1 className='font-bold p-2 hidden md:block rounded bg-purple-900 text-white'>{`${point}✨`}</h1>
          </div>
          </header>
  )
}
