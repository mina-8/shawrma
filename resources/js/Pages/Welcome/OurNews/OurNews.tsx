import { useTranslation } from 'react-i18next';

import img1 from '../../../../../public/ournews/live-uni.jpg';
import img2 from '../../../../../public/ournews/live1_0.jpg';
import img3 from '../../../../../public/ournews/live3_0.jpg';
import img4 from '../../../../../public/ournews/live4_0.jpg';
import { Link } from '@inertiajs/react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface NewsItems {
    id: number;
    title: string;
    description: string;
    image: string;
}

interface Props {
    news: NewsItems[]
}

const staticNews = [img1, img2, img3, img4];
const OurNews = ({ news }: Props) => {
    const { t, i18n } = useTranslation();
    return (
        <div
            className='py-12 flex flex-col items-center justify-center gap-4 min-h-screen bg-gray-200 w-full'
        >
            <div className='p-4 mx-auto w-full max-w-7xl flex flex-col items-center justify-center gap-8'>
                <h2 className='text-3xl border-b-2 border-sky-500 pb-2 mb-4 text-center'>{t('ournews.title')}</h2>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 w-full'>
                    {news.length > 0 ? (
                        news.map((item, index) => (
                            <div key={item.id} className='flex flex-col items-center justify-center gap-4 bg-gray-50 rounded-lg shadow p-4 h-full min-w-[250px] md:min-w-[300px] w-full'>
                                {index % 2 === 0 ? (
                                    <>
                                        <img src={item.image} alt={item.title} className='w-full h-full object-cover rounded-md' />
                                        <div className='px-4'>
                                            <h3 className='text-lg font-bold text-center'>{item.title}</h3>
                                            <p className='text-sm text-gray-600 text-center'>{item.description}</p>
                                            <Link
                                                href={route('welcome', { lang: i18n.language })}
                                                className='text-md text-sky-500 hover:text-sky-700 flex  items-center py-4 gap-2'
                                            >
                                                {t('ournews.readmore')}
                                                {i18n.language === 'ar' ? (<IoIosArrowBack />) : (<IoIosArrowForward />)}

                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <>

                                        <div className='px-4'>
                                            <h3 className='text-lg font-bold text-center'>{item.title}</h3>
                                            <p className='text-sm text-gray-600 text-center'>{item.description}</p>
                                            <Link
                                                href={route('welcome', { lang: i18n.language })}
                                                className='text-md text-sky-500 hover:text-sky-700 flex  items-center py-4 gap-2'
                                            >
                                                {t('ournews.readmore')}
                                                {i18n.language === 'ar' ? (<IoIosArrowBack />) : (<IoIosArrowForward />)}

                                            </Link>
                                        </div>
                                        <img src={item.image} alt={item.title} className='w-full h-full object-cover rounded-md' />
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        staticNews.map((item, index) => (
                            <div key={index} className='flex flex-col items-center justify-center gap-6 bg-gray-50 shadow w-full min-w-[250px] md:min-w-[300px] h-full'>
                                {index % 2 === 0 ? (
                                    <>
                                        <img src={item} alt={`Static News ${index + 1}`} className='w-full h-full object-cover ' />
                                        <div className='px-4'>
                                            <h3 className='text-lg'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia, nesciunt sit. Ducimus sit architecto sequi consectetur beatae rem, corrupti impedit nulla laboriosam earum quae, reiciendis quidem? Beatae laboriosam illum neque! {index + 1}</h3>
                                            <p className='text-sm '>This is a static news item.</p>
                                            <Link
                                                href={route('welcome', { lang: i18n.language })}
                                                className='text-md text-sky-500 hover:text-sky-700 flex  items-center py-4 gap-2'
                                            >
                                                {t('ournews.readmore')}
                                                {i18n.language === 'ar' ? (<IoIosArrowBack />) : (<IoIosArrowForward />)}

                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='px-4'>
                                            <h3 className='text-lg'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia, nesciunt sit. Ducimus sit architecto sequi consectetur beatae rem, corrupti impedit nulla laboriosam earum quae, reiciendis quidem? Beatae laboriosam illum neque! {index + 1}</h3>
                                            <p className='text-sm '>This is a static news item.</p>
                                            <Link
                                                href={route('welcome', { lang: i18n.language })}
                                                className='text-md text-sky-500 hover:text-sky-700 flex  items-center py-4 gap-2'
                                            >
                                                {t('ournews.readmore')}
                                                {i18n.language === 'ar' ? (<IoIosArrowBack />) : (<IoIosArrowForward />)}

                                            </Link>
                                        </div>
                                        <img src={item} alt={`Static News ${index + 1}`} className='w-full h-full object-cover ' />
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default OurNews