import React from 'react'
import {AiFillBug} from 'react-icons/ai'
const NavBar = () => {
    type Link = {
        label: string;
        href: string;
    }

    const links: Link[] = [
        {label: 'Dashboard', href:'/'},
        {label: 'Issues', href:'/issues'},
    ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href='/'><AiFillBug/></Link>
      <ul className='flex space-x-6'>
        {links.map(link => 
        <Link 
            key={link.href}
            href={link.href}
            className='text-zinc-500 hover:text-zinc transition-color'
            >{link.label}</Link>)}
      </ul>
    </nav>
  )
}

export default NavBar
