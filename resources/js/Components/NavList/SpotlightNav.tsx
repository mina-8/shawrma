import React from 'react'
import NavLink from '../NavLink'
import { useTranslation } from 'react-i18next';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

interface sustainabilityPdf extends PageProps {
    sustainabilityreport: {
        sustainability_pdf: string;
    };
}
const SpotlightNav = () => {
    const { t, i18n } = useTranslation();
    const { sustainabilityreport } = usePage<sustainabilityPdf>().props;


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
        {
            name: 'sustainabilityreport',
            href: sustainabilityreport?.sustainability_pdf,
            title: t('navbar-links.sustainability-report')
        },

    ];
    return (
        <div className='flex flex-col px-2'>

            {Spotlight.map((item, index) => (
                item.name === 'sustainabilityreport' && item.href ? (
                    <a
                        key={index}
                        href={item.href}

                        className='!text-yellow-original hover:!text-white hover:!bg-yellow-original !pt-2 !pb-2 mt-2 border-b w-40 last:border-b-0 p-4'
                    >
                        {item.title}
                    </a>
                ) : (

                    <NavLink
                        className='!text-yellow-original hover:!text-white hover:!bg-yellow-original !pt-2 !pb-2 mt-2 border-b w-40 last:border-b-0'
                        key={index}
                        href={route(item.href, { lang: i18n.language })}
                        active={route().current(item.href)}
                    >
                        {item.title}
                    </NavLink>
                )
            ))}

        </div>
    )
}

export default SpotlightNav