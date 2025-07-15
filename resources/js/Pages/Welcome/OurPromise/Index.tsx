import { Head } from '@inertiajs/react';
import React from 'react'
import { useTranslation } from 'react-i18next';
import banner from '@/../../public/aboutus/our-story.jpg'
import ReactMarkdown from 'react-markdown';
import ReciveUpdate from '@/Components/ReciveUpdate';
interface CoreStories {
    id: number;
    title: string;
    youtube_link: string;
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

interface OurPromise {
    id: number;
    title: string;
    image: string;
    banner: string;
    content: string;
    description: string;
    corevesions: CoreVesions[];
    corestations: CoreStations[];
    corestories: CoreStories[];
}

interface Props {
    ourpromise: OurPromise
}
const Index = ({ ourpromise }: Props) => {
    const { t, i18n } = useTranslation();
    return (
        <>
            <Head title={t('ourpromise.title')} />
            <div
                className="bg-gray-50 flex flex-col"
            >
                {/* top banner */}
                <div
                    className="w-full h-[500px] flex relative overflow-hidden"
                >
                    {/* banner */}
                    <div
                        className="w-full h-full bg-cover  absolute inset-0 bg-black/50"
                        style={{
                            backgroundImage: `url('${ourpromise.banner ? ourpromise.banner : banner}')`,
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
<div className='absolute w-full h-full bg-black top-0 right-0 opacity-50'></div>
                    <h2
                        className={`relative flex w-full  items-center  mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-6xl text-white font-medium`}
                    >
                        {t('ourpromise.title')}
                    </h2>
                </div>
            </div>
            {/* content */}
            {/* <div className="flex flex-col md:flex-row justify-center items-start max-w-7xl mx-auto gap-12 px-4 py-8">

                <div className="w-full md:w-1/2 flex flex-col items-center text-center">
                    <h3 className="text-3xl font-semibold text-primary-color border-b-4 border-primary-color pb-4 mb-6">
                        {ourpromise.title}
                    </h3>
                    <div className="text-lg leading-10 mx-4 md:mx-12 my-6 md:my-12">
                        <ReactMarkdown>{ourpromise.content}</ReactMarkdown>
                    </div>
                </div>


                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src={ourpromise.image}
                        alt={ourpromise.title}
                        className="max-w-full h-auto rounded-lg shadow-md"
                    />
                </div>
            </div> */}
            {/* vesion */}
            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 p-4 "
            >
                {ourpromise.corevesions.length > 0 &&
                    ourpromise.corevesions.map((vision) => (
                        <div
                            key={vision.id}
                            className=" w-full aspect-square  overflow-hidden shadow-lg relative"
                            style={{
                                backgroundImage: `url('${vision.image}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        >

                            <div className="absolute inset-0 bg-black/50 p-4 flex flex-col justify-between h-full">
                                <h3 className="text-white text-4xl font-semibold">{vision.title}</h3>
                                <div className="text-white text-2xl leading-10 ">
                                    <ReactMarkdown>{vision.content}</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {/* story */}
            {ourpromise.corestories.length > 0 && (
                <div className="flex flex-col justify-center items-center w-full py-12 bg-gray-100 px-4 sm:px-6 lg:px-8">
                    {ourpromise.corestories.map((story) => (
                        <div
                            key={story.id}
                            className="flex flex-col justify-center items-center w-full max-w-6xl mb-12"
                        >
                            <h3 className="text-2xl sm:text-3xl font-semibold text-primary-color border-b-4 border-primary-color pb-4 text-center">
                                {story.title}
                            </h3>

                            <div className="w-full aspect-video mt-6">
                                <iframe
                                    className="w-full h-full rounded-md shadow-md"
                                    src={story.youtube_link}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* station */}
            <div
                className='py-12 flex flex-col justify-center items-center gap-8 '
            >
                <h3
                    className='text-3xl font-semibold text-primary-color border-b-4 border-primary-color pb-4'
                >{t('ourpromise.ourvalues')}</h3>
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4 max-w-7xl w-full"
                >
                    {ourpromise.corestations.length > 0 && (
                        ourpromise.corestations.map((station) => (
                            <div
                                key={station.id}
                                className='w-full aspect-[3/4] overflow-hidden shadow-lg relative group'
                                style={{
                                    backgroundImage: `url('${station.image}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'cente',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                                <div
                                    className='flex p-4 flex-col justify-end h-full '
                                >
                                    <h3 className="text-white text-2xl font-semibold">{station.title}</h3>
                                </div>
                                <div className="absolute  p-4 w-full h-full flex flex-col bg-primary-color -top-full group-hover:top-0 transition-all duration-500">
                                    <h3 className="text-white text-2xl ">{station.title}</h3>
                                    <div className="text-white text-2xl leading-10 ">
                                        <ReactMarkdown>{station.content}</ReactMarkdown>
                                    </div>
                                </div>

                            </div>
                        ))
                    )}
                </div>
            </div>

                        {/* recive updates */}
                        <ReciveUpdate />
        </>
    )
}

export default Index