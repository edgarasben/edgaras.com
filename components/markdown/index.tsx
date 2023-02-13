'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from './dracula'
import Image from 'next/image'

export function Markdown({ children }: { children: string }) {
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
            {children}
        </ReactMarkdown>
    )
}

const MarkdownComponents: object = {
    p: (paragraph: any) => {
        const { node } = paragraph

        if (node.children[0].tagName === 'img') {
            const image = node.children[0]
            const metastring = image.properties.alt
            const alt = metastring?.replace(/ *\{[^)]*\} */g, '')
            const aspectW = metastring.match(/{([^}]+)\//)
            const aspectH = metastring.match(/\/([^}]+)}/)
            const aspectWidth = aspectW ? aspectW[1] : '4'
            const aspectHeight = aspectH ? aspectH[1] : '3'
            const isPriority = metastring?.toLowerCase().match('{priority}')
            const hasCaption = metastring?.toLowerCase().includes('{caption:')
            const caption = metastring?.match(/{caption: (.*?)}/)?.pop()

            const aspectRatios: { [key: string]: string } = {
                '16/9': 'aspect-[16/9]',
                '4/3': 'aspect-[4/3]',
                '1/1': 'aspect-square'
            }

            const aspect = aspectRatios[`${aspectWidth}/${aspectHeight}`]

            return (
                <figure>
                    <div className={`${aspect} not-prose relative overflow-hidden`}>
                        <Image
                            src={image.properties.src}
                            fill
                            alt={alt}
                            priority={isPriority}
                            className="object-cover"
                        />
                    </div>
                    {hasCaption ? (
                        <figcaption aria-label={caption}>{caption}</figcaption>
                    ) : null}
                </figure>
            )
        }
        return <p>{paragraph.children}</p>
    },
    code({ node, inline, className, children, ...props }: any) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
            <SyntaxHighlighter
                style={dracula}
                language={'jsx'}
                wrapLongLines={true}
                PreTag="div"
                {...props}
            >
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        )
    }
}
