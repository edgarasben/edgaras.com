'use client'

import { NewsletterForm } from '@/components/newsletter-form'
import LinkedinIcon from '@/components/icons/linkedin-icon'
import TwitterIcon from '@/components/icons/twitter-icon'
import MailIcon from '@/components/icons/mail-icon'

const socialLinks = [
    {
        label: 'Twitter',
        url: 'https://twitter.com/edgarasben',
        icon: <TwitterIcon className="h-5 w-5" />
    },
    {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/edgarasben/',

        icon: <LinkedinIcon className="h-5 w-5" />
    },
    {
        label: 'Mail',
        url: 'mailto:hi@edgaras.com',
        icon: <MailIcon className="h-5 w-5" />
    }
]

export const Header = () => {
    return (
        <header>
            <div className="space-y-8 rounded-xl bg-bg-base p-8 shadow-sm">
                <div className="flex justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src="/images/edgaras-profile.png"
                            className="h-14 w-14 rounded-full border-2 border-bg-base shadow-md"
                            alt="Edgaras profile"
                        />
                        <div className="space-y-1">
                            <h1 className="font-semibold">
                                Edgaras Benediktavicius
                            </h1>
                            <p className="text-fg-neutral-faded">
                                Co-founder at{' '}
                                <a
                                    href="https://bestwriting.com"
                                    className="underline underline-offset-2 hover:no-underline"
                                >
                                    Best Writing
                                </a>
                            </p>
                        </div>
                    </div>
                    <ul className="flex">
                        {socialLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.url}
                                    className="block p-3.5 hover:text-fg-neutral-faded"
                                >
                                    {link.icon}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="text-fg-neutral-faded">
                    I design and code things for the web. Get updates on what I learn
                    and build by joining my mailing list. Weekly at most.
                </p>
                <NewsletterForm />
            </div>
        </header>
    )
}
