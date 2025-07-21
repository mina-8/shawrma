import { Head, Link } from '@inertiajs/react';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { FaFilePdf } from 'react-icons/fa';
import triangle from '@/../../public/aboutus/triangle.png'
import ReactMarkdown from 'react-markdown';

interface CoreSustains {
    id: number;
    title: string;
    content: string;
    color: string;
    image: string;
}
interface CoreStories {
    id: number;
    title: string;
    image: string;
}

interface CoreVesions {
    id: number;
    title: string;
    content: string;
    image: string;
}
interface CoreStations {
    id: number;
    title: string;
    content: string;
    image: string;
}
interface OurNews {
    id: number;
    title: string;
    image: string;
    slug: string;
}

interface OurPromise {
    id: number;
    title: string;
    image: string;
    content: string;
    description: string;
    footer_title: string;
    corestories: CoreStories[];
    coresustains: CoreSustains[];
    corestations: CoreStations[];
    corevesions: CoreVesions[];
    news: OurNews[];
}

interface Props {
    ourpromise: OurPromise
}
const Index = ({ ourpromise }: Props) => {
    const { t, i18n } = useTranslation();
    return (
        <>
            <Head title={t('ourpromise.title')} />
            <section className="grid grid-cols-1 md:grid-cols-2  mx-auto min-h-screen">
                {/* Text Content */}
                <div className="px-12 text-xl leading-10 flex flex-col justify-center bg-gray-200">
                    <h3 className="text-4xl font-semibold mb-4">{ourpromise?.title}</h3>
                    <ReactMarkdown>{ourpromise?.content}</ReactMarkdown>
                    <div
                        className='flex flex-col my-4'
                    >
                        {ourpromise.corestories.length > 0 && (
                            ourpromise.corestories.map((item, index) =>
                                <a
                                    key={index}
                                    href={route('pdf-review' , {lang:i18n.language , id:item.id})}
                                    target='_blank'
                                    className='flex items-center gap-4'
                                >
                                    <div
                                        className='bg-primary-color p-2 flex justify-center items-center text-white rounded-full'
                                    >
                                        <FaFilePdf className='text-2xl' />
                                    </div>
                                    <div
                                        className='font-bold text-primary-color'
                                    >{item.title}</div>
                                </a>
                            )

                        )}

                    </div>
                </div>

                {/* Image */}
                <div className="flex justify-center items-center">
                    <img
                        src={ourpromise?.image}
                        alt={ourpromise?.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* core sustainble */}
            <section
                className='mx-auto w-full max-w-7xl my-4'
            >
                <div className="text-center px-4">
                    <h2 className="text-2xl sm:text-5xl text-black font-semibold inline-block py-4">
                        {t('ourpromise.sustainability')}
                    </h2>
                </div>

                {/* description of our promise */}
                <div
                    className="w-full flex justify-center items-center relative bg-cover bg-center py-12"
                    style={{
                        backgroundImage: `url(${triangle})`,
                    }}
                >
                    <div className="text-white text-center w-full max-w-3xl px-6">
                        {ourpromise.description}
                    </div>
                </div>
                {/* grid */}
                <div
                    className='grid grid-cols-1 md:grid-cols-3 mx-4 my-4'
                >
                    {ourpromise.coresustains.length > 0 && (
                        ourpromise.coresustains.map((item, index) =>
                            <div
                                key={index}
                                className='flex flex-col items-center flex-wrap  justify-center gap-8 text-white'
                                style={{ backgroundColor: item.color }}
                            >
                                <div
                                    className='text-7xl font-bold text-center'
                                >
                                    {item.title}
                                </div>
                                <div
                                    className='w-[80%] text-center'
                                >
                                    <ReactMarkdown>
                                        {item.content}
                                    </ReactMarkdown>
                                </div>

                                <div
                                    className='bg-black/50 w-full p-4 flex flex-col justify-center items-center gap-4'
                                >
                                    <div>
                                        {t('ourpromise.our-sustain')}
                                    </div>
                                    <div>

                                        <img src={item.image} alt={item.title} className='h-10' />
                                    </div>
                                </div>

                            </div>
                        )
                    )}

                </div>
                {/* footer title about sustainability */}
                <section
                    className='bg-[#57585b] text-lg text-white p-4 flex justify-center items-center mx-4'
                >
                    {ourpromise.footer_title}
                </section>
            </section >
            {/* core vestion */}
            <section className="grid grid-cols-1 md:grid-cols-2 items-center">
                {ourpromise.corestations.length > 0 &&
                    ourpromise.corestations.map((item, index) => (
                        <React.Fragment key={item.id || index}>
                            {index % 2 ? (
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
                                    <div className="mx-4 md:mx-8 text-lg md:text-xl leading-relaxed py-6 md:py-0">
                                        <ReactMarkdown>{item?.content}</ReactMarkdown>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* النص */}
                                    <div className="mx-4 md:mx-8 text-lg md:text-xl leading-relaxed py-6 md:py-0">
                                        <ReactMarkdown>{item?.content}</ReactMarkdown>
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
                            )}
                        </React.Fragment>
                    ))}
            </section>

            {/* core stations */}
            <section
                className='bg-slate-200 py-8'
            >
                {ourpromise.corestations.length > 0 && (
                    ourpromise.corestations.map((item, index) =>
                        <div
                            key={index}
                            className='flex flex-col gap-8 justify-center items-center'
                        >
                            <div
                                className='text-5xl font-bold'
                            >
                                {item.title}
                            </div>

                            <div>
                                <img src={item.image} alt={item.title} className='object-cover object-center h-72' />
                            </div>

                            <div
                                className='flex flex-col justify-center items-center w-1/2 text-center gap-8'
                            >
                                <ReactMarkdown>
                                    {item.content}
                                </ReactMarkdown>
                            </div>

                        </div>
                    )
                )}
            </section>

            {/* our news limit 3 */}
            <section
            className='mx-auto max-w-7xl w-full grid md:grid-cols-3 grid-cols-1 gap-16 my-8'
            >
                {ourpromise.news.length > 0 && (
                    ourpromise.news.map((item, index) =>
                        <div
                            key={index}
                            className='flex flex-col gap-4 items-center'
                        >
                            <div
                            // className='overflow-hidden'
                            >

                                <img src={item.image} alt={item.title} className='object-cover h-96 hover:scale-110  duration-500'/>
                            </div>
                            <div>
                                {item.title}
                            </div>
                            <Link
                                href={route('news.show', { lang: i18n.language, slug: item.slug })}
                                className='text-primary-color'
                            >
                                more
                            </Link>
                        </div>
                    )
                )}
            </section>
        </>
    )
}

export default Index