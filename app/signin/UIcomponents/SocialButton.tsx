import React, { Children } from 'react';
import clsx from 'clsx';
import { RiLoaderFill } from 'react-icons/ri'

interface SocialButtonProps {

    disabled: boolean
    onClick: () => void
    children: React.ReactNode


}

const SocialButton: React.FC<SocialButtonProps> = ({ disabled, onClick, children }) => {

    return (
        <button

            className={clsx('p-2   hover:scale-110 transition-transform  border border-neutral-800 rounded-full drop-shadow-md', disabled && `hover:scale-100 opacity-30`)}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default SocialButton