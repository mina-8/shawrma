import React from 'react'
import { useTranslation } from 'react-i18next';
import NavLink from '../NavLink';

const WorkusNav = () => {
    const { t, i18n } = useTranslation();
    const Worklink = [
        {
            href:'work-us',
            title: t('footer.work-us')
        },
    ]
    return (
        <div className='flex flex-col whitespace-nowrap px-2'>

            {Worklink.map((item, index) => (
                <NavLink
                    className='!text-yellow-original hover:!text-white hover:!bg-yellow-original !pt-2 !pb-2 mt-2 border-b w-40 last:border-b-0'
                    key={index}
                    href={route(item.href, { lang: i18n.language })}
                    active={route().current(item.href)}
                >
                    {item.title}
                </NavLink>
            ))}

        </div>
    )
}

export default WorkusNav