import { Head } from '@inertiajs/react';
import React from 'react'
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import banner from '@/../../public/aboutus/our-story.jpg'

import ReciveUpdate from '@/Components/ReciveUpdate';
import { Carousel, ConfigProvider } from 'antd';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';




interface CoreVesions {
    id: number;
    title: string;
    content: string;
    image: string;
}

interface OurTeam {
    id: number;
    title: string;
    banner: string;
    content: string;

    corevesions: CoreVesions[];

}

interface Props {
    ourteam: OurTeam
}
const Index = ({ ourteam }: Props) => {
    const { t, i18n } = useTranslation();
const CustomArrow = ({ direction, onClick }: any) => {
        const ArrowIcon = direction === 'prev' ? FaArrowLeft : FaArrowRight;
        return (


            <div
                className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-yellow-original text-yellow-original shadow-lg cursor-pointer transition hover:bg-custom-dark-blue group"
                style={{
                    position: 'absolute',
                    top: '50%',

                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    [direction === 'prev' ? 'left' : 'right']: '-50px',
                }}
                onClick={onClick}
            >
                <ArrowIcon className="text-custom-dark-blue group-hover:text-white text-2xl" />
            </div>
        );
    };

    return (
        <>
            <Head title={t('ourteam.title')} />
            <div
                className="bg-gray-50 flex flex-col dark:bg-gray-900 dark:text-gray-100"
            >
                {/* top banner */}
                <div
                    className="w-full h-[500px] flex relative overflow-hidden"
                >
                    <div
                        className="w-full h-full bg-cover  absolute"
                        style={{
                            backgroundImage: `url('${ourteam.banner ? ourteam.banner : banner}')`,
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                    <div className='absolute w-full h-full bg-black top-0 right-0 opacity-50'></div>
                    <h2
                        className={`relative flex w-full  items-center  mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-6xl text-white font-medium`}
                    >
                        {ourteam.title}
                    </h2>
                </div>
                {/* description */}
                <div
                    className="flex flex-col justify-center items-center my-8 px-4"
                >
                    <div
                        className='flex flex-col justify-center items-center'
                    >
                        <h3
                            className='text-3xl font-semibold text-yellow-original border-b-4 border-yellow-original pb-4'
                        >{ourteam?.title}</h3>
                        <div
                            className='mx-12 my-12 text-lg leading-8 w-1/2'
                        >
                            <ReactMarkdown>{ourteam?.content}</ReactMarkdown>
                        </div>
                    </div>

                </div>

                {/* core vesion */}
                <div className="py-12 bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
                {/* Section Heading */}

                {/* Carousel */}
                <ConfigProvider
                    theme={{
                        components: {
                            Carousel: {
                                dotHeight: 20,
                                dotWidth: 20,
                                dotActiveWidth: 20,
                            },
                        },
                    }}
                >
                    <div className="max-w-5xl mx-auto px-4">
                        <Carousel
                            arrows
                            slidesToShow={1}
                            slidesToScroll={1}
                            prevArrow={<CustomArrow direction="prev" />}
                            nextArrow={<CustomArrow direction="next" />}
                            responsive={[
                                {
                                    breakpoint: 1024,
                                    settings: {
                                        slidesToShow: 1,
                                        slidesToScroll: 1,
                                    },
                                },
                                {
                                    breakpoint: 768,
                                    settings: {
                                        slidesToShow: 1,
                                        slidesToScroll: 1,
                                    },
                                },
                            ]}
                        >
                            {ourteam.corevesions.map((item, index) => (
                                <div key={index} className="px-4">
                                    <div className="bg-white my-12 shadow-md p-6 pt-16 relative dark:bg-gray-900 dark:text-gray-100">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-24 h-24 rounded-full object-cover mb-4 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white shadow-md"
                                        />
                                        <h3 className="text-lg font-semibold text-yellow-original mb-4  text-center">
                                            {item.title}
                                        </h3>
                                        <div className="text-sm text-gray-700 text-center">
                                            <ReactMarkdown>{item.content}</ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </ConfigProvider>
            </div>

            </div>

            {/* recive updates */}
            <ReciveUpdate />
        </>
    )
}

export default Index