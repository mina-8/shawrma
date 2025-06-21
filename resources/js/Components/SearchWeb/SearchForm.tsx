import { Link, router } from '@inertiajs/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdCheckmark } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

interface SearchFormProps {
    onClose: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onClose }) => {
    const { t, i18n } = useTranslation()
    const LinksSearch = [
        {
            href: 'our-story',
            title: t('footer.ourstory')
        },
        {
            href: 'our-promise',
            title: t('footer.ourpromise')
        },
        {
            href: 'our-culture',
            title: t('footer.ourculture')
        },
        {
            href: 'our-goal',
            title: t('footer.ourgoal')
        },

    ];
    const [query, setQuery] = useState('');
    const [Loading, setLoading] = useState(false)
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('search-web', { lang: i18n.language }), { search: query }, {
            onBefore: () => setLoading(true),
            onSuccess: () => setLoading(false)
        })
    }
    // search-web this is route
    return (
        <div className="fixed left-0 right-0 top-16 w-full bg-black bg-opacity-40 z-50 flex justify-center">
            <div className="bg-white rounded-b-lg shadow-lg p-6 w-full max-w-full relative dark:bg-gray-800 dark:text-white">
                <button
                    className="absolute top-2 right-2 text-white hover:bg-yellow-700 text-2xl rounded-full bg-yellow-original"
                    onClick={onClose}
                    aria-label="Close search"
                >
                    <IoClose />
                </button>
                <h1 className='px-8'>{t('search-form.search-header')}</h1>
                <form className="flex flex-col lg:flex-row p-8" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder={t('search-form.search-placeholder')}
                        className={`${i18n.language === 'ar' ? 'rounded-tr-3xl' : 'rounded-tl-3xl'} px-4 py-2 focus:outline-none focus:ring-0  focus:ring-sky-500 w-1/2`}
                        autoFocus
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <button
                        disabled={Loading}
                        type="submit"
                        className={`${i18n.language === 'ar' ? 'rounded-bl-3xl' : 'rounded-br-3xl'} bg-yellow-original  text-white  px-4 py-2 hover:bg-yellow-700 transition`}
                    >
                        {t('search-form.search-btn')}
                    </button>
                </form>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full'>
                    <div>
                        <h2 className='text-2xl font-bold text-yellow-original'>{t('search-form.search-latest')}</h2>
                        <ul>
                            {LinksSearch.map((item, index) => (
                                <li
                                    key={index}
                                    className='flex items-center gap-2 hover:text-yellow-original transition'
                                >
                                    <IoMdCheckmark className='text-yellow-original' />
                                    <Link
                                        href={route(item.href, { lang: i18n.language })}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}

                        </ul>
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold text-yellow-original'>{t('search-form.search-fastlink')}</h2>
                        <ul>
                            {LinksSearch.map((item, index) => (
                                <li
                                    key={index}
                                    className='flex items-center gap-2 hover:text-yellow-original transition'
                                >
                                    <IoMdCheckmark className='text-yellow-original' />
                                    <Link
                                        href={route(item.href, { lang: i18n.language })}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchForm;