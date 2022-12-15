'use client'

import HomeIcon from '@/components/icons/home-icon'
import MoonIcon from '@/components/icons/moon-icon'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const NavigationBar = () => {
    const pathname = usePathname()

    const links = [
        {
            label: 'Home',
            path: '/',
            icon: <HomeIcon className="h-5 w-5" />,
        },
        {
            label: 'Posts',
            path: '/posts',
            icon: null,
        },
        {
            label: 'Lab',
            path: '/lab',
            icon: null,
        },
        {
            label: 'Uses',
            path: '/uses',
            icon: null,
        },
        {
            label: 'About',
            path: '/about',
            icon: null,
        },
        {
            label: 'Now',
            path: '/now',
            icon: null,
        },
        {
            label: 'Theme',
            path: null,
            icon: <MoonIcon className="h-5 w-5" />,
        },
    ]

    return (
        <div className="fixed inset-x-0 bottom-0 flex justify-center py-4">
            <ul className="bg-bg-neutral flex items-center space-x-4 rounded-lg border-t border-t-white/20 bg-black/60 px-4 ring-1 ring-black/70 backdrop-blur">
                {links.map((link) => {
                    const linkClasses = `block p-2 text-base ${
                        pathname === link.path ? 'text-white' : 'text-white/60'
                    } hover:text-white focus:outline-none focus:ring-0 focus:border-0 focus:text-white`
                    return (
                        <li key={link.label}>
                            {link.path ? (
                                <Link
                                    href={link.path}
                                    aria-label={link.label}
                                    className={linkClasses}
                                >
                                    {link.icon ? link.icon : link.label}
                                </Link>
                            ) : (
                                <button aria-label={link.label} className={linkClasses}>
                                    {link.icon ? link.icon : link.label}
                                </button>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
