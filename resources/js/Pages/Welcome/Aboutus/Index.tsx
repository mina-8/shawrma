import { useTranslation } from 'react-i18next';

import { Head } from '@inertiajs/react';
import { Carousel, ConfigProvider } from 'antd';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import quote from '@/../../public/aboutus/quote.png';
import React from 'react';
import ContentRenderer from '@/Components/ContentRenderer';
interface CoreStories {
    id: number;
    title: string;
    content: string;
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
interface Product {
    id: number;
    title: string;
    link: string;
    image: string;
}
interface Aboutus {
    id: number;
    title: string;
    image: string;
    banner: string;
    content: string;
    description: string;
    coresvesions: CoreVesions[];
    corestations: CoreStations[];
    corestories: CoreStories[];
    products: Product[];

}

interface Props {
    aboutus: Aboutus
}

const Index = ({ aboutus }: Props) => {

    const { t, i18n } = useTranslation();
    const CustomArrow = ({ direction, onClick }: any) => {
        const ArrowIcon = direction === 'prev' ? FaArrowLeft : FaArrowRight;
        return (


            <div
                className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-primary-color text-primary-color shadow-lg cursor-pointer transition hover:bg-custom-dark-blue group"
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
            <Head title={t('aboutus.header')} />
            <div className="grid grid-cols-1 md:grid-cols-2  mx-auto min-h-screen">
                {/* Text Content */}
                <div className="px-12 text-xl leading-10 flex flex-col justify-center">
                    <h3 className="text-4xl font-semibold mb-4">{aboutus?.title}</h3>
                    <div>

                        <ContentRenderer content={aboutus.content} />
                    </div>

                </div>

                {/* Image */}
                <div className="flex justify-center items-center">
                    <img
                        src={aboutus?.image}
                        alt={aboutus?.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Special Products Section */}
            <div className="py-12 bg-gray-100">
                {/* Only show section if products exist */}
                {aboutus.products.length > 0 && (
                    <>
                        {/* Section Title */}
                        <div className="relative text-center mb-8 px-4">
                            <h2 className="text-2xl sm:text-4xl md:text-5xl text-black font-semibold inline-block py-4">
                                {t('aboutus.stories')}
                            </h2>

                        </div>

                        {/* Carousel */}
                        <ConfigProvider
                            theme={{
                                components: {
                                    Carousel: {
                                        dotHeight: 12,
                                        dotWidth: 12,
                                        dotActiveWidth: 20,
                                    },
                                },
                            }}
                        >
                            <div className="max-w-6xl mx-auto px-2 sm:px-4">
                                <Carousel
                                    arrows
                                    dots={false}
                                    autoplay
                                    infinite
                                    slidesToShow={5} // Default on desktop
                                    slidesToScroll={1}
                                    prevArrow={<CustomArrow direction="prev" />}
                                    nextArrow={<CustomArrow direction="next" />}
                                    responsive={[
                                        {
                                            breakpoint: 1280, // Large screens
                                            settings: {
                                                slidesToShow: 2,
                                                slidesToScroll: 1,
                                            },
                                        },
                                        {
                                            breakpoint: 1024, // Medium screens (tablets)
                                            settings: {
                                                slidesToShow: 1,
                                                slidesToScroll: 1,
                                            },
                                        },
                                        {
                                            breakpoint: 640, // Small screens (mobile)
                                            settings: {
                                                slidesToShow: 1,
                                                slidesToScroll: 1,
                                            },
                                        },
                                    ]}
                                >
                                    {aboutus.products.map((item, index) => (
                                        <div key={index} className="p-4">
                                            {/* <div className="flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-white hover:shadow-lg"> */}


                                            {/* Image */}
                                            <a
                                                target='_blank'
                                                href={item.link != '' ? item.link : '#'}
                                                className="text-primary-color w-full flex flex-col justify-center items-center">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    // className="w-full max-h-64 md:max-h-96 object-cover object-center rounded-md"
                                                    className='h-80'
                                                />
                                                <div>
                                                    {item.title}
                                                </div>
                                            </a>
                                            {/* </div> */}
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </ConfigProvider>
                    </>
                )}
            </div>

            {/* about customer stories */}
            <div className="py-12 bg-gray-100 ">
                {/* Section Heading */}
                <div className="text-center mb-8 px-4 relative">
                    <h2 className="text-2xl sm:text-5xl text-black font-semibold inline-block py-4">
                        {t('aboutus.stories')}
                    </h2>
                    <img src={quote} alt="quote"
                        className='absolute top-10 right-1/2 translate-y-1/2 z-10 brightness-0 invert-[40%] sepia-[5%] saturate-[20%]'
                    />
                </div>

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
                            arrows={true}
                            dots={false}
                            autoplay
                            // slidesToShow={1}
                            // slidesToScroll={1}
                            prevArrow={<CustomArrow direction="prev" />}
                            nextArrow={<CustomArrow direction="next" />}
                            responsive={[
                                {
                                    breakpoint: 1024,
                                    settings: { slidesToShow: 1, slidesToScroll: 1 },
                                },
                                {
                                    breakpoint: 768,
                                    settings: { slidesToShow: 1, slidesToScroll: 1 },
                                },
                            ]}
                        >
                            {aboutus.corestories.map((item, index) => (
                                <div key={index}>
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-4">

                                        {/* النص */}
                                        <div className="w-full md:w-1/2 text-center text-2xl">

                                            <ContentRenderer content={item.content} />
                                        </div>

                                        {/* الصورة */}
                                        <div className="w-full md:w-1/2 flex justify-center">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-64 md:h-[530px] object-cover "
                                            />
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </ConfigProvider>
            </div>

            {/* story and elastadma */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">

                {/* الصورة */}
                <div className="h-64 md:h-full">
                    <img
                        src={aboutus?.image}
                        alt="About Us"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* النص */}
                <div className="mx-4 md:mx-8 text-lg md:text-xl leading-relaxed py-6 md:py-0">

                    <ContentRenderer content={aboutus.content} />
                </div>


                {/* النص */}
                <div className="mx-4 md:mx-8 text-lg md:text-xl leading-relaxed py-6 md:py-0">
                    <ContentRenderer content={aboutus.content} />

                </div>

                {/* الصورة */}
                <div className="h-64 md:h-full">
                    <img
                        src={aboutus?.image}
                        alt="About Us"
                        className="w-full h-full object-cover"
                    />
                </div>


            </div>


            {/* about orca corevesion */}
            {aboutus.coresvesions.length > 0 && (
                <div className="flex flex-col">
                    {aboutus.coresvesions.map((item, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col justify-center items-center gap-4 min-h-screen bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url('${item.image}')`,
                            }}
                        >
                            {/* خلفية شفافة اختيارية */}
                            {/* <div className="absolute inset-0 bg-black/40"></div> */}

                            {/* الصندوق الأبيض */}
                            <div
                                className="
            bg-white p-6 sm:p-8 md:p-12 flex flex-col gap-4 sm:gap-6 md:gap-8
            w-[90%] sm:w-[80%] md:w-[60%] lg:w-1/2
            absolute bottom-4 sm:bottom-8 md:bottom-10
            left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-10 lg:right-20
            shadow-lg rounded-lg
          "
                            >
                                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                                    {item.title}
                                </h3>

                                <div className="text-base sm:text-lg md:text-xl leading-relaxed md:leading-9">

                                    <ContentRenderer content={item.content} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}


            {/* certifcate */}
            <div className="my-12 " id='certif'>
                {/* Section certifcate */}
                <div className="text-center mb-8 px-4" >
                    <h2 className="text-2xl sm:text-5xl text-black font-semibold inline-block py-4">
                        {t('aboutus.certifcate')}
                    </h2>
                </div>

                {/* Carousel */}
                <ConfigProvider
                    theme={{
                        components: {
                            Carousel: {
                                dotHeight: 12,
                                dotWidth: 12,
                                dotActiveWidth: 12,
                            },
                        },
                    }}
                >
                    <div className="max-w-7xl mx-auto px-4">
                        <Carousel
                            arrows
                            dots={true}
                            autoplay
                            slidesToShow={5} // ✅ عرض 5 عناصر على الشاشات الكبيرة
                            slidesToScroll={1}
                            prevArrow={<CustomArrow direction="prev" />}
                            nextArrow={<CustomArrow direction="next" />}
                            responsive={[
                                {
                                    breakpoint: 1280, // شاشات كبيرة متوسطة
                                    settings: {
                                        slidesToShow: 4,
                                        slidesToScroll: 1,
                                    },
                                },
                                {
                                    breakpoint: 1024, // تابلت
                                    settings: {
                                        slidesToShow: 3,
                                        slidesToScroll: 1,
                                    },
                                },
                                {
                                    breakpoint: 768, // موبايل كبير
                                    settings: {
                                        slidesToShow: 2,
                                        slidesToScroll: 1,
                                    },
                                },
                                {
                                    breakpoint: 480, // موبايل صغير
                                    settings: {
                                        slidesToShow: 1,
                                        slidesToScroll: 1,
                                    },
                                },
                            ]}
                        >
                            {aboutus.corestations.map((item, index) => (
                                <div
                                    key={index}
                                >
                                    <div
                                        className='flex-col flex justify-center items-center gap-4'
                                    >
                                        <img src={item.image} alt=""
                                            className='h-20 object-cover'
                                        />
                                        <p>{item.title}</p>
                                        <div
                                            className='text-sm'
                                        >

                                            <ContentRenderer content={item.content} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </ConfigProvider>

            </div>


        </>
    )
}

export default Index