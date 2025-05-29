import { Head } from '@inertiajs/react';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FaPlay } from 'react-icons/fa';
interface ProductVideo {
    id: number;
    image: string;
    youtube_link: string;
}
interface Props {
    productvideo: ProductVideo[]
}
const Index = ({ productvideo }: Props) => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const ShowVideo = (video: string) => {
        setSelectedVideo(video);
        setIsOpen(true)
    }
    const CloseVideo = () => {
        setIsOpen(false);
        setSelectedVideo(null);
    };
    return (
        <>
            <Head title={t('productvideo.header')} />
            <div className=" bg-gray-50 flex flex-col">
                {/* Top Banner */}
                <div className="w-full h-16 bg-yellow-original bg-cover bg-center" />
            </div>
            {/* content */}
            <div
                className='flex flex-col justify-center items-center w-full max-w-7xl mx-auto my-12'
            >
                <h2
                    className='text-2xl font-semibold pb-2 border-b-2 border-b-yellow-original'
                >{t('productvideo.title')}</h2>
                <p
                    className='w-3/4 text-xl py-4 text-center'
                >{t('productvideo.content')}</p>
            </div>
            {/* product videos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8 w-full max-w-7xl mx-auto">
                {productvideo.length > 0 &&
                    productvideo.map((item) => (
                        <div
                            key={item.id}
                            className='relative'
                        >
                            <img
                                src={item.image}
                                alt={t('productvideo.title')}
                                loading='lazy'
                                className='h-60 relative bg-center bg-cover'
                            />
                            <div
                                onClick={() => ShowVideo(item.youtube_link)}
                                className='absolute bottom-0 left-0 bg-yellow-original p-4 cursor-pointer'
                            >
                                <FaPlay className="text-white text-2xl" />
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* modal */}
            {
                isOpen && selectedVideo && (
                    <div
                        onClick={CloseVideo}
                        className='fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4'
                    >
                        <div
                            className="bg-white rounded-lg overflow-hidden w-full max-w-3xl relative"
                        >
                            <button
                                onClick={CloseVideo}
                                className="absolute top-2 right-2 text-white bg-black rounded-full w-8 h-8 flex items-center justify-center z-10"
                            >
                                ✕
                            </button>

                            <div
                                className="w-full aspect-video"
                            >
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={selectedVideo}
                                    title="YouTube video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                    </div>
                )
            }
        </>
    )
}

export default Index