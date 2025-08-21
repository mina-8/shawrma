import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import LangWraper from './LangWraper';
import { User } from '@/types';
import { useTranslation } from 'react-i18next';

import { AiOutlineGlobal } from 'react-icons/ai';
import { FaArrowUp, FaPhoneAlt, FaTruck } from 'react-icons/fa';
import { IoMoon, IoSearch } from 'react-icons/io5';
import SearchForm from '@/Components/SearchWeb/SearchForm';
import Footer from './Footer';

import AboutNav from '@/Components/NavList/AboutNav';
import ServiceNav from '@/Components/NavList/ServiceNav';

import SpotlightNav from '@/Components/NavList/SpotlightNav';
import WorkusNav from '@/Components/NavList/WorkusNav';

import { MdOutlineWbSunny } from 'react-icons/md';
import ChangeLang from '@/Components/ChangeLang/ChangeLang';
import { FaCartShopping } from 'react-icons/fa6';


export default function AuthWelcome({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { currentRoute }: string | any = usePage().props;
    const { site_setting }: string | any = usePage().props;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const [showSearch, setShowSearch] = useState(false);

    const { t, i18n } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 500);
        };


        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);

        };


    }, []);


    return (
        <LangWraper>
            <div className="min-h-screen "
            // dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            dir='rtl'
            >
                <nav
                    className={`${isScrolled ? 'fixed' : ''}  top-0 left-0 w-full z-50 transition-colors duration-300 `}
                >
                    <div
                        className='bg-primary-color '
                    >

                    </div>
                    {/* navbar */}
                    <div
                        // className='bg-white'
                    >
                        <div className={`mx-auto py-4  px-4 sm:px-6 lg:px-8  max-w-7xl `}>
                            <div className="flex h-16 ">
                                <div className="flex relative">
                                    <div className="flex shrink-0 items-center">
                                        <Link href={route('welcome', { lang: i18n.language })}>
                                            <ApplicationLogo
                                                className="block h-20 w-auto fill-current "
                                            />
                                        </Link>
                                    </div>
                                </div>

                                <div className={`hidden xl:ms-6 xl:flex xl:items-center relative justify-between w-full`}>
                                    <div className="hidden gap-1 sm:-my-px sm:ms-10 sm:flex">

                                        {/* <NavLink
                                            href={route('welcome', { lang: i18n.language })}
                                            active={currentRoute === 'welcome'}
                                            className='uppercase inline-flex items-center '
                                        >
                                            {t('home.home')}
                                        </NavLink> */}


                                    </div>
                                    <div
                                    className='flex items-center gap-4'
                                    >
                                        <Link
                                        href={route('branches' , {lang:i18n.language})}
                                        className='text-primary-color font-bold text-xl'
                                        >
                                            فروعنا
                                        </Link>
                                        <Link
                                        href={route('servay' , {lang:i18n.language})}
                                        className='text-primary-color font-bold text-xl'
                                        >
                                            شاركنا رايك
                                        </Link>
                                    <div className="relative ms-3">
                                        
                                        <a href="tel:0542008883"
                                        className="inline-flex items-center gap-3 rounded-full bg-primary-color  border border-transparent text-white px-2 py-2 text-md font-bold leading-4 transition duration-150 ease-in-out hover:text-white focus:outline-none"
                                        >
                                            0542008883
                                            <FaPhoneAlt />
                                        </a>
                                    </div>

                                    </div>

                                </div>

                                <div className="-me-2 flex items-center xl:hidden relative">


                                    <button
                                        onClick={() =>
                                            setShowingNavigationDropdown(
                                                (previousState) => !previousState,
                                            )
                                        }
                                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                                    >
                                        <svg
                                            className="h-6 w-6"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                className={
                                                    !showingNavigationDropdown
                                                        ? 'inline-flex'
                                                        : 'hidden'
                                                }
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                            <path
                                                className={
                                                    showingNavigationDropdown
                                                        ? 'inline-flex'
                                                        : 'hidden'
                                                }
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`xl:hidden ${showingNavigationDropdown ? 'block' : 'hidden'} bg-white text-black px-4 py-4 shadow-md z-50`}
                    >
                        <div className="space-y-1">
                            <ResponsiveNavLink
                                href={route('welcome', { lang: i18n.language })}
                                active={route().current('welcome')}
                            >
                                {t('home.home')}
                            </ResponsiveNavLink>


                        </div>
                    </div>

                </nav>
                {showSearch && <SearchForm onClose={() => setShowSearch(false)} />}
                {header && (
                    <header className="bg-white shadow mt-16">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main className="relative ">{children}</main>
                {isScrolled && (
                    <div className='fixed bottom-4 right-4 z-50'>
                        <div
                            className='bg-primary-color text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-gray-700 transition duration-300 animate-bounce'
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            <FaArrowUp />
                        </div>
                    </div>
                )}
                {/* <Footer /> */}
            </div>
        </LangWraper>
    );
}
