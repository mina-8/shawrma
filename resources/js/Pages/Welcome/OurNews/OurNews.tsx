import { useTranslation } from 'react-i18next';


import { Link } from '@inertiajs/react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import useInView from '@/Components/useInView ';

interface NewsItems {
    id: number;
    title: string;
    content: string;
    image: string;
    slug: string;
}

interface Props {
    news: NewsItems[]
}

import newsone from '@/../../public/ournews/news (1).webp'
const OurNews = ({ news }: Props) => {

    const { t, i18n } = useTranslation();
    const { ref, isVisible } = useInView();
    return (
        <div
            className='py-12 flex flex-col items-center justify-center gap-4 min-h-screen bg-gray-200 w-full dark:bg-gray-900 dark:text-gray-100 text-gray-900  '
        >
            <div className='p-4 mx-auto w-full max-w-7xl flex flex-col items-center justify-center gap-8 '>
                <h2 className='text-3xl border-b-2 border-yellow-original pb-2 mb-4 text-center '>{t('ournews.title')}</h2>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 w-full'>
                    {news.length > 0 ? (
                        news.map((item, index) => (
                            <div
                                key={item.id}
                                ref={ref}
                                className={`flex flex-col items-center justify-center gap-6 bg-gray-50 shadow w-full min-w-[250px] md:min-w-[300px] h-full transition-all duration-700 ease-in-out transform ${isVisible ? 'animate-fadeup opacity-100' : 'opacity-0'
                                    } dark:bg-gray-900 dark:text-gray-100 text-gray-900 bg-white `}
                            >
                                {index % 2 === 0 ? (
                                    <>
                                        <img src={item.image} alt={item.title} className='w-full h-full object-cover ' />
                                        <div className='px-4'>
                                            <h3 className='text-lg'>
                                                {item.title}
                                            </h3>
                                            {/* <ReactMarkdown>{item.content}</ReactMarkdown> */}
                                            <Link
                                                href={route('news.show', { lang: i18n.language, slug: item.slug })}
                                                className='text-md text-yellow-original dark:hover:text-white flex  items-center py-4 gap-2'
                                            >
                                                {t('ournews.readmore')}
                                                {i18n.language === 'ar' ? (<IoIosArrowBack />) : (<IoIosArrowForward />)}

                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='px-4'>
                                            <h3 className='text-lg mt-1'>
                                                {item.title}
                                            </h3>
                                            {/* <ReactMarkdown>{item.content}</ReactMarkdown> */}
                                            <Link
                                                href={route('news.show', { lang: i18n.language, slug: item.slug })}
                                                className='text-md text-yellow-original dark:hover:text-white flex  items-center py-4 gap-2'
                                            >
                                                {t('ournews.readmore')}
                                                {i18n.language === 'ar' ? (<IoIosArrowBack />) : (<IoIosArrowForward />)}

                                            </Link>
                                        </div>
                                        <img src={item.image} alt={item.title} className='w-full h-full object-cover ' />
                                    </>
                                )}
                            </div>
                        ))
                    ) : (

                        <div

                            ref={ref}
                            className={`flex flex-col items-center justify-center gap-6 bg-gray-50 shadow w-full min-w-[250px] md:min-w-[300px] h-full transition-all duration-700 ease-in-out transform ${isVisible ? 'animate-fadeup opacity-100' : 'opacity-0'
                                } dark:bg-gray-900 dark:text-gray-100 text-gray-900 bg-white `}
                        >

                            <>
                                <img src={newsone} alt={`Static News ${'index' + 1}`} className='w-full h-full object-cover ' />
                                <div className='px-4'>
                                    <h3 className='text-lg'>{t('ournews.title-news')}</h3>
                                    <p className='text-sm '>{t('ournews.content-news')}</p>
                                    <Link
                                        href={route('welcome', { lang: i18n.language })}
                                        className='text-md text-yellow-original hover:text-white flex  items-center py-4 gap-2'
                                    >
                                        {t('ournews.readmore')}
                                        {i18n.language === 'ar' ? (<IoIosArrowBack />) : (<IoIosArrowForward />)}

                                    </Link>
                                </div>
                            </>

                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default OurNews