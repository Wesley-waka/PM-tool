'use client';
import React from 'react'
import {AiFillBug} from 'react-icons/ai';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box, Container, Flex } from '@radix-ui/themes';

const NavBar = () => {
    const currentPath = usePathname();
    const {status,data: session} = useSession();


    console.log(currentPath);

    type Link = {
        label: string;
        href: string;
    }

    const links: Link[] = [
        {label: 'Dashboard', href:'/'},
        {label: 'Issues', href:'/issues/list'},
    ]

  return (
    <nav className='border-b mb-5 px-5 h-14 py-3'>
      <Container>
      <Flex justify='between'>
        <Flex align='center' gap='3'>
            <ul className='flex space-x-6'>
            {links.map(link => 
            <li 
              key={link.href}
            >
              <Link 
                href={link.href}
                className={classnames({
                    'text-zinc-900': link.href === currentPath,
                    'text-zinc-500': link.href !== currentPath,
                    'hover:text-zinc-800 transition-colors': true
                })}
            >
                {link.label}
              </Link>
              </li>
              )}
          </ul>
        </Flex>

        <Box>
        {status === "authenticated" && <Link href='/api/auth/signout'></Link>}
        {status === "unauthenticated" && <Link href='/api/auth/signin'></Link>}
        </Box>
      </Flex>

      <Link href='/'>
        <AiFillBug/>
      </Link>
      </Container>
      
      
    </nav>
  )
}

export default NavBar
