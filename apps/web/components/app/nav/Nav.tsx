'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { ModeToggle } from '@/components/ui/themeToggler'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

const Nav = () => {
  const { data: session } = useSession()

  return (
    <Card className="main-container fixed top-0 left-0 right-0 md:top-4 md:left-4 md:right-4 rounded-none md:border-none md:rounded-2xl shadow-lg z-50">
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <h3 className='text-lg'>SuperChat</h3>
          <ModeToggle />

        </div>
        <div className='relative'>
          {
            session?.user?.image ? <div>
              <Popover>
                <PopoverTrigger className='outline-none shadow-lg rounded-full hidden md:block'>
                  <Avatar className='cursor-pointer'>
                    <AvatarImage src={session.user.image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className='p-0 rounded-lg border-none w-fit mr-5'>
                  <Card className='p-2 shadow-lg rounded-lg cursor-pointer' onClick={() => signOut()}>Log out</Card>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger className='outline-none shadow-lg rounded-full md:hidden'>
                  <HamburgerMenuIcon className='w-6 h-6 shadow-none' />
                </PopoverTrigger>
                <PopoverContent className='p-0 rounded-lg border-none w-fit mr-5'>
                  <Card className='p-2 w-fit shadow-lg rounded-lg cursor-pointer'>
                    <ul className=''>
                      <li className='mb-3' ><Link href={'/friends'} >Friends</Link></li>
                      <li className='mb-3' ><Link href={'/profile'} >Profile</Link></li>
                      <li className=''><Button className='' onClick={() => signOut()} >Log out</Button></li>
                    </ul>
                  </Card>
                </PopoverContent>
              </Popover>
            </div> : <Button className='p-5 rounded-lg shadow-lg' onClick={() => signIn()}>
              Login
            </Button>
          }
        </div>
      </div>
    </Card >
  )
}

export default Nav
