import React from 'react'
import NavLink from '../NavLink'
import { useTranslation } from 'react-i18next';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';


const SpotlightNav = () => {
    const { t, i18n } = useTranslation();

    const Spotlight = [
        {
            href: 'build-information',
            title: t('footer.bulidinfo')
        },
        {
            href: 'news',
            title: t('navbar-links.latest-news')
        },
        {
            href: 'projects',
            title: t('navbar-links.latest-project')
        },


    ];
    return (
        <div className='flex flex-col px-2'>

            {Spotlight.map((item, index) => (
                <NavLink
                    className='!text-black justify-center hover:!bg-yellow-original !pt-2 !pb-2 mt-2 border-b w-40 last:border-b-0'
                    key={index}
                    href={route(item.href, { lang: i18n.language })}
                    active={route().current(item.href)}
                >
                    {item.title}
                </NavLink>

            ))}

            <a
            className='!text-black text-center hover:!bg-yellow-original !pt-2 !pb-2 mt-2 border-b w-40 last:border-b-0 px-4'
            href={route('pdf-review')}
            target='_blank'
            >
                {t('navbar-links.sustainability-report')}
            </a>

        </div>
    )
}

export default SpotlightNav