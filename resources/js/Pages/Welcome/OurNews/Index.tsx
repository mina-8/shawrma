import ReciveUpdate from '@/Components/ReciveUpdate';
import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import banner from '@/../../public/aboutus/our-story.jpg';
import ReactMarkdown from 'react-markdown';

interface Blog {
    id: number;
    title: string;
    content: string;
    image: string;
    slug: string;
}

interface Props {
    blogs: Blog[];
}

const Index = ({ blogs }: Props) => {
    const { t, i18n } = useTranslation();
    return (
        <>
            <Head title={t('ourstory.title')} />
            <div className="bg-gray-50 flex flex-col">
                {/* Top Banner */}
                <div className="w-full h-[500px] flex relative overflow-hidden">
                    <div
                        className="w-full h-full bg-cover absolute"
                        style={{
                            backgroundImage: `url('${banner}')`,
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    />
                    <div className="absolute w-full h-full bg-black top-0 right-0 opacity-50"></div>
                    <h2 className="relative flex w-full items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-6xl text-white font-medium">
                        {t('ourstory.title')}
                    </h2>
                </div>

                {/* Blog Grid */}
                <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 my-12">
                    {blogs.map((item) => (
                        <Link
                        href={route('news.show' , {lang:i18n.language , slug:item.slug})}
                            key={item.id}
                            className="aspect-[4/3] shadow-md group overflow-hidden relative rounded"
                        >
                            {/* Image */}
                            <div className="h-full w-full overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover group-hover:scale-110 group-hover:rotate-1 duration-500"
                                />
                            </div>

                            {/* Overlay Content */}
                            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[90%] p-4">
                                <div className="absolute top-0 left-0 w-full h-full bg-black/70 backdrop-blur-md rounded opacity-80" />

                                <h3 className="text-white relative font-semibold text-lg z-10">
                                    {item.title}
                                </h3>

                                <div
                                    className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[300px] transition-all duration-500 text-white relative z-10"
                                >
                                    <ReactMarkdown>{item.content}</ReactMarkdown>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <ReciveUpdate />
        </>
    );
};

export default Index;
