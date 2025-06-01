import { useTranslation } from 'react-i18next';

import img1 from '../../../../../public/ournews/live-uni.jpg';
import img2 from '../../../../../public/ournews/live1_0.jpg';
import img3 from '../../../../../public/ournews/live3_0.jpg';
import img4 from '../../../../../public/ournews/live4_0.jpg';
import { Link } from '@inertiajs/react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useState } from 'react';
import useInView from '@/Components/useInView ';
import ReactMarkdown from 'react-markdown';

interface OurMainPlairs {
    id: number;
    title: string;
    content: string;

    link: string;
    header_title: string;
    image: string;
}

interface Props {
    about: OurMainPlairs[]
}

const OurMainPlairs = ({ about }: Props) => {
    const { t, i18n } = useTranslation();

    const { ref, isVisible } = useInView();
    const staticAbout = [
        {
            image: img1,
            title: t(`ourmainplairs.ourstory.title`),
            content: t('ourmainplairs.ourstory.content'),
            description: t('ourmainplairs.ourstory.description'),
            href: 'our-story'
        },
        {
            image: img2,
            title: t(`ourmainplairs.ourservice.title`),
            content: t('ourmainplairs.ourservice.content'),
            description: t('ourmainplairs.ourservice.description'),
            href: 'mainproduct'
        },
        {
            image: img3,
            title: t(`ourmainplairs.ourculture.title`),
            content: t('ourmainplairs.ourculture.content'),
            description: t('ourmainplairs.ourculture.description'),
            href: 'our-culture'
        },
        {
            image: img4,
            title: t(`ourmainplairs.ourstyle.title`),
            content: t('ourmainplairs.ourstyle.content'),
            description: t('ourmainplairs.ourstyle.description'),
            href: 'innovation'
        },
    ];
    return (
        <div
            className='py-12 flex flex-col items-center justify-center gap-4 min-h-screen bg-white w-full'
        >
            <div className='p-4 mx-auto w-full max-w-7xl flex flex-col items-center justify-center gap-8'>
                <h2 className='text-3xl border-b-2 border-sky-500 pb-2 mb-4 text-center'>{t('aboutus.title')}</h2>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 w-full'>
                    {about.length > 0 ? (
                        about.map((item, index) => (
                            <div
                                key={index}
                                ref={ref}
                                style={{ animationDelay: `${index * 0.2}s` }}
                                className={`transition-all duration-700 ease-in-out transform ${isVisible ? 'animate-fadeup opacity-100' : 'opacity-0'
                                    } bg-gray-50 shadow w-full min-w-[250px] md:min-w-[300px] h-[550px] flex flex-col justify-between`}

                            >

                                <div className='w-full h-full relative'>
                                    <img src={item.image} alt={`Static News ${index + 1}`} className='w-full h-full object-cover' />
                                    <div className='absolute w-full h-full bg-black/50 top-0 right-0'></div>
                                    <h2 className='absolute bottom-0 p-4 text-white font-semibold text-xl'>
                                        {item.header_title}
                                    </h2>
                                </div>

                                <div className='flex flex-col justify-between px-4 py-4 flex-grow'>
                                    <div>
                                        <h3 className='text-lg font-semibold line-clamp-2'>{item.title}</h3>
                                        <div className='text-sm text-gray-600 line-clamp-3'>
                                            <ReactMarkdown>
                                            {item.content}
                                            </ReactMarkdown>
                                            </div>
                                    </div>
                                    <Link
                                        href={route(item.link, { lang: i18n.language })}
                                        className='text-md text-sky-500 hover:text-sky-700 flex items-center gap-2 mt-4'
                                    >
                                        {t('aboutus.readmore')}
                                        {i18n.language === 'ar' ? (<IoIosArrowBack />) : (<IoIosArrowForward />)}
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        staticAbout.map((item, index) => (
                            <div
                                key={index}
                                ref={ref}
                                style={{ animationDelay: `${index * 0.2}s` }}
                                className={`transition-all duration-700 ease-in-out transform ${isVisible ? 'animate-fadeup opacity-100' : 'opacity-0'
                                    } bg-gray-50 shadow w-full min-w-[250px] md:min-w-[300px] h-[550px] flex flex-col justify-between`}

                            >

                                <div className='w-full h-full relative'>
                                    <img src={item.image} alt={`Static News ${index + 1}`} className='w-full h-full object-cover' />
                                    <div className='absolute w-full h-full bg-black/50 top-0 right-0'></div>
                                    <h2 className='absolute bottom-0 p-4 text-white font-semibold text-xl'>
                                        {item.title}
                                    </h2>
                                </div>

                                <div className='flex flex-col justify-between px-4 py-4 flex-grow'>
                                    <div>
                                        <h3 className='text-lg font-semibold line-clamp-2'>{item.content}</h3>
                                        <p className='text-sm text-gray-600 line-clamp-3'>{item.description}</p>
                                    </div>
                                    <Link
                                        href={route(item.href, { lang: i18n.language })}
                                        className='text-md text-sky-500 hover:text-sky-700 flex items-center gap-2 mt-4'
                                    >
                                        {t('aboutus.readmore')}
                                        {i18n.language === 'ar' ? (<IoIosArrowBack />) : (<IoIosArrowForward />)}
                                    </Link>
                                </div>
                            </div>

                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default OurMainPlairs