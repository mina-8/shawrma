import useInView from '@/Components/useInView ';
import { Link } from '@inertiajs/react';
import { Carousel, ConfigProvider } from 'antd';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

interface OurImapct {
    id: number;
    title: string;
    content: string;
    image: string;
    slug: string;
}

interface Props {
    ourimpact: OurImapct[]
}

const OurImapct = ({ ourimpact }: Props) => {
const { ref, isVisible } = useInView();
    const { t, i18n } = useTranslation();
    const [AcitveIndex, setActiveIndex] = useState(0);

    const HandelActiveIndex = (current: number, next: number) => {
        setActiveIndex(next)
    }

    const CustomArrow = ({ direction, onClick }: any) => {
        const ArrowIcon = direction === 'prev' ? FaArrowLeft : FaArrowRight;
        return (
            <div
                className="hidden md:flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white shadow-lg cursor-pointer transition hover:bg-custom-dark-blue group"
                style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    [direction === 'prev' ? 'left' : 'right']: '10px',
                }}
                onClick={onClick}
            >
                <ArrowIcon className="text-custom-dark-blue group-hover:text-white text-xl md:text-2xl" />
            </div>
        );
    };

    return (
        <div
        ref={ref}
        className={`flex justify-center items-center flex-col w-full py-12 transition-all duration-700 ease-in-out transform ${isVisible ? 'animate-fadeup opacity-100' : 'opacity-0'}`}
        >
            <h2
                className='text-3xl border-b-2 border-yellow-original pb-2 mb-4 text-center '
            >{t('ourimpact.title')}</h2>

            <div className='flex justify-center items-center flex-col w-full'>
                <div className='w-full'>
                    {ourimpact?.length > 0 && (
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
                                centerMode={true}
                                slidesToShow={1}
                                centerPadding="15%"
                                slidesToScroll={1}
                                className="custom-carousel-dots"
                                beforeChange={HandelActiveIndex}
                                prevArrow={<CustomArrow direction="prev" />}
                                nextArrow={<CustomArrow direction="next" />}
                            >
                                {ourimpact.map((item, index) => (
                                    <div key={item.id} className="relative">
                                        <div
                                            className="relative"
                                            style={{
                                                backgroundImage: `url('${item.image}')`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                height: '60vh',
                                            }}
                                        >
                                            {/* <div className="absolute w-full h-full bg-black/60 top-0 left-0 z-0"></div> */}

                                            <div
                                                className={`relative z-10 flex flex-col gap-4 w-[40%] h-full bg-black/50 px-2 md:px-4 py-8 md:py-8 ${i18n.language === 'ar' ? 'items-end text-right' : 'items-start text-left'
                                                    }`}
                                            >
                                                <p className={`text-xl sm:text-xl md:text-xl font-bold text-yellow-original drop-shadow-3xl ${AcitveIndex === index ? 'animate-fadeup' : ''}`}>
                                                    {item.title}
                                                </p>

                                                <div
                                                    className={`text-base sm:text-lg md:text-xl font-medium text-white drop-shadow-3xl ${AcitveIndex === index ? 'animate-fadeup' : ''} line-clamp-6`}
                                                    style={{
                                                        animationDuration: "1s",
                                                        animationDelay: "0.75s",
                                                    }}
                                                >
                                                    <ReactMarkdown>{item.content}</ReactMarkdown>
                                                </div>

                                                {AcitveIndex === index && (
                                                    <div className="mt-8">
                                                        <Link
                                                            href={route('leading-impact.show', { lang: i18n.language ,slug:item.slug})}
                                                            className={`${AcitveIndex === index ? 'animate-fadeup' : ''}`}
                                                            style={{
                                                                animationDuration: "1s",
                                                                animationDelay: "1.5s"
                                                            }}
                                                        >
                                                            <div className="text-lg sm:text-xl text-white flex items-center justify-center flex-row-reverse gap-2 p-2 relative group">
                                                                <div
                                                                    className={`rounded-full w-10 h-10 border-2 border-white absolute ${i18n.language === 'ar' ? 'left-0' : 'right-0'
                                                                        } top-1/2 -translate-y-1/2 transition-all duration-300 group-hover:w-full group-hover:bg-yellow-original z-0`}
                                                                ></div>
                                                                <div
                                                                    className={`flex items-center ${i18n.language === 'ar' ? 'flex-row' : 'flex-row-reverse'
                                                                        } w-full relative z-10`}
                                                                >
                                                                    <div className={`flex items-center w-10 h-10 ${i18n.language === 'ar' ? 'justify-start' : 'justify-end'}`}>
                                                                        {i18n.language === 'ar' ? <FaArrowLeft /> : <FaArrowRight />}
                                                                    </div>
                                                                    <div className="ml-2">{t('ourimpact.readmore')}</div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </ConfigProvider>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OurImapct;
