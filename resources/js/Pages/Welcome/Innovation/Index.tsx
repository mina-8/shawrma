import ReciveUpdate from '@/Components/ReciveUpdate'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import banner from '@/../../public/aboutus/our-story.jpg'
import ReactMarkdown from 'react-markdown';
import { Carousel, ConfigProvider } from 'antd';
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

interface Innovation {
    id: number;
    title: string;
    image: string;
    banner: string;
    content: string;
    description: string;
    corevesions: CoreVesions[];
    corestations: CoreStations[];

}

interface Props {
    innovation: Innovation
}
const Index = ({ innovation }: Props) => {
    const { t, i18n } = useTranslation();
    const CustomArrow = ({ direction, onClick }: any) => {
        const ArrowIcon = direction === 'prev' ? FaArrowLeft : FaArrowRight;
        return (


            <div
                className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-sky-500 text-sky-500 shadow-lg cursor-pointer transition hover:bg-custom-dark-blue group"
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
            <Head title={t('innovation.title')} />
            <div
                className='bg-gray-50 flex flex-col'
            >
                {/* top banner */}
                <div
                    className='w-full h-[500px] flex relative overflow-hidden'
                >
                    {/* banner */}
                    <div
                        className="w-full h-full bg-cover  absolute inset-0 bg-black/50"
                        style={{
                            backgroundImage: `url('${innovation.banner ? innovation.banner : banner}')`,
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                    {/* title banner */}
                    <h2
                        className={`relative flex w-full items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-6xl text-white font-medium`}
                    >
                        {t('ourculture.title')}
                    </h2>
                </div>
                {/* content */}
                <div
                    className={`text-white overflow-hidden bg-black relative after:absolute after:h-full after:w-60 after:bg-[#082c3d] after:top-0 ${i18n.language === 'ar' ? 'after:right-20 after:-skew-x-12' : 'after:left-20 after:skew-x-12'} `}
                >

                    <div
                        className='relative z-50 w-full max-w-7xl mx-auto flex flex-col  lg:flex-row items-center gap-6 py-12'

                    >
                        <div
                            className='w-1/2 flex flex-col gap-6'
                        >
                            <h3
                                className='text-4xl'
                            >{innovation.title}</h3>
                            <p
                                className='text-xl'
                            >
                                <ReactMarkdown>{innovation.content}</ReactMarkdown>
                            </p>
                        </div>

                        {/* vesion */}
                        <div
                            className='w-1/2 flex justify-center items-center gap-6 flex-wrap'
                        >
                            {innovation?.corevesions.map((item, index) => (
                                <div
                                    className={`aspect-[3/4] h-96 bg-cover bg-center  relative ${(index + 1) % 2 ? 'mt-12' : ''}`}
                                    key={item.id}
                                    style={{
                                        backgroundImage: `url('${item.image}')`,

                                        backgroundRepeat: 'no-repeat'
                                    }}
                                >
                                    <div className='absolute w-full h-full bg-black top-0 right-0 opacity-50'></div>
                                    <div
                                        className='relative flex flex-col gap-4 p-4'
                                    >

                                        <h3
                                            className='text-xl'
                                        >{item?.title}</h3>
                                        <p
                                            className='text-xl'
                                        >
                                            <ReactMarkdown>{item?.content}</ReactMarkdown>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
                {/* station */}
                <div

                    className={`flex justify-center items-center flex-col w-full py-12 max-w-7xl mx-auto `}
                >
                    <h2
                        className='text-3xl border-b-2 border-yellow-original pb-2 mb-4 text-center '
                    >{t('innovation.descover')}</h2>

                    <div className='flex justify-center items-center flex-col w-full'>
                        <div className='w-full'>
                            {innovation.corestations?.length > 0 &&
                                <div className="mt-12 text-center">
                                    
                                    <Carousel
                                        arrows
                                        dots={false}
                                        slidesToShow={3}
                                        slidesToScroll={1}
                                        prevArrow={<CustomArrow direction="prev" />}
                                        nextArrow={<CustomArrow direction="next" />}
                                        responsive={[
                                            {
                                                breakpoint: 1024,
                                                settings: {
                                                    slidesToShow: 2,
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
                                        {innovation.corestations.map((item, index) => (
                                            <div key={index} className="px-2">
                                                <div
                                                    key={item.id}
                                                    className="relative shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                                >
                                                    <div className="overflow-hidden">
                                                        <img src={item.image} className=" hover:scale-125 hover:rotate-12 duration-500" />
                                                    </div>
                                                    <div className="p-4 absolute top-0 right-0 ">
                                                        <h3 className="text-lg font-medium text-yellow-original  mb-2">
                                                            {item.title}
                                                        </h3>

                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <ReciveUpdate />
        </>
    )
}

export default Index