'use client';
import { Skeleton } from '@/app/components';
import React from 'react'
import {AiFillBug} from 'react-icons/ai';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const NavBar = () => {


  return (
    <nav className='border-b mb-5 px-5 h-14 py-3'>
      <Container>
      <Flex justify='between'>
        <Flex align='center' gap='3'>
          <Link href='/'>
            <AiFillBug/>
          </Link>
          <NavLinks />
        </Flex>
        <AuthStatus />
      </Flex>
      </Container>
    </nav>
  )
};

const NavLinks = () => { 
    const currentPath = usePathname();

    type Link = {
      label: string;
      href: string;
  }

  const links: Link[] = [
      {label: 'Dashboard', href:'/'},
      {label: 'Issues', href:'/issues/list'},
  ]

  return <ul className='flex space-x-6'>
            {links.map(link => 
            <li 
              key={link.href}
            >
              <Link 
                href={link.href}
                className={classnames({
                    "nav-link": true,
                    '!text-zinc-900': link.href === currentPath,
                })}
            >
                {link.label}
              </Link>
              </li>
              )}
          </ul>
}


const AuthStatus = () =>{
  const {status,data: session} = useSession();

  if(status === 'loading') return <Skeleton width="3rem" />;

  if (status === 'unauthenticated')
    return <Link href='/api/auth/signin'>Login</Link>;

  return (<Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar className='cursor-pointer' src={session!.user!.image!} fallback='?' referrerPolicy='no-referrer'  size='2' radius='full'/>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size='2'>{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href='/api/auth/signout'>Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>)
}

export default NavBar
