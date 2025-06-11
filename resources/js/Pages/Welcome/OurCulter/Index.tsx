import { useTranslation } from 'react-i18next';
import banner from '@/../../public/aboutus/our-story.jpg'
import ReactMarkdown from 'react-markdown';
import { Head } from '@inertiajs/react';
import { Carousel, ConfigProvider } from 'antd';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ReciveUpdate from '@/Components/ReciveUpdate';
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

interface OurCulter {
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
    ourculture: OurCulter
}

const Index = ({ ourculture }: Props) => {
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
            <Head title={t('ourculture.title')} />
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
                            backgroundImage: `url('${ourculture.banner ? ourculture.banner : banner}')`,
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                    <div className='absolute w-full h-full bg-black top-0 right-0 opacity-50'></div>
                    {/* title banner */}
                    <h2
                        className={`relative flex w-full items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-6xl text-white font-medium`}
                    >
                        {t('ourculture.title')}
                    </h2>
                </div>
            </div>
            {/* content grid*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 w-full max-w-7xl mx-auto">
                {/* Main Content */}
                <div>
                    <h3 className="text-4xl font-semibold mb-4">{ourculture?.title}</h3>
                    <div className="text-lg leading-8">
                        <ReactMarkdown>{ourculture?.description || ''}</ReactMarkdown>
                    </div>
                </div>

                {Array.isArray(ourculture?.corevesions) && ourculture.corevesions.length > 0 &&
                    ourculture.corevesions.map((vision) => (
                        <div
                            key={vision.id}
                            className="w-full aspect-[3/4] perspective group"
                        >
                            <div className="relative w-full h-full transition-transform duration-700 preserve-3d rotate-card group-hover:rotate-y-180">

                                {/* Front Side */}
                                <div
                                    className="absolute w-full h-full backface-hidden shadow-lg bg-black/50"
                                    style={{
                                        backgroundImage: `url('${vision.image}')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                    }}
                                >
                                    <div className='flex flex-col h-full justify-end'>
                                        <h3 className='text-xl text-white p-4 font-semibold'>
                                            {vision.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Back Side */}
                                <div className="absolute w-full h-full backface-hidden bg-yellow-original text-white p-4 transform rotate-y-180 flex flex-col justify-start items-center">
                                    <h3 className="text-xl font-bold">{vision.title}</h3>
                                    <p className="mt-2 text-center">{vision.content}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* content */}
            <div
                className='flex justify-between items-center w-full bg-slate-200 mx-0 px-0'
            >
                <img
                    src={ourculture?.image}
                    className='w-1/2'
                />
                <div
                    className='mx-4 text-xl leading-10'
                >
                    <ReactMarkdown>{ourculture?.content}</ReactMarkdown>
                </div>
            </div>
            {/* stations */}
            <div className="py-12 bg-gray-100">
                {/* Section Heading */}
                <div className="text-center mb-8 px-4">
                    <h2 className="text-2xl sm:text-3xl text-yellow-original font-semibold border-b-2 border-yellow-original inline-block pb-2">
                        {t('ourculture.stories')}
                    </h2>
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
                            {ourculture.corestations.map((item, index) => (
                                <div key={index} className="px-4">
                                    <div className="bg-white my-12 shadow-md p-6 pt-16 relative ">
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

            {/* recive updates */}
            <ReciveUpdate />

        </>
    )
}

export default Index