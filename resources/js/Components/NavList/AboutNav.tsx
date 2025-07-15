import React from 'react'
import NavLink from '../NavLink'
import { useTranslation } from 'react-i18next';

const AboutNav = () => {
    const { t, i18n } = useTranslation();
    const AboutLinks = [
        {
            href:'our-story',
            title: t('footer.ourstory')
        },
        {
            href:'our-promise',
            title: t('footer.ourpromise')
        },
        {
            href:'our-culture',
            title: t('footer.ourculture')
        },
        {
            href:'our-team',
            title: t('ourteam.title')
        },
        {
            href:'our-goal',
            title: t('footer.ourgoal')
        },

    ]
    return (
        <div className='flex flex-col whitespace-nowrap px-2'>

            {AboutLinks.map((item , index)=>(
                <NavLink
                className='!text-black justify-center hover:!bg-primary-color !pt-2 !pb-2 mt-2 border-b w-40 last:border-b-0 '
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

export default AboutNav