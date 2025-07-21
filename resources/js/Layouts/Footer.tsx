import React from 'react'
import { useTranslation } from 'react-i18next';
import mobawon from '@/../../public/logo-mobdwon.png'
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

import { PageProps } from '@/types';

import DynamicIcon from '@/Components/DynamicIcon/DynamicIcon';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface SocialLink {
    id: number;
    link: string;
    icon_path: string;
}
interface CustomBrand extends PageProps {


    socialicons: SocialLink[];
}


const Footer = () => {
    const { t, i18n } = useTranslation();
    const currentYear = new Date().getFullYear();
    const { socialicons } = usePage<CustomBrand>().props;

    const AboutLinks = [
        {
            href: 'projects',
            title: t('navbarlist.service.projects')
        },
        {
            href: 'Sustainability',
            title: t('navbarlist.service.sustainability')
        },
        {
            href: 'innovation',
            title: t('navbarlist.service.innovation')
        },

    ];
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

            href: 'work-us',
            title: t('footer.work-us')
        },

    ];


    return (
        <footer className="bg-wheat  w-full">
            <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">

                {/* Logo & Description & Social */}
                <div className="flex flex-col items-center md:items-start gap-4 border-b pb-6 lg:pb-0 lg:border-b-0
                    border-sky-500
                    ${i18n.language === 'ar' ? 'lg:border-l' : 'lg:border-r'}"
                >
                    <Link href="/">
                        <ApplicationLogo className="block h-12 w-auto fill-current text-white" />
                    </Link>
                    <p className="text-white text-lg w-[80%] ">
                        {t('footer.description')}
                    </p>
                    <div className="flex gap-4 flex-wrap justify-center md:justify-start">

                        {socialicons.length > 0 ? socialicons.map((social) => (
                            <a
                                key={social.id}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-gray-500 hover:bg-primary-color p-2"
                            >
                                <DynamicIcon iconPath={social.icon_path} />
                            </a>
                        )) : (
                            <>
                            <a
                            href='https://www.linkedin.com/company/bscosa/'
                            target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-gray-500 hover:bg-primary-color p-2"
                            >
                                <FaLinkedin />
                            </a>
                            <a
                            href='https://x.com/BscoCom'
                            target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-gray-500 hover:bg-primary-color p-2"
                            >
                                <FaXTwitter  />
                            </a>
                            <a
                            href='https://www.facebook.com/profile.php?id=61558624079654'
                            target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-gray-500 hover:bg-primary-color p-2"
                            >
                                <FaFacebook   />
                            </a>
                            <a
                            href='https://www.instagram.com/bsco_sa_com/'
                            target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-gray-500 hover:bg-primary-color p-2"
                            >
                                <FaInstagram />
                            </a>
                            <a
                            href='https://www.tiktok.com/@bsco.sa?lang=en'
                            target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-gray-500 hover:bg-primary-color p-2"
                            >
                                <FaTiktok />
                            </a>
                            </>
                        )}


                    </div>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {/* Section: About */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl text-primary-color">{t('footer.about_us')}</h2>
                        <ul className="space-y-1">
                            <li><Link href={route('our-story', { lang: i18n.language })} className="hover:text-primary-color">{t('footer.ourstory')}</Link></li>
                            <li><Link href={route('our-promise', { lang: i18n.language })} className="hover:text-primary-color">{t('footer.ourpromise')}</Link></li>
                        </ul>
                    </div>


                    {/* Section: Products */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl text-primary-color">{t('footer.services')}</h2>
                        <ul className="space-y-1 whitespace-nowrap">
                            {/* {AboutLinks.map((item, index) => (

                                <li
                                    key={index}
                                ><Link href={route(item.href, { lang: i18n.language })} className="hover:text-primary-color">{item.title}</Link></li>
                            ))} */}

                        </ul>
                    </div>

                    {/* Section: Build */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl text-primary-color">{t('footer.products')}</h2>
                        <ul className="space-y-1 whitespace-nowrap">
                            <li><Link href={route('mainproduct', { lang: i18n.language })} className="hover:text-primary-color">
                                {t('mainproduct.title')}
                            </Link></li>
                            <li><Link href={route('product-search', { lang: i18n.language })} className="hover:text-primary-color">
                                {t('products.ourproducts')}
                            </Link></li>

                        </ul>
                    </div>

                    {/* Section: Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl text-primary-color">{t('footer.quick_link')}</h2>
                        <ul className="space-y-1 whitespace-nowrap">
                            {Spotlight.map((item, index) => (

                                <li
                                    key={index}
                                ><Link href={route(item.href, { lang: i18n.language })} className="hover:text-primary-color">{item.title}</Link></li>
                            ))}

                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-700 py-4 px-4 max-w-7xl mx-auto w-full">
                <div className="text-gray-400 text-sm text-center md:text-left">
                    {t('footer.copyright')} © {currentYear}
                </div>
                <div>
                   <a href="https://www.google.com/maps/place/%D8%A7%D9%84%D8%B4%D8%B1%D9%83%D8%A9+%D8%A7%D9%84%D8%AB%D9%86%D8%A7%D8%A6%D9%8A%D8%A9+(+%D8%A8%D9%8A%D8%B3%D9%83%D9%88+)%E2%80%AD/@28.402489,46.0605261,774m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3fd7375f26d0fcc1:0xa31931d439938402!8m2!3d28.402489!4d46.0605261!16s%2Fg%2F11t0md03qc?entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D" rel="noopener noreferrer" target='__blank' className='hover:text-primary-color'>
                   {t('footer.maplocation')}
                   </a>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 text-center">
                    <a href="https://direct.me/dmcreators" target="_blank" rel="noopener noreferrer">
                        <img loading="lazy" src={mobawon} className="object-cover h-8" alt="Mobdwon" />
                    </a>
                    <span>
                        {t('footer.mobdwon')}
                        <a href="https://maps.app.goo.gl/vepPfgHWTj1e4L5z7?g_st=ic" target="_blank" rel="noopener noreferrer" className="hover:text-primary-color ml-1 ">
                        {t('footer.mobdwon_link')}
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
