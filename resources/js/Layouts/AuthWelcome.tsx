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
import { IoMoon, IoSearch } from 'react-icons/io5';
import SearchForm from '@/Components/SearchWeb/SearchForm';
import Footer from './Footer';
import ProductNav from '@/Components/ProductsNav/ProductNav';
import AboutNav from '@/Components/NavList/AboutNav';
import ServiceNav from '@/Components/NavList/ServiceNav';
import BrandNav from '@/Components/NavList/BrandNav';
import SpotlightNav from '@/Components/NavList/SpotlightNav';
import WorkusNav from '@/Components/NavList/WorkusNav';
import { useTheme } from './ThemeContext';
import { MdOutlineWbSunny } from 'react-icons/md';

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
    const { theme, toggleTheme } = useTheme()
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
                    className={` fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isnavbar ? 'bg-black bg-opacity-50' : 'bg-transparent'} `}
                >
                    {!isnavbar && (
                        <div
                            className='flex items-center w-full max-w-7xl mx-auto  justify-end'
                        >

                            <Link
                                className='text-white cursor-pointer'

                                href={route('contact-us', { lang: i18n.language })}
                            // active={route().current('contact-us')}
                            >

                                {t('navbar-links.contact-us')}
                            </Link>

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            name='lang'
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent text-white px-3 py-2 text-sm font-medium leading-4 transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none"
                                        >
                                            <AiOutlineGlobal size={24} />
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <ChangeLang />
                            </Dropdown>

                            <button onClick={toggleTheme}
                                className='text-2xl '
                            >{theme === 'dark' ? <IoMoon className='text-white' /> : <MdOutlineWbSunny className='text-white' />}</button>
                        </div>
                    )}
                    <div className={`mx-auto  px-4 sm:px-6 lg:px-8 ${i18n.language === 'ar' ? 'max-w-7xl' : 'max-w-fit'} `}>
                        <div className="flex h-16 justify-between">
                            <div className="flex relative">
                                <div className="flex shrink-0 items-center">
                                    <Link href={route('welcome', { lang: i18n.language })}>
                                        <ApplicationLogo
                                        className="block h-20 w-auto fill-current text-white"
                                         />
                                    </Link>
                                </div>
                            </div>

                            <div className="hidden sm:ms-6 sm:flex sm:items-center relative">
                                <div className="hidden gap-1 sm:-my-px sm:ms-10 sm:flex">

                                    <Dropdown className='hover:bg-white  hover:text-yellow-original px-4 py-6 cursor-pointer text-white'>
                                        <Dropdown.Trigger>
                                            {t('home.about')}
                                        </Dropdown.Trigger>
                                        <Dropdown.Content
                                        className={`mt-6 ${i18n.language === 'ar' ? 'translate-x-[15%]' : 'translate-x-[0%] w-full'} `}
                                         >
                                            <AboutNav />
                                        </Dropdown.Content>
                                    </Dropdown>

                                    <Dropdown className='hover:bg-white hover:text-yellow-original px-4 py-6 cursor-pointer text-white'>
                                        <Dropdown.Trigger>
                                            {t('home.brands')}
                                        </Dropdown.Trigger>
                                        <Dropdown.Content
                                         className={`mt-6 ${i18n.language === 'ar' ? 'translate-x-[12%]' : 'translate-x-[0%] '} `}
                                         >
                                            <BrandNav />
                                        </Dropdown.Content>
                                    </Dropdown>

                                    <Dropdown className='hover:bg-white hover:text-yellow-original px-4 py-6 cursor-pointer text-white'>
                                        <Dropdown.Trigger>
                                            {t('home.services')}
                                        </Dropdown.Trigger>
                                        <Dropdown.Content
                                         className={`mt-6 ${i18n.language === 'ar' ? 'translate-x-[12%]' : 'translate-x-[0%] w-full'} `}
                                          >
                                            <ServiceNav />
                                        </Dropdown.Content>
                                    </Dropdown>


                                    <Dropdown className='hover:bg-white hover:text-yellow-original px-4 py-6 cursor-pointer text-white '>
                                        <Dropdown.Trigger>
                                            {t('home.products')}
                                        </Dropdown.Trigger>
                                        <Dropdown.Content align='right'
                                            className={`mt-6 ${i18n.language === 'ar' ? 'translate-x-[-25%]' : 'translate-x-[25%]'} `}

                                        >
                                            <ProductNav />
                                        </Dropdown.Content>
                                    </Dropdown>


                                    <Dropdown className='hover:bg-white hover:text-yellow-original px-4 py-6 cursor-pointer text-white '>
                                        <Dropdown.Trigger>
                                            {t('home.bulidinus')}
                                        </Dropdown.Trigger>
                                        <Dropdown.Content

                                            className={`mt-6 ${i18n.language === 'ar' ? 'translate-x-[25%]' : 'translate-x-[0%] w-full'}  `}

                                        >
                                            <WorkusNav />
                                        </Dropdown.Content>
                                    </Dropdown>

                                    <Dropdown className='hover:bg-white hover:text-yellow-original px-4 py-6 cursor-pointer text-white '>
                                        <Dropdown.Trigger>
                                            {t('home.spotlight')}
                                        </Dropdown.Trigger>
                                        <Dropdown.Content
                                        // align='right'
                                            className={`mt-6 ${i18n.language === 'ar' ? 'translate-x-[15%]' : 'translate-x-[-20%]'} `}

                                        >
                                            <SpotlightNav />
                                        </Dropdown.Content>
                                    </Dropdown>


                                </div>
                                <div className="relative ms-3">
                                    <button
                                        name='search'
                                        type="button"
                                        className="inline-flex items-center rounded-full bg-yellow-original hover:bg-yellow-700 border border-transparent text-white px-2 py-2 text-sm font-medium leading-4 transition duration-150 ease-in-out hover:text-white focus:outline-none"
                                        onClick={() => setShowSearch(true)}
                                    >
                                        <IoSearch size={24} />
                                    </button>
                                </div>

                            </div>

                            <div className="-me-2 flex items-center sm:hidden relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-full bg-yellow-original hover:bg-yellow-700 border border-transparent text-white px-2 py-2 text-sm font-medium leading-4 transition duration-150 ease-in-out hover:text-white focus:outline-none"
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
                        className={`sm:hidden ${showingNavigationDropdown ? 'block' : 'hidden'} bg-white text-black px-4 py-4 shadow-md z-50`}
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
                                        {t('home.brands')}
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <BrandNav />
                                </Dropdown.Content>
                            </Dropdown>

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">
                                        {t('home.services')}
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
                                    <ProductNav />
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
                            className='bg-yellow-original text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-gray-700 transition duration-300 animate-bounce'
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
