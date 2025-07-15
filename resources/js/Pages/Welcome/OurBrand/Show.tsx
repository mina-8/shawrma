import { Head, Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import banner from '@/../../public/aboutus/our-story.jpg'
import ReactMarkdown from "react-markdown";
import CountNumber from "@/Components/CountNumber";
import ReciveUpdate from "@/Components/ReciveUpdate";
import isInLastRow from '@/Components/IsinLastRow/IsinLastRow';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Carousel } from "antd";
interface FactNumber {
    id: number;
    title: string;
    number: number;
    mark_number: string;
    image: string;
}

interface CoreStation {
    id: number;
    title: string;
    content: string;
    image: string;
}

interface Brand {
    id: number;
    header_title: string;
    title: string;
    content: string;
    color: string;
    banner: string;
    image: string;
    pdf: string;
    slug: string;
    factsnumber: FactNumber[];
    corestation: CoreStation[];
}

interface MainProduct {
    id: number;
    title: string;
    image: string;
    slug: string;
}



interface Props {
    brand: Brand;
    otherbrand: Brand[];
    mainproducts: MainProduct[];
}
const Show = ({ brand, otherbrand, mainproducts }: Props) => {
    const { t, i18n } = useTranslation();
    const CustomArrow = ({ direction, onClick }: any) => {
        const ArrowIcon = direction === 'prev' ? FaArrowLeft : FaArrowRight;
        return (


            <div
                className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-primary-color text-primary-color shadow-lg cursor-pointer transition hover:bg-custom-dark-blue group "
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
            <Head title={brand.header_title} />
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
                            backgroundImage: `url('${brand.banner ? brand.banner : banner}')`,
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                    <div className='absolute w-full h-full bg-black top-0 right-0 opacity-50'></div>
                    <h2
                        className={`relative flex w-full  items-center  mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-6xl text-white font-medium`}
                    >
                        {brand.header_title}
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
                            className='text-3xl font-semibold  border-b-4 border-primary-color pb-4'
                        >{brand?.title}</h3>
                        <div
                            className=' my-12 text-lg  w-3/4'
                        >
                            <ReactMarkdown>{brand?.content}</ReactMarkdown>
                        </div>
                    </div>

                </div>


                {/* facts and numbers */}
                <div
                    className='flex flex-col justify-center items-center py-8'
                >

                    <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 my-8 w-full max-w-7xl'>
                        {brand.factsnumber.length > 0 && (
                            brand.factsnumber.map((item, index) => (
                                <div key={index}
                                    className={`flex items-center p-8  border-gray-400  group relative before:absolute before:content-[''] before:top-1/2 before:-translate-y-1/2  before:right-0 before:w-[1px] before:h-1/2 before:bg-gray-400 after:absolute after:content-[''] ${isInLastRow(index, brand.factsnumber.length, 3) ? '' : 'after:w-1/2'} after:h-[1px] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-gray-400`}
                                >

                                    <img src={item.image} alt={item.title} className='h-14 object-cover  group-hover:animate-scaleup transition-transform duration-300' />
                                    <div className='px-4'>
                                        <div className='flex gap-2 items-center'>
                                            {
                                                i18n.language === 'en' && (
                                            <span className='text-3xl font-bold text-primary-color whitespace-nowrap'>{item.mark_number}</span>
                                            )
                                            }

                                            <CountNumber number={item.number} />


                                        {
                                            i18n.language === 'ar' && (
                                                <span className='text-3xl font-bold text-primary-color whitespace-nowrap'>{item.mark_number}</span>
                                            )
                                        }
                                        </div>
                                        <p className='text-lg '>{item.title}</p>


                                    </div>

                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* core stations */}
                {brand.corestation.length > 0 && (
                    <div
                        className='flex flex-col h-[700px]'
                    >
                        {brand.corestation.map((corestation) => (
                            <div
                                key={corestation.id}
                                className='object-cover h-full bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center gap-4 py-8 px-12 '
                                style={{
                                    backgroundImage: `url('${corestation.image}')`
                                }}
                            >
                                <h3
                                    className='text-3xl font-semibold text-primary-color border-b-4 border-primary-color pb-4'
                                >{corestation.title}</h3>
                                <div
                                    className='mx-4 text-xl text-white leading-10'
                                >
                                    <ReactMarkdown>{corestation?.content}</ReactMarkdown>
                                </div>

                            </div>
                        ))}
                    </div>
                )}

                {/* all product */}
                {mainproducts.length > 0 &&
                    <div className="w-full max-w-7xl mx-auto mt-12 text-center">
                        <div
                            className="flex justify-center items-center"
                        >

                            <h2 className=" text-2xl text-primary-color font-semibold  mb-6 border-b-2 border-primary-color pb-2">{t('blogcards.otherblogs')}</h2>
                        </div>
                        <Carousel
                            arrows
                            dots={false}
                            slidesToShow={5}
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
                            {mainproducts.map((item) => (
                                <div key={item.id} className="px-2">
                                    <div className="relative group aspect-[3/4] h-full shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                        <div className="overflow-hidden h-full">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover transform hover:scale-125 hover:rotate-12 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className='absolute w-full h-full bg-black top-0 right-0 opacity-50 group-hover:opacity-0'></div>
                                        <div
                                            className={`absolute bottom-0 p-4 ${i18n.language === 'ar' ? 'right-0 text-right' : 'left-0 text-left'
                                                }`}
                                        >
                                            <Link
                                                href={route('news.show', {
                                                    lang: i18n.language,
                                                    slug: item.slug,
                                                })}
                                            >
                                                <h3 className="text-lg font-semibold text-white mb-2">
                                                    {item.title}
                                                </h3>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </Carousel>
                    </div>
                }
                <div
                    className="bg-primary-color py-8 flex justify-center items-center my-12"
                    style={{
                        backgroundColor: `${brand.color}`
                    }}
                >

                    <Link href={route(`product-search`, { lang: i18n.language })}

                        style={{
                            animationDuration: "1s",
                            animationDelay: "1.5s"
                        }}
                    >
                        <div className='text-xl text-white flex items-center justify-center flex-row-reverse gap-2 p-2 relative group'>
                            {/* Animated background circle that expands on hover */}
                            <div className={`rounded-full w-10 h-10 border-2 border-white absolute ${i18n.language === 'ar' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 transition-all duration-300 group-hover:w-full group-hover:bg-primary-color z-0`}
                                style={{
                                    backgroundColor: `${brand.color}`
                                }}
                            ></div>
                            {/* Content above the background */}
                            <div className={`flex items-center justify-center flex-row-reverse  w-full relative z-10`}>
                                <div className={`flex items-center w-10 h-10 justify-end `}>
                                    {i18n.language === 'ar' ? <FaArrowLeft /> : <FaArrowRight />}

                                </div>
                                <div className='ml-2 text-xl'>{t('brand.allproduct')}</div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* other brands */}
                <div className="w-full max-w-7xl mx-auto my-8 px-4">
                    <div className="flex flex-col justify-center items-center">
                        <h3 className="text-3xl font-semibold border-b-4 border-primary-color pb-4">
                            {t('brand.otherbrands')}
                        </h3>

                        <div className="flex flex-col lg:flex-row gap-6 mt-8">
                            {otherbrand?.map((item) => (
                                <Link
                                    href={route('brand-show', { lang: i18n.language, slug: item.slug })}
                                    key={item.id} className="flex flex-col items-center">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{
                                            filter: 'grayscale(100%) brightness(0.6) contrast(0.1)',
                                            opacity: 0.7,
                                        }}
                                        className="w-full h-auto object-contain transition-all duration-300 ease-in-out hover:!filter-none hover:!opacity-100"
                                    />

                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* download pdf */}
                <div
                    className="bg-primary-color py-8 flex justify-center items-center my-12"
                    style={{
                        backgroundColor: `${brand.color}`
                    }}
                >

                    <a
                        href={brand.pdf}
                        // href={route(`product-search`, { lang: i18n.language })}

                        style={{
                            animationDuration: "1s",
                            animationDelay: "1.5s"
                        }}
                    >
                        <div className='text-xl text-white flex items-center justify-center flex-row-reverse gap-2 p-2 relative group'>
                            {/* Animated background circle that expands on hover */}
                            <div className={`rounded-full w-10 h-10 border-2 border-white absolute ${i18n.language === 'ar' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 transition-all duration-300 group-hover:w-full group-hover:bg-primary-color z-0`}
                                style={{
                                    backgroundColor: `${brand.color}`
                                }}
                            ></div>
                            {/* Content above the background */}
                            <div className={`flex items-center justify-center flex-row-reverse  w-full relative z-10`}>
                                <div className={`flex items-center w-10 h-10 justify-end `}>
                                    {i18n.language === 'ar' ? <FaArrowLeft /> : <FaArrowRight />}

                                </div>
                                <div className='ml-2 text-xl'>{t('brand.catalog')}</div>
                            </div>
                        </div>
                    </a>
                </div>


            </div>

            {/* recive updates */}
            <ReciveUpdate />
        </>
    )
}

export default Show