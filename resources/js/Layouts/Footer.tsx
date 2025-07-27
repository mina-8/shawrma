import ApplicationLogo from '@/Components/ApplicationLogo';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import React from 'react'



interface SocialLink {
    id: number;
    link: string;
    icon_path: string;
}
interface CustopProps extends PageProps {
    socialicons: SocialLink[]
}

const Footer = () => {
const { socialicons } = usePage<CustopProps>().props;
    return (
        <footer
            className='py-24 bg-[#393F52] flex justify-center items-center flex-col'
        >
            <ApplicationLogo />
            <div
                className='flex  gap-4 text-4xl text-white my-8 cursor-pointer'
            >
                {socialicons.length > 0 && socialicons.map((social) => (
                    <a
                        key={social.id}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" p-2 "
                    >
                        <div className='w-8' dangerouslySetInnerHTML={{ __html: social.icon_path }} />
                    </a>
                ))}
            </div>
        </footer>
    )
}

export default Footer