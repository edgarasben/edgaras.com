import React from 'react'

type ChevronDownIconProps = React.SVGProps<SVGSVGElement>

const ChevronDownIcon: React.FC<ChevronDownIconProps> = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
        </svg>
    )
}

export default ChevronDownIcon
