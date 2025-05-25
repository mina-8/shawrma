import React from 'react'
import { useTranslation } from 'react-i18next';
import mobawon from '@/../../public/logo-mobdwon.png'
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { TiSocialFacebook, TiSocialLinkedin, TiSocialYoutube } from 'react-icons/ti';
import { FaXTwitter } from 'react-icons/fa6';
import { SlSocialInstagram } from 'react-icons/sl';

const Footer = () => {
    const { t, i18n } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white w-full">
            <div
                className="mx-auto w-full max-w-7xl px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
                <div className={`flex flex-col items-center md:items-start gap-4 border-b pb-2  lg:pb-0 ${i18n.language === 'ar' ? 'lg:border-l' : 'lg:border-r'}  lg:border-b-0 border-sky-500`}>
                    <Link href="/">
                        <ApplicationLogo className="block h-12 w-auto fill-current text-white" />
                    </Link>
                    <p className={`text-white text-lg ${i18n.language === 'ar' ? 'pl-2' : 'pr-2'}`}>{t('footer.description')}</p>
                    <div className='flex gap-4'>
                        <a
                            href='#'
                            target='_blank'
                            className='rounded-full bg-gray-500 hover:bg-sky-500 p-2'>
                            <TiSocialYoutube size={20} />
                        </a>
                        <a
                            href='#'
                            target='_blank'
                            className='rounded-full bg-gray-500 hover:bg-sky-500 p-2'>
                            <TiSocialLinkedin size={20} />
                        </a>
                        <a
                            href='#'
                            target='_blank'
                            className='rounded-full bg-gray-500 hover:bg-sky-500 p-2'>
                            <TiSocialFacebook size={20} />
                        </a>
                        <a
                            href='#'
                            target='_blank'
                            className='rounded-full bg-gray-500 hover:bg-sky-500 p-2'>
                            <FaXTwitter size={20} />
                        </a>
                        <a
                            href='#'
                            target='_blank'
                            className='rounded-full bg-gray-500 hover:bg-sky-500 p-2'>
                            <SlSocialInstagram size={20} />
                        </a>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl text-yellow-original pb-2 mb-2 ">{t('footer.about_us')}</h2>
                    <ul className="space-y-1">
                        <li>
                            <Link href={route('our-story', { lang: i18n.language })}
                            className='hover:text-yellow-original'
                            >
                                {t('footer.ourstory')}
                            </Link>
                        </li>
                        <li>
                            <Link href={route('our-promise', { lang: i18n.language })}
                            className='hover:text-yellow-original'
                            >
                                {t('footer.ourpromise')}
                            </Link>
                        </li>
                        <li>
                            <Link href={route('our-culture', { lang: i18n.language })}
                            className='hover:text-yellow-original'
                            >
                                {t('footer.ourculture')}
                            </Link>
                        </li>
                    </ul>

                </div>


            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-700 py-4 px-4 max-w-7xl mx-auto w-full">
                <div className="text-gray-400 text-sm text-center md:text-left">
                    {t('footer.copyright')} © {currentYear}
                </div>
                <div className="flex items-center gap-2">
                    <a href="https://direct.me/dmcreators" target="_blank" rel="noopener noreferrer">
                        <img loading="lazy" src={mobawon} className="object-cover h-8" alt="Mobdwon" />
                    </a>
                    <span className="text-gray-400 text-xs">
                        {t('footer.mobdwon')}
                        <a href="https://direct.me/dmcreators" target="_blank" rel="noopener noreferrer" className="hover:text-custom-dark-blue ml-1">{t('footer.mobdwon_link')}</a>
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer