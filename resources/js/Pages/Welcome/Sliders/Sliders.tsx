import { Button, Carousel, ConfigProvider } from 'antd'
import React, { useState } from 'react'

import slideone from '../../../../../public/sliders/hp-slide-3.jpg'
import slidetow from '../../../../../public/sliders/hp-slider4_0.jpg'
import slidethree from '../../../../../public/sliders/hp-slider5.jpg'
import { useTranslation } from 'react-i18next'
import { Link } from '@inertiajs/react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

interface Slides {
    id: number;
    lang_id: number;
    title: string;
    subtitle: string;
    image: string;
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
        const ArrowIcon = direction === 'prev' ? LeftOutlined : RightOutlined;
        return (
            <div

                style={{
                    color: 'black',
                    fontSize: '24px',
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    [direction === 'prev' ? 'left' : 'right']: '10px',
                }}

                onClick={onClick}
            >
                <ArrowIcon className='text-white hover:!text-custom-dark-blue' />
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
                    <Carousel arrows autoplay infinite
                        beforeChange={HandelActiveIndex}
                        prevArrow={<CustomArrow direction="prev" />}
                        nextArrow={<CustomArrow direction="next" />}
                    >

                        {slides.map((item, index) =>
                            <div key={item.id}>
                                <div
                                    style={{

                                        height: '700px',
                                        backgroundImage: `url('${item.image}')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                    className='relative'>
                                    <div className='flex flex-col items-center justify-center gap-2 h-full overflow-hidden'>

                                        <div className='absolute w-full h-full bg-black top-0 right-0 opacity-50'></div>

                                        <p className={`pt-20 text-6xl font-sans text-white drop-shadow-3xl xs:text-xl ${AcitveIndex === index ? 'animate-fadeup' : ''} `}>{item.title}</p>

                                        <p className={`py-5 text-3xl font-sans font-bold text-white drop-shadow-3xl xs:text-base xs:text-center ${AcitveIndex === index ? 'animate-fadeup' : ''}`}
                                            style={{
                                                animationDuration: "1s",
                                                animationDelay: "0.75s"
                                            }}
                                        >{item.subtitle}</p>

                                        {
                                            AcitveIndex === 0 ?

                                                <div className='flex justify-between items-center gap-4 mt-12 xs:flex-col'>
                                                    <Link href={route('welcome', { lang: i18n.language })}
                                                        className={`${AcitveIndex === index ? 'animate-fadeup' : ''} !font-sans`}
                                                        style={{
                                                            animationDuration: "1s",
                                                            animationDelay: "1.5s"
                                                        }}
                                                    >
                                                        <Button className='rounded-full p-10 text-3xl font-bold hover:!bg-[welcome38b6ffc7] hover:!border-white hover:!text-white !font-sans !bg-custom-dark-blue !border-white !text-white hover:border-4'>{t('sliders.slides_btn.getadvice')}</Button>
                                                    </Link>


                                                    <Link href={route('welcome', { lang: i18n.language })}
                                                        className={`${AcitveIndex === index ? 'animate-fadeup' : ''} !font-sans`}
                                                        style={{
                                                            animationDuration: "1s",
                                                            animationDelay: "1s"
                                                        }}
                                                    >
                                                        <Button className='rounded-full p-10 text-3xl font-bold hover:!bg-[welcome38b6ffc7] hover:!border-white hover:!text-white !font-sans !bg-custom-dark-blue !border-white !text-white hover:border-4'>{t('sliders.slides_btn.bookingnow')}</Button>
                                                    </Link>


                                                </div>
                                                : AcitveIndex === 1 ?

                                                    <div className='flex justify-between items-center gap-4 mt-12 xs:flex-col'>
                                                        <Link href={route('welcome', { lang: i18n.language })}
                                                            className={`${AcitveIndex === index ? 'animate-fadeup' : ''} !font-sans`}
                                                            style={{
                                                                animationDuration: "1s",
                                                                animationDelay: "1.5s"
                                                            }}
                                                        >
                                                            <Button className='rounded-full p-10 text-3xl font-bold hover:!bg-[welcome38b6ffc7] hover:!border-white hover:!text-white !font-sans !bg-custom-dark-blue !border-white !text-white hover:border-4'>{t('sliders.slides_btn.showservice')}</Button>
                                                        </Link>
                                                        <Link href={route('welcome', { lang: i18n.language })}
                                                            className={`${AcitveIndex === index ? 'animate-fadeup' : ''} !font-sans`}
                                                            style={{
                                                                animationDuration: "1s",
                                                                animationDelay: "1s"
                                                            }}
                                                        >
                                                            <Button className='rounded-full p-10 text-3xl font-bold hover:!bg-[welcome38b6ffc7] hover:!border-white hover:!text-white !font-sans !bg-custom-dark-blue !border-white !text-white hover:border-4'>{t('sliders.slides_btn.getadvice')}</Button>
                                                        </Link>
                                                    </div>

                                                    : AcitveIndex === 2 ?
                                                        <div className='flex justify-between items-center gap-4 mt-12 xs:flex-col'>
                                                            <Link href={route('welcome', { lang: i18n.language })}
                                                                className={`${AcitveIndex === index ? 'animate-fadeup' : ''} !font-sans`}
                                                                style={{
                                                                    animationDuration: "1s",
                                                                    animationDelay: "1.5s"
                                                                }}
                                                            >
                                                                <Button className='rounded-full p-10 text-3xl font-bold hover:!bg-[welcome38b6ffc7] hover:!border-white hover:!text-white !font-sans !bg-custom-dark-blue !border-white !text-white hover:border-4'>{t('sliders.slides_btn.contactuse')}</Button>

                                                            </Link>
                                                            <Link href={route('welcome', { lang: i18n.language })}
                                                                className={`${AcitveIndex === index ? 'animate-fadeup' : ''} !font-sans`}
                                                                style={{
                                                                    animationDuration: "1s",
                                                                    animationDelay: "1s"
                                                                }}
                                                            >
                                                                <Button className='rounded-full p-10 text-3xl font-bold hover:!bg-[welcome38b6ffc7] hover:!border-white hover:!text-white !font-sans !bg-custom-dark-blue !border-white !text-white hover:border-4'>{t('sliders.slides_btn.bookvisit')}</Button>
                                                            </Link>
                                                        </div>

                                                        : AcitveIndex === 3 &&
                                                        <div className='flex justify-between items-center gap-4 mt-12 xs:flex-col'>
                                                            <Link href={route('welcome', { lang: i18n.language })}
                                                                className={`${AcitveIndex === index ? 'animate-fadeup' : ''} !font-sans`}
                                                                style={{
                                                                    animationDuration: "1s",
                                                                    animationDelay: "1.5s"
                                                                }}
                                                            >
                                                                <Button className='rounded-full p-10 text-3xl font-bold hover:!bg-[welcome38b6ffc7] hover:!border-white hover:!text-white !font-sans !bg-custom-dark-blue !border-white !text-white hover:border-4'>{t('sliders.slides_btn.ourservice')}</Button>
                                                            </Link>
                                                            <Link href={route('welcome', { lang: i18n.language })}
                                                                className={`${AcitveIndex === index ? 'animate-fadeup' : ''} !font-sans`}
                                                                style={{
                                                                    animationDuration: "1s",
                                                                    animationDelay: "1s"
                                                                }}
                                                            >
                                                                <Button className='rounded-full p-10 text-3xl font-bold hover:!bg-[welcome38b6ffc7] hover:!border-white hover:!text-white !font-sans !bg-custom-dark-blue !border-white !text-white hover:border-4'>{t('sliders.slides_btn.callemergency')}</Button>
                                                            </Link>
                                                        </div>

                                        }
                                    </div>
                                </div>
                            </div>
                        )}
                    </Carousel>
                    :

                    <Carousel arrows infinite
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
                                    className='relative'>
                                    <div className={`flex flex-col ${i18n.language === 'ar' ? 'items-end' : 'items-start'} px-24 justify-center gap-2 h-full overflow-hidden`}>

                                        {/* <div
                                            className="absolute w-full h-1/2 shadow-2xl top-0 right-0 opacity-50 flex flex-col items-center justify-center"
                                        ></div> */}

                                            <p className={`pt-20 text-6xl font-sans text-white drop-shadow-3xl xs:text-xl ${AcitveIndex === index ? 'animate-fadeup' : ''} `}>
                                                {t(`title`)}
                                            </p>

                                        <p className={`py-5 text-3xl font-sans font-bold text-white drop-shadow-3xl xs:text-base xs:text-center ${AcitveIndex === index ? 'animate-fadeup' : ''}`}
                                            style={{
                                                animationDuration: "1s",
                                                animationDelay: "0.75s"
                                            }}
                                        >{t(`subtitle`)}</p>


                                            {
                                                AcitveIndex === 0 ?

                                                    <div className='flex justify-between items-center gap-4 mt-12 xs:flex-col'>
                                                        <Link href={route('welcome', { lang: i18n.language })}
                                                            className={`${AcitveIndex === index ? 'animate-fadeup' : ''} !font-sans`}
                                                            style={{
                                                                animationDuration: "1s",
                                                                animationDelay: "1.5s"
                                                            }}
                                                        >
                                                            <Button className='rounded-full p-10 text-3xl font-bold hover:!bg-[welcome38b6ffc7] hover:!border-white hover:!text-white !font-sans !bg-custom-dark-blue !border-white !text-white hover:border-4'>{t('sliders.slides_btn.getadvice')}</Button>
                                                        </Link>


                                                        <Link href={route('welcome', { lang: i18n.language })}
                                                            className={`${AcitveIndex === index ? 'animate-fadeup' : ''} !font-sans`}
                                                            style={{
                                                                animationDuration: "1s",
                                                                animationDelay: "1s"
                                                            }}
                                                        >
                                                            <Button className='rounded-full p-10 text-3xl font-bold hover:!bg-[welcome38b6ffc7] hover:!border-white hover:!text-white !font-sans !bg-custom-dark-blue !border-white !text-white hover:border-4'>{t('sliders.slides_btn.bookingnow')}</Button>
                                                        </Link>


                                                    </div>
                                                    : AcitveIndex === 1 ?

                                                        <div className='flex justify-between items-center gap-4 mt-12 xs:flex-col'>
                                                            <Link href={route('welcome', { lang: i18n.language })}
                                                                className={`${AcitveIndex === index ? 'animate-fadeup' : ''} !font-sans`}
                                                                style={{
                                                                    animationDuration: "1s",
                                                                    animationDelay: "1.5s"
                                                                }}
                                                            >
                                                                <Button className='rounded-full p-10 text-3xl font-bold hover:!bg-[welcome38b6ffc7] hover:!border-white hover:!text-white !font-sans !bg-custom-dark-blue !border-white !text-white hover:border-4'>{t('sliders.slides_btn.showservice')}</Button>
                                                            </Link>
                                                            <Link href={route('welcome', { lang: i18n.language })}
                                                                className={`${AcitveIndex === index ? 'animate-fadeup' : ''} !font-sans`}
                                                                style={{
                                                                    animationDuration: "1s",
                                                                    animationDelay: "1s"
                                                                }}
                                                            >
                                                                <Button className='rounded-full p-10 text-3xl font-bold hover:!bg-[welcome38b6ffc7] hover:!border-white hover:!text-white !font-sans !bg-custom-dark-blue !border-white !text-white hover:border-4'>{t('sliders.slides_btn.getadvice')}</Button>
                                                            </Link>
                                                        </div>

                                                        : AcitveIndex === 2 ?
                                                            <div className='flex justify-between items-center gap-4 mt-12 xs:flex-col'>
                                                                <Link href={route('welcome', { lang: i18n.language })}
                                                                    className={`${AcitveIndex === index ? 'animate-fadeup' : ''} !font-sans`}
                                                                    style={{
                                                                        animationDuration: "1s",
                                                                        animationDelay: "1.5s"
                                                                    }}
                                                                >
                                                                    <Button className='rounded-full p-10 text-3xl font-bold hover:!bg-[welcome38b6ffc7] hover:!border-white hover:!text-white !font-sans !bg-custom-dark-blue !border-white !text-white hover:border-4'>{t('sliders.slides_btn.contactuse')}</Button>

                                                                </Link>
                                                                <Link href={route('welcome', { lang: i18n.language })}
                                                                    className={`${AcitveIndex === index ? 'animate-fadeup' : ''} !font-sans`}
                                                                    style={{
                                                                        animationDuration: "1s",
                                                                        animationDelay: "1s"
                                                                    }}
                                                                >
                                                                    <Button className='rounded-full p-10 text-3xl font-bold hover:!bg-[welcome38b6ffc7] hover:!border-white hover:!text-white !font-sans !bg-custom-dark-blue !border-white !text-white hover:border-4'>{t('sliders.slides_btn.bookvisit')}</Button>
                                                                </Link>
                                                            </div>

                                                            : AcitveIndex === 3 &&
                                                            <div className='flex justify-between items-center gap-4 mt-12 xs:flex-col'>
                                                                <Link href={route('welcome', { lang: i18n.language })}
                                                                    className={`${AcitveIndex === index ? 'animate-fadeup' : ''} !font-sans`}
                                                                    style={{
                                                                        animationDuration: "1s",
                                                                        animationDelay: "1.5s"
                                                                    }}
                                                                >
                                                                    <Button className='rounded-full p-10 text-3xl font-bold hover:!bg-[welcome38b6ffc7] hover:!border-white hover:!text-white !font-sans !bg-custom-dark-blue !border-white !text-white hover:border-4'>{t('sliders.slides_btn.ourservice')}</Button>
                                                                </Link>
                                                                <Link href={route('welcome', { lang: i18n.language })}
                                                                    className={`${AcitveIndex === index ? 'animate-fadeup' : ''} !font-sans`}
                                                                    style={{
                                                                        animationDuration: "1s",
                                                                        animationDelay: "1s"
                                                                    }}
                                                                >
                                                                    <Button className='rounded-full p-10 text-3xl font-bold hover:!bg-[welcome38b6ffc7] hover:!border-white hover:!text-white !font-sans !bg-custom-dark-blue !border-white !text-white hover:border-4'>{t('sliders.slides_btn.callemergency')}</Button>
                                                                </Link>
                                                            </div>

                                            }

                                    </div>
                                </div>
                            </div>
                        )}
                    </Carousel>
                }
            </div>

        </div>
    )
}
