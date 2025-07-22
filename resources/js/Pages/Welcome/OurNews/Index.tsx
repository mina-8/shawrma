import ContentRenderer from '@/Components/ContentRenderer';
import { Head, Link } from '@inertiajs/react';
import React from 'react'
import { useTranslation } from 'react-i18next';

export interface NewsItem {
    id: number;
    title: string;
    content: string;
    youtube_link: string;
    image: string;
}

export interface PaginatedNews {
    current_page: number;
    data: NewsItem[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface OurBlog {
    id: number;
    title: string;
    content: string;
    image: string;
    news: PaginatedNews;
}

export interface Props {
    ourblog: OurBlog;
}

const Index = ({ ourblog }: Props) => {
    const { t, i18n } = useTranslation();

    return (
        <>
            <Head title={t('ourblog.title')} />
            <section className="grid grid-cols-1 md:grid-cols-2  mx-auto min-h-screen">
                {/* Text Content */}
                <div className="px-12 text-xl leading-10 flex flex-col justify-center bg-gray-200">
                    <h3 className="text-4xl font-semibold mb-4">{ourblog?.title}</h3>
                    <div>

                         <ContentRenderer content={ourblog.content} />
                    </div>

                </div>

                {/* Image */}
                <div className="flex justify-center items-center">
                    <img
                        src={ourblog?.image}
                        alt={ourblog?.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* news */}
            <section
                className="grid grid-cols-1 md:grid-cols-2 items-center"
            >
                {ourblog.news.data.length > 0 && (
                    ourblog.news.data.map((item, index) =>
                        <React.Fragment key={item.id || index}>
                            {index % 2 ? (
                                <>

                                    {/* النص */}
                                    <div className="mx-4 md:mx-8 text-lg md:text-xl leading-relaxed py-6 md:py-0 flex flex-col gap-6">
                                        <div
                                            className='text-4xl font-bold'
                                        >{item.title}</div>
                                        <div>

                                             <ContentRenderer content={item.content} />
                                        </div>
                                        <div
                                            className='flex '
                                        >
                                            {t('ourblog.show_video')}
                                            <a
                                                href={item.youtube_link}
                                                target='_blank'
                                                className='mx-2 text-primary-color'
                                            >
                                                {t('ourblog.here')}
                                            </a>
                                        </div>
                                    </div>

                                    {/* الصورة */}
                                    <div className="h-64 md:h-full">
                                        <img
                                            src={item?.image}
                                            alt="About Us"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                </>
                            ) : (
                                <>

                                    {/* الصورة */}
                                    <div className="h-64 md:h-full">
                                        <img
                                            src={item?.image}
                                            alt="About Us"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* النص */}
                                    <div className="mx-4 md:mx-8 text-lg md:text-xl leading-relaxed py-6 md:py-0 flex flex-col gap-6">
                                        <div
                                            className='text-4xl font-bold'
                                        >{item.title}</div>
                                        <div>
                                             
                                             <ContentRenderer content={item.content} />
                                        </div>
                                        <div
                                            className='flex '
                                        >
                                            {t('ourblog.show_video')}
                                            <a
                                                href={item.youtube_link}
                                                target='_blank'
                                                className='mx-2 text-primary-color'
                                            >
                                                {t('ourblog.here')}
                                            </a>
                                        </div>
                                    </div>

                                </>
                            )}
                        </React.Fragment>
                    )
                )}

            </section>

            {/* next page */}
            <section
            className='flex justify-center items-start my-4 gap-4'
            >
                {ourblog.news.next_page_url && (
                    <a
                    href={ourblog.news.next_page_url}
                    className='bg-primary-color p-4 rounded-lg text-white hover:bg-red-200 hover:text-primary-color'
                    >{t('ourblog.nextpage')}</a>
                )}
                {ourblog.news.prev_page_url && (
                    <a
                    href={ourblog.news.prev_page_url}
                    className='bg-primary-color p-4 rounded-lg text-white hover:bg-red-200 hover:text-primary-color'
                    >{t('ourblog.prevpage')}</a>
                )}
            </section>

        </>
    )
}

export default Index