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
import { FaArrowUp, FaTruck } from 'react-icons/fa';
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
            <div className="min-h-screen " dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                <nav
                    className={`${isScrolled ? 'fixed' : ''}  top-0 left-0 w-full z-50 transition-colors duration-300 `}
                >
                    <div
                        className='bg-primary-color '
                    >
                        {/* top bar */}
                        <div
                            className='flex items-center justify-between max-w-7xl mx-auto px-4 py-4'
                        >
                            <div
                                className='flex items-center gap-4'
                            >
                                <a
                                    className={`text-white cursor-pointer ${i18n.language == 'ar' ? 'border-l-2 px-4' : 'border-r-2 px-4'} flex items-center gap-2`}
                                    target='_blank'
                                    href={site_setting?.shop_link || '#'}
                                >
                                    <FaCartShopping />
                                    {t('navbar-links.shop')}
                                </a>

                                <Link
                                    className={`text-white cursor-pointer flex items-center gap-2 `}

                                    href={route('delivery', { lang: i18n.language })}
                                >
                                    <FaTruck />
                                    {t('navbar-links.delivery')}
                                </Link>


                            </div>
                            <ChangeLang />
                        </div>
                    </div>
                    {/* navbar */}
                    <div
                        className='bg-white'
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

                                        <NavLink
                                            href={route('welcome', { lang: i18n.language })}
                                            active={currentRoute === 'welcome'}
                                            className='uppercase inline-flex items-center '
                                        >
                                            {t('home.home')}
                                        </NavLink>

                                        <Dropdown>
                                            <NavLink
                                                href={route('about-us', { lang: i18n.language })}
                                                active={currentRoute === 'about-us'}>
                                                {t('home.about')}
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </NavLink>
                                            <Dropdown.Content
                                                align='center'
                                            >
                                                <AboutNav />

                                            </Dropdown.Content>
                                        </Dropdown>

                                        <Dropdown>
                                            <NavLink
                                                href={route('how-make', { lang: i18n.language })}
                                                active={currentRoute === 'how-make'}
                                            >
                                                {t('home.how_build')}
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </NavLink>
                                            <Dropdown.Content
                                                align='center'
                                            >
                                                <ServiceNav />
                                            </Dropdown.Content>
                                        </Dropdown>


                                        <Dropdown>
                                            <NavLink
                                                href={route('mainproduct', { lang: i18n.language })}
                                                active={currentRoute === 'mainproduct'}
                                            >
                                                {t('home.products')}
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </NavLink>
                                            <Dropdown.Content
                                                align='center'
                                            >
                                                {/* <ProductNav /> */}
                                            </Dropdown.Content>
                                        </Dropdown>


                                        <NavLink
                                            href={route('work-us', { lang: i18n.language })}
                                            active={currentRoute === 'work-us'}
                                            className='uppercase'
                                        >
                                            {t('home.carreer')}
                                        </NavLink>

                                        <NavLink
                                            href={route('contact-us', { lang: i18n.language })}
                                            active={currentRoute === 'contact-us'}
                                            className='uppercase'
                                        >
                                            {t('home.contact_us')}
                                        </NavLink>

                                    </div>
                                    <div className="relative ms-3">
                                        <button
                                            name='search'
                                            type="button"
                                            className="inline-flex items-center rounded-full bg-primary-color hover:bg-yellow-700 border border-transparent text-white px-2 py-2 text-sm font-medium leading-4 transition duration-150 ease-in-out hover:text-white focus:outline-none"
                                            onClick={() => setShowSearch(true)}
                                        >
                                            <IoSearch size={24} />
                                        </button>
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

                            <ResponsiveNavLink
                                href={route('contact-us', { lang: i18n.language })}
                                active={route().current('contact-us')}
                            >
                                {t('home.contact')}
                            </ResponsiveNavLink>

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">
                                        {t('home.about')}
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <AboutNav />
                                </Dropdown.Content>
                            </Dropdown>


                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">
                                        {t('home.how_build')}
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <ServiceNav />
                                </Dropdown.Content>
                            </Dropdown>

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">
                                        {t('home.products')}
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    {/* <ProductNav /> */}
                                </Dropdown.Content>
                            </Dropdown>

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">
                                        {t('home.bulidinus')}
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <WorkusNav />
                                </Dropdown.Content>
                            </Dropdown>

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">
                                        {t('home.spotlight')}
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <SpotlightNav />
                                </Dropdown.Content>
                            </Dropdown>

                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-full bg-yellow-original hover:bg-yellow-700 border border-transparent text-white px-2 py-2 text-sm font-medium leading-4 transition duration-150 ease-in-out hover:text-white focus:outline-none"
                                    onClick={() => setShowSearch(true)}
                                >
                                    <IoSearch size={24} />
                                </button>
                            </span>
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

                <main className="relative">{children}</main>
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
                <Footer />
            </div>
        </LangWraper>
    );
}
