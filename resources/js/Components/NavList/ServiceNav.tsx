import React from 'react'
import NavLink from '../NavLink'
import { useTranslation } from 'react-i18next';

const ServiceNav = () => {
    const { t, i18n } = useTranslation();
    const AboutLinks = [
        {
            href:'projects',
            title: t('navbarlist.service.projects')
        },
        {
            href:'Sustainability',
            title: t('navbarlist.service.sustainability')
        },
        {
            href:'innovation',
            title: t('navbarlist.service.innovation')
        },

    ]
    return (
        <div className='flex flex-col whitespace-nowrap px-2'>

            {AboutLinks.map((item , index)=>(
                <NavLink
                className='!text-yellow-original hover:!text-white hover:!bg-yellow-original !pt-2 !pb-2 mt-2 border-b w-40 last:border-b-0'
                key={index}
                href={route(item.href , {lang:i18n.language})}
                active={route().current(item.href)}
                >
                    {item.title}
                </NavLink>
            ))}

        </div>
    )
}

export default ServiceNav