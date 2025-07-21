import React from 'react'
import NavLink from '../NavLink'
import { useTranslation } from 'react-i18next';
import { Link } from '@inertiajs/react';

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
            href:'news',
            title: t('footer.ournews')
        },
     
    ]
    return (
        <div className='flex flex-col  px-2'>

            {AboutLinks.map((item , index)=>(
                <Link
                className='hover:!bg-gray-300 text-primary-color !pt-2 !pb-2 mt-2 group'
                key={index}
                href={route(item.href , {lang:i18n.language})}
                >
                    <div
                    className=' group-hover:-translate-x-2 transition-all'
                    >

                    {item.title}
                    </div>
                </Link>
            ))}

            <Link
            className='hover:!bg-gray-300 text-primary-color !pt-2 !pb-2 mt-2 group'
            href={`${route('about-us' , {lang:i18n.language})}#certif`}
            >
            {t('footer.certif')}
            </Link>

        </div>
    )
}

export default AboutNav