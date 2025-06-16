import banner from '@/../../public/aboutus/our-story.jpg'
import ReciveUpdate from '@/Components/ReciveUpdate';
import { Head, Link } from '@inertiajs/react';
import { Carousel, ConfigProvider } from 'antd';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

interface Corevesion {
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

interface Sustainability {
    id: number;
    title: string;
    content: string;
    banner: string;
    image: string;
    pdf: string;
    corestations: CoreStations[];
    corevesions: Corevesion[];
}

interface Props {
    sustainability: Sustainability
}

const Index = ({ sustainability }: Props) => {
    console.log(sustainability)
    const { t, i18n } = useTranslation();
    return (
        <>
            <Head title={t('Sustainability.title')} />
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
                            backgroundImage: `url('${sustainability.banner ? sustainability.banner : banner}')`,
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                    <div className='absolute w-full h-full bg-black top-0 right-0 opacity-50'></div>
                    <h2
                        className={`relative flex w-full  items-center  mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-6xl text-white font-medium`}
                    >
                        {t('Sustainability.title')}
                    </h2>
                </div>
                {/* title */}
                <div
                    className="flex flex-col justify-center items-center my-8 px-4"
                >
                    <div
                        className='flex flex-col justify-center items-center'
                    >
                        <h3
                            className='text-3xl font-semibold text-yellow-original border-b-4 border-yellow-original pb-4'
                        >{sustainability?.title}</h3>

                    </div>

                </div>
                {/* content */}
                <div
                    className='flex justify-between items-center w-full bg-slate-200 mx-0 px-0 dark:bg-gray-900 dark:text-gray-100'
                >
                    <img
                        src={sustainability?.image}
                        className='w-1/2'
                    />
                    <div
                        className='mx-4 text-xl leading-10'
                    >
                        <ReactMarkdown>{sustainability?.content}</ReactMarkdown>
                    </div>
                </div>
                {/* coresvesion */}
                <div
                    className='py-12 flex flex-col justify-center items-center gap-8  '
                >
                    <h3
                        className='text-3xl font-semibold text-yellow-original border-b-4 border-yellow-original pb-4'
                    >{t('ourpromise.ourvalues')}</h3>
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 p-4 max-w-7xl w-full"
                    >
                        {
                            sustainability.corevesions.length > 0 && (
                                sustainability.corevesions.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className={`flex flex-col justify-center items-center gap-4 bg-white shadow-md ${index === 0 ? 'col-span-2' : ''} p-4 group hover:shadow-none dark:bg-gray-600 dark:text-gray-100`}
                                    >
                                        <div
                                            className='h-10'
                                        >
                                            <img src={item.image} alt={item.title}
                                                className='h-full group-hover:animate-scaleup transition-transform duration-300'
                                            />
                                        </div>

                                        <div
                                            className='flex flex-col justify-center items-center gap-4'
                                        >
                                            <h3>{item.title}</h3>
                                            <div>
                                                <ReactMarkdown>{item.content}</ReactMarkdown>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            )
                        }

                    </div>

                </div>
                {/* pdf file */}
                <div
                    className='flex justify-center items-center my-12 p-8 bg-yellow-original'
                >
                    <a
                        href={sustainability.pdf}
                        style={{
                            animationDuration: "1s",
                            animationDelay: "1.5s"
                        }}
                    >
                        <div className='text-xl text-white flex items-center justify-center flex-row-reverse gap-2 p-2 relative group'>
                            {/* Animated background circle that expands on hover */}
                            <div className={`rounded-full w-10 h-10 border-2 border-white absolute ${i18n.language === 'ar' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 transition-all duration-300 group-hover:w-full group-hover:bg-yellow-original z-0`}></div>
                            {/* Content above the background */}
                            <div className={`flex items-center justify-center flex-row-reverse  w-full relative z-10`}>
                                <div className={`flex items-center w-10 h-10 justify-end `}>
                                    {i18n.language === 'ar' ? <FaArrowLeft /> : <FaArrowRight />}

                                </div>
                                <div className='ml-2 text-xl'>{t('Sustainability.pdf-file')}</div>
                            </div>
                        </div>
                    </a>
                </div>

                {/* corestation */}
                <div
                    className='flex justify-center items-center flex-col w-full my-12'
                >
                    <div
                        className='w-[90%] mx-auto'
                    >


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
                                // arrows
                                autoplay
                                infinite

                                className="custom-carousel-dots"

                            >
                                {sustainability.corestations.map((item, index) => (
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
                                                className={`absolute bottom-0 right-0 m-4 z-10 flex flex-col gap-4 w-[40%]  bg-black/50 px-2 md:px-4 py-8 md:py-8 ${i18n.language === 'ar' ? 'items-end text-right' : 'items-start text-left'
                                                    }`}
                                            >
                                                <p className={`text-xl sm:text-xl md:text-xl font-bold text-yellow-original drop-shadow-3xl `}>
                                                    {item.title}
                                                </p>

                                                <div
                                                    className={`text-base sm:text-lg md:text-xl font-medium text-white drop-shadow-3xl line-clamp-6`}
                                                    style={{
                                                        animationDuration: "1s",
                                                        animationDelay: "0.75s",
                                                    }}
                                                >
                                                    <ReactMarkdown>{item.content}</ReactMarkdown>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </ConfigProvider>
                    </div>
                </div>
            </div>
            <ReciveUpdate />
        </>
    )
}

export default Index