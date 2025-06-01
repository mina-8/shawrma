import React from 'react'
import { useTranslation } from 'react-i18next';
import mobawon from '@/../../public/logo-mobdwon.png'
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

import { PageProps } from '@/types';

import { SolveBrand } from '@/Components/ProductsNav/ProductNav';
import DynamicIcon from '@/Components/DynamicIcon/DynamicIcon';
interface Brands {
    id: number;
    header_title: string;
    slug: string;
}
interface SocialLink {
    id: number;
    link: string;
    icon_path: string;
}
interface CustomBrand extends PageProps {
    Brands: Brands[];
    solvebrands: SolveBrand[];
    socialicons: SocialLink[];
}


const Footer = () => {
    const { t, i18n } = useTranslation();
    const currentYear = new Date().getFullYear();
    const { Brands, socialicons, solvebrands } = usePage<CustomBrand>().props;
    console.log(socialicons)
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
            href: 'projects',
            title: t('navbar-links.latest-project')
        },
        {

            href: 'work-us',
            title: t('footer.work-us')
        },

    ];


    return (
        <footer className="bg-black text-white w-full">
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

                        {socialicons.map((social) => (
                            <a
                                key={social.id}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-gray-500 hover:bg-yellow-original p-2"
                            >
                                <DynamicIcon iconPath={social.icon_path} />
                            </a>
                        ))}


                    </div>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {/* Section: About */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl text-yellow-original">{t('footer.about_us')}</h2>
                        <ul className="space-y-1">
                            <li><Link href={route('our-story', { lang: i18n.language })} className="hover:text-yellow-original">{t('footer.ourstory')}</Link></li>
                            <li><Link href={route('our-promise', { lang: i18n.language })} className="hover:text-yellow-original">{t('footer.ourpromise')}</Link></li>
                            <li><Link href={route('our-culture', { lang: i18n.language })} className="hover:text-yellow-original">{t('footer.ourculture')}</Link></li>
                        </ul>
                    </div>

                    {/* Section: Brand */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl text-yellow-original">{t('footer.brand')}</h2>
                        <ul className="space-y-1">
                            {Brands.map((item, index) => (

                                <li
                                    key={index}
                                ><Link href={route('brand-show', { lang: i18n.language, slug: item.slug })} className="hover:text-yellow-original">{item.header_title}</Link></li>
                            ))}

                        </ul>
                    </div>

                    {/* Section: Products */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl text-yellow-original">{t('footer.services')}</h2>
                        <ul className="space-y-1">
                            {AboutLinks.map((item, index) => (

                                <li
                                    key={index}
                                ><Link href={route(item.href, { lang: i18n.language })} className="hover:text-yellow-original">{item.title}</Link></li>
                            ))}

                        </ul>
                    </div>

                    {/* Section: Build */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl text-yellow-original">{t('footer.products')}</h2>
                        <ul className="space-y-1">
                            <li><Link href={route('mainproduct', { lang: i18n.language })} className="hover:text-yellow-original">
                                {t('mainproduct.title')}
                            </Link></li>
                            <li><Link href={route('product-search', { lang: i18n.language })} className="hover:text-yellow-original">
                                {t('products.ourproducts')}
                            </Link></li>
                            {solvebrands.map((item) => (

                                <li key={item.id}><Link href={route('solve-brand', { lang: i18n.language, slug: item.slug })}
                                    className="hover:text-yellow-original">{item.title}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Section: Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl text-yellow-original">{t('footer.quick_link')}</h2>
                        <ul className="space-y-1">
                            {Spotlight.map((item, index) => (

                                <li
                                    key={index}
                                ><Link href={route(item.href, { lang: i18n.language })} className="hover:text-yellow-original">{item.title}</Link></li>
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
                <div className="flex items-center gap-2 text-xs text-gray-400 text-center">
                    <a href="https://direct.me/dmcreators" target="_blank" rel="noopener noreferrer">
                        <img loading="lazy" src={mobawon} className="object-cover h-8" alt="Mobdwon" />
                    </a>
                    <span>
                        {t('footer.mobdwon')}
                        <a href="https://direct.me/dmcreators" target="_blank" rel="noopener noreferrer" className="hover:text-custom-dark-blue ml-1">{t('footer.mobdwon_link')}</a>
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
