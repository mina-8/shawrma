import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import LangWraper from './LangWraper';
import { User } from '@/types';
import { useTranslation } from 'react-i18next';
import ChangeLang from '@/Components/ChangeLang/ChangeLang';
import { AiOutlineGlobal } from 'react-icons/ai';
import { FaArrowUp } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import SearchForm from '@/Components/SearchWeb/SearchForm';
import Footer from './Footer';
import ProductNav from '@/Components/ProductsNav/ProductNav';
import AboutNav from '@/Components/Aboutus/AboutNav';

export default function AuthWelcome({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { currentRoute }: string | any = usePage().props;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isnavbar, setIsnavbar] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const { t, i18n } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 500);
        };

        const handlnav = () => {
            setIsnavbar(window.scrollY > 100);
        }

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handlnav);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handlnav);
        };
    }, []);

    return (
        <LangWraper>
            <div className="min-h-screen " dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                <nav
                    className={` fixed top-0 left-0 w-full z-50 transition-colors duration-300 `}
                >
                    <div
                        className={`w-full h-16 fixed ${isnavbar ? 'bg-black opacity-50' : 'bg-transparent'
                            }`}
                    ></div>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex relative">
                                <div className="flex shrink-0 items-center">
                                    <Link href={route('welcome', { lang: i18n.language })}>
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-white" />
                                    </Link>
                                </div>
                            </div>

                            <div className="hidden sm:ms-6 sm:flex sm:items-center relative">
                                <div className="hidden gap-1 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink
                                        href={route('welcome', { lang: i18n.language })}
                                        active={route().current('welcome')}
                                    >
                                        {t('home.home')}
                                    </NavLink>

                                    <Dropdown className='hover:bg-white hover:text-yellow-original px-4 py-6 cursor-pointer text-white'>
                                        <Dropdown.Trigger>
                                           {t('home.about')}
                                        </Dropdown.Trigger>
                                        <Dropdown.Content className='mt-6 ' >
                                           <AboutNav/>
                                        </Dropdown.Content>
                                    </Dropdown>

                                    <NavLink
                                        href={route('contact-us', { lang: i18n.language })}
                                        active={route().current('contact-us')}
                                    >
                                        {t('home.contact')}
                                    </NavLink>

                                    <Dropdown className='hover:bg-white hover:text-yellow-original px-4 py-6 cursor-pointer text-white '>
                                        <Dropdown.Trigger>
                                            {t('home.products')}
                                        </Dropdown.Trigger>
                                        <Dropdown.Content align='right'
                                          className={`mt-6 ${i18n.language === 'ar' ? 'translate-x-[-25%]' : 'translate-x-[25%]'} `}

                                          >
                                    <ProductNav/>
                                        </Dropdown.Content>
                                    </Dropdown>




                                    <NavLink
                                        href={route('contact-form', { lang: i18n.language })}
                                        active={route().current('contact-form')}
                                    >
                                        {t('home.contactform')}
                                    </NavLink>
                                </div>
                                <div className="relative ms-3">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-full bg-sky-500 hover:bg-sky-700 border border-transparent text-white px-2 py-2 text-sm font-medium leading-4 transition duration-150 ease-in-out hover:text-white focus:outline-none"
                                        onClick={() => setShowSearch(true)}
                                    >
                                        <IoSearch size={24} />
                                    </button>
                                </div>
                                <div className="relative ms-3">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-md border border-transparent text-white px-3 py-2 text-sm font-medium leading-4 transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none"
                                                >
                                                    <AiOutlineGlobal size={24} />
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>
                                        <ChangeLang />
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-full bg-sky-500 hover:bg-sky-700 border border-transparent text-white px-2 py-2 text-sm font-medium leading-4 transition duration-150 ease-in-out hover:text-white focus:outline-none"
                                                onClick={() => setShowSearch(true)}
                                            >
                                                <IoSearch size={24} />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                </Dropdown>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent text-white px-3 py-2 text-sm font-medium leading-4  transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                <AiOutlineGlobal size={24} />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <ChangeLang />
                                </Dropdown>
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

                    <div
                        className={
                            (showingNavigationDropdown ? 'block' : 'hidden') +
                            ' sm:hidden'
                        }
                    >
                        <div className="space-y-1 pb-3 pt-2">
                            <ResponsiveNavLink
                                href={route('welcome', { lang: i18n.language })}
                                active={route().current('welcome')}
                            >
                                {t('home.home')}
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route('about-us', { lang: i18n.language })}
                                active={route().current('about-us')}
                            >
                                {t('home.about')}
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route('contact-us', { lang: i18n.language })}
                                active={route().current('contact-us')}
                            >
                                {t('home.contact')}
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route('products', { lang: i18n.language })}
                                active={route().current('products')}
                            >
                                {t('home.products')}
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route('contact-form', { lang: i18n.language })}
                                active={route().current('contact-form')}
                            >
                                {t('home.contactform')}
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

                <main className="relative">{children}</main>
                {isScrolled && (
                    <div className='fixed bottom-4 right-4 z-50'>
                        <div
                            className='bg-sky-500 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-gray-700 transition duration-300 animate-bounce'
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
