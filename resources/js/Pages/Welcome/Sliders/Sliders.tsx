import { Button, Carousel, ConfigProvider } from 'antd'
import React, { useState } from 'react'

import slideone from '../../../../../public/sliders/hp-slide-3.jpg'
import slidetow from '../../../../../public/sliders/hp-slider4_0.jpg'
import slidethree from '../../../../../public/sliders/hp-slider5.jpg'
import { useTranslation } from 'react-i18next'
import { Link } from '@inertiajs/react'

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'

interface Slides {
    id: number;
    title: string;
    content: string;
    image: string;
    str_btn:string;
    link:string;
}

interface Props {
    slides: Slides[]
}
export default function Sliders({ slides }: Props) {


    const { t, i18n } = useTranslation();

    const [AcitveIndex, setActiveIndex] = useState(0);

    const HandelActiveIndex = (current: number, next: number) => {
        setActiveIndex(next)
    }


    const CustomArrow = ({ direction, onClick }: any) => {
        const ArrowIcon = direction === 'prev' ? FaArrowLeft : FaArrowRight;
        return (
            <div
                className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white shadow-lg cursor-pointer transition hover:bg-custom-dark-blue group"
                style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    [direction === 'prev' ? 'left' : 'right']: '10px',
                }}
                onClick={onClick}
            >
                <ArrowIcon className="text-custom-dark-blue group-hover:text-white text-2xl text-yellow-original" />
            </div>
        );
    };

    const images = [
        slideone,
        slidetow,
        slidethree
    ];

    return (
        <div className='flex justify-center items-center flex-col '>
            <div className='w-full'>
                {slides?.length > 0 ?
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
                        <Carousel
                            arrows
                            autoplay
                            infinite
                            className="custom-carousel-dots"
                            beforeChange={HandelActiveIndex}
                            prevArrow={<CustomArrow direction="prev" />}
                            nextArrow={<CustomArrow direction="next" />}
                        >

                            {slides.map((item, index) =>
                                <div key={item.id}
                                className='relative'
                                >
                                    <div
                                        style={{
                                            height: '700px',
                                            backgroundImage: `url('${item.image}')`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                        className='relative'
                                        >
                                        <div
                                         className={`flex flex-col ${i18n.language === 'ar' ? 'items-end' : 'items-start'} px-24 justify-center gap-2 h-full overflow-hidden`}
                                        >

                                            <div className='absolute w-full h-full bg-black top-0 right-0 opacity-50'></div>

                                            <p className={`pt-20 text-6xl  text-white drop-shadow-3xl xs:text-xl ${AcitveIndex === index ? 'animate-fadeup' : ''} `}>{item.title}</p>

                                            <p className={`py-5 text-3xl  font-bold text-white drop-shadow-3xl xs:text-base xs:text-center ${AcitveIndex === index ? 'animate-fadeup' : ''}`}
                                                style={{
                                                    animationDuration: "1s",
                                                    animationDelay: "0.75s"
                                                }}
                                            >
                                                <ReactMarkdown>{item.content}</ReactMarkdown>
                                            </p>

                                            {
                                                AcitveIndex === index &&

                                                    <div className='flex justify-between items-center gap-4 mt-12 xs:flex-col'>
                                                        <Link
                                                        href={route(`${item.link}`, { lang: i18n.language })}
                                                            className={`${AcitveIndex === index ? 'animate-fadeup' : ''} `}
                                                            style={{
                                                                animationDuration: "1s",
                                                                animationDelay: "1.5s"
                                                            }}
                                                        >
                                                            <div className='text-xl text-white flex items-center justify-center flex-row-reverse gap-2 p-2 relative group'>
                                                                {/* Animated background circle that expands on hover */}
                                                                <div className={`rounded-full w-10 h-10 border-2 border-white absolute ${i18n.language === 'ar' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 transition-all duration-300 group-hover:w-full group-hover:bg-yellow-original z-0`}></div>
                                                                {/* Content above the background */}
                                                                <div className={`flex items-center justify-center ${i18n.language === 'ar' ? 'flex-row' : 'flex-row-reverse'} w-full relative z-10`}>
                                                                    <div className={`flex items-center w-10 h-10 ${i18n.language === 'ar' ? '' : 'justify-end'}`}>
                                                                        {i18n.language === 'ar' ? <FaArrowLeft /> : <FaArrowRight />}

                                                                    </div>
                                                                    <div className='ml-2 text-xl'>{item.str_btn}</div>
                                                                </div>
                                                            </div>
                                                        </Link>

                                                    </div>

                                            }
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Carousel>
                    </ConfigProvider>
                    :

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
                        <Carousel
                            arrows
                            infinite
                            autoplay
                            beforeChange={HandelActiveIndex}
                            prevArrow={<CustomArrow direction="prev" />}
                            nextArrow={<CustomArrow direction="next" />}
                        >

                            {images.map((item, index) =>
                                <div key={index} className='relative'>
                                    <div
                                        style={{
                                            height: '700px',
                                            backgroundImage: `url('${item}')`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                        className='relative'
                                        >
                                        <div className={`flex flex-col ${i18n.language === 'ar' ? 'items-end' : 'items-start'} px-24 justify-center gap-2 h-full overflow-hidden`}>
                                            <p className={`pt-20 text-6xl text-white drop-shadow-3xl xs:text-xl ${AcitveIndex === index ? 'animate-fadeup' : ''} `}>
                                                {t(`slides.title_${index + 1}`)}
                                            </p>

                                            <p className={`py-5 text-3xl  font-bold text-white drop-shadow-3xl xs:text-base xs:text-center ${AcitveIndex === index ? 'animate-fadeup' : ''}`}
                                                style={{
                                                    animationDuration: "1s",
                                                    animationDelay: "0.75s"
                                                }}
                                            >{t(`slides.description_${index + 1}`)}</p>


                                            {
                                                AcitveIndex === 0 ?

                                                    <div className='flex justify-between items-center gap-4 mt-4 xs:flex-col'>
                                                        <Link href={route('welcome', { lang: i18n.language })}
                                                            className={`${AcitveIndex === index ? 'animate-fadeup' : ''}`}
                                                            style={{
                                                                animationDuration: "1s",
                                                                animationDelay: "1.5s"
                                                            }}
                                                        >
                                                            <div className='text-xl text-white flex items-center justify-center flex-row-reverse gap-2 p-2 relative group'>
                                                                {/* Animated background circle that expands on hover */}
                                                                <div className={`rounded-full w-10 h-10 border-2 border-white absolute ${i18n.language === 'ar' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 transition-all duration-300 group-hover:w-full group-hover:bg-yellow-original z-0`}></div>
                                                                {/* Content above the background */}
                                                                <div className={`flex items-center justify-center ${i18n.language === 'ar' ? 'flex-row' : 'flex-row-reverse'} w-full relative z-10`}>
                                                                    <div className={`flex items-center w-10 h-10 ${i18n.language === 'ar' ? '' : 'justify-end'}`}>
                                                                        {i18n.language === 'ar' ? <FaArrowLeft /> : <FaArrowRight />}

                                                                    </div>
                                                                    <div className='ml-2 text-xl'>{t(`slides.button_${index + 1}`)}</div>
                                                                </div>
                                                            </div>
                                                        </Link>

                                                    </div>
                                                    : AcitveIndex === 1 ?

                                                        <div className='flex justify-between items-center gap-4 mt-12 xs:flex-col'>
                                                            <Link href={route('welcome', { lang: i18n.language })}
                                                                className={`${AcitveIndex === index ? 'animate-fadeup' : ''} `}
                                                                style={{
                                                                    animationDuration: "1s",
                                                                    animationDelay: "1.5s"
                                                                }}
                                                            >
                                                                <div className='text-xl text-white flex items-center justify-center flex-row-reverse gap-2 p-2 relative group'>
                                                                    {/* Animated background circle that expands on hover */}
                                                                    <div className={`rounded-full w-10 h-10 border-2 border-white absolute ${i18n.language === 'ar' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 transition-all duration-300 group-hover:w-full group-hover:bg-yellow-original z-0`}></div>
                                                                    {/* Content above the background */}
                                                                    <div className={`flex items-center justify-center ${i18n.language === 'ar' ? 'flex-row' : 'flex-row-reverse'} w-full relative z-10`}>
                                                                        <div className={`flex items-center w-10 h-10 ${i18n.language === 'ar' ? '' : 'justify-end'}`}>
                                                                            {i18n.language === 'ar' ? <FaArrowLeft /> : <FaArrowRight />}

                                                                        </div>
                                                                        <div className='ml-2 text-xl'>{t(`slides.button_${index + 1}`)}</div>
                                                                    </div>
                                                                </div>
                                                            </Link>

                                                        </div>

                                                        : AcitveIndex === 2 ?
                                                            <div className='flex justify-between items-center gap-4 mt-12 xs:flex-col'>
                                                                <Link href={route('welcome', { lang: i18n.language })}
                                                                    className={`${AcitveIndex === index ? 'animate-fadeup' : ''}`}
                                                                    style={{
                                                                        animationDuration: "1s",
                                                                        animationDelay: "1.5s"
                                                                    }}
                                                                >
                                                                    <div className='text-xl text-white flex items-center justify-center flex-row-reverse gap-2 p-2 relative group'>
                                                                        {/* Animated background circle that expands on hover */}
                                                                        <div className={`rounded-full w-10 h-10 border-2 border-white absolute ${i18n.language === 'ar' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 transition-all duration-300 group-hover:w-full group-hover:bg-yellow-original z-0`}></div>
                                                                        {/* Content above the background */}
                                                                        <div className={`flex items-center justify-center ${i18n.language === 'ar' ? 'flex-row' : 'flex-row-reverse'} w-full relative z-10`}>
                                                                            <div className={`flex items-center w-10 h-10 ${i18n.language === 'ar' ? '' : 'justify-end'}`}>
                                                                                {i18n.language === 'ar' ? <FaArrowLeft /> : <FaArrowRight />}

                                                                            </div>
                                                                            <div className='ml-2 text-xl'>{t(`slides.button_${index + 1}`)}</div>
                                                                        </div>
                                                                    </div>
                                                                </Link>

                                                            </div>

                                                            : AcitveIndex === 3 &&
                                                            <div className='flex justify-between items-center gap-4 mt-12 xs:flex-col'>
                                                                <Link href={route('welcome', { lang: i18n.language })}
                                                                    className={`${AcitveIndex === index ? 'animate-fadeup' : ''} `}
                                                                    style={{
                                                                        animationDuration: "1s",
                                                                        animationDelay: "1.5s"
                                                                    }}
                                                                >
                                                                    <div className='text-xl text-white flex items-center justify-center flex-row-reverse gap-2 p-2 relative group'>
                                                                        {/* Animated background circle that expands on hover */}
                                                                        <div className={`rounded-full w-10 h-10 border-2 border-white absolute ${i18n.language === 'ar' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 transition-all duration-300 group-hover:w-full group-hover:bg-sky-500 z-0`}></div>
                                                                        {/* Content above the background */}
                                                                        <div className={`flex items-center justify-center ${i18n.language === 'ar' ? 'flex-row' : 'flex-row-reverse'} w-full relative z-10`}>
                                                                            <div className={`flex items-center w-10 h-10 ${i18n.language === 'ar' ? '' : 'justify-end'}`}>
                                                                                {i18n.language === 'ar' ? <FaArrowLeft /> : <FaArrowRight />}

                                                                            </div>
                                                                            <div className='ml-2 text-xl'>{t(`slides.button_${index + 1}`)}</div>
                                                                        </div>
                                                                    </div>
                                                                </Link>

                                                            </div>

                                            }

                                        </div>
                                    </div>
                                </div>
                            )}
                        </Carousel>
                    </ConfigProvider>
                }
            </div>

        </div>
    )
}
