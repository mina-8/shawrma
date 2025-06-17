import { Head } from '@inertiajs/react';
import React from 'react'
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import banner from '@/../../public/aboutus/our-story.jpg'
import img1 from '../../../../../public/possibility/figures-customers.svg';
import img2 from '../../../../../public/possibility/figures-employees.svg';
import img3 from '../../../../../public/possibility/figures-products.svg';
import img4 from '../../../../../public/possibility/figures-tons.svg';
import img5 from '../../../../../public/possibility/poduction-lines.svg';
import img6 from '../../../../../public/possibility/figures-projects.svg';
import CountNumber from "@/Components/CountNumber";
import ReciveUpdate from '@/Components/ReciveUpdate';
import isInLastRow from '@/Components/IsinLastRow/IsinLastRow';

interface CoreStories {
    id: number;
    title: string;
    youtube_link: string;
}

interface CoreStations {
    id: number;
    title: string;
    content: string;
    image: string;
}
interface FactsNumber {
    id: number;
    title: string;
    number: number;
    mark_number: string;
    image: string;
}
interface OurStory {
    id: number;
    title: string;
    image: string;
    banner: string;
    content: string;
    description: string;
    possibilty: FactsNumber[];
    corestations: CoreStations[];
    corestories: CoreStories[];
}

interface Props {
    ourstory: OurStory
}
const Index = ({ ourstory }: Props) => {
    const { t, i18n } = useTranslation();
    const staticPossibilty = [img1, img2, img3, img4, img5, img6 ,img6, img6, img6];

    return (
        <>
            <Head title={t('ourstory.title')} />
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
                            backgroundImage: `url('${ourstory.banner ? ourstory.banner : banner}')`,
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                    <div className='absolute w-full h-full bg-black top-0 right-0 opacity-50'></div>
                    <h2
                        className={`relative flex w-full  items-center  mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-6xl text-white font-medium`}
                    >
                        {t('ourstory.title')}
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
                        >{ourstory?.title}</h3>
                        <div
                            className='mx-12 my-12 text-lg leading-8 w-1/2'
                        >
                            <ReactMarkdown>{ourstory?.description}</ReactMarkdown>
                        </div>
                    </div>

                </div>
                {/* content */}
                <div
                    className='flex justify-between items-center w-full bg-slate-200 mx-0 px-0 dark:bg-gray-900 dark:text-gray-100'
                >
                    <img
                        src={ourstory?.image}
                        className='w-1/2'
                    />
                    <div
                        className='mx-4 text-xl leading-10'
                    >
                        <ReactMarkdown>{ourstory?.content}</ReactMarkdown>
                    </div>
                </div>
                {/* core stations */}
                {ourstory.corestations.length > 0 && (
                    <div
                        className='flex flex-col '
                    >
                        {ourstory.corestations.map((corestation) => (
                            <div
                                key={corestation.id}
                                className='bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center gap-4 py-8 px-12 '
                                style={{
                                    backgroundImage: `url('${corestation.image}')`
                                }}
                            >
                                <h3
                                    className='text-3xl font-semibold text-yellow-original border-b-4 border-yellow-original pb-4'
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
                {/* core stories */}
                {ourstory.corestories.length > 0 && (
                    <div
                        className="flex flex-col justify-center items-center w-full py-12 bg-gray-100 px-4 sm:px-6 lg:px-8"
                    >
                        {ourstory.corestories.map((corestory) => (
                            <div
                                key={corestory.id}
                                className="flex flex-col justify-center items-center w-full max-w-6xl mb-12"
                            >
                                <h3
                                    className="text-2xl sm:text-3xl font-semibold text-yellow-original border-b-4 border-yellow-original pb-4 text-center"
                                >{corestory.title}</h3>


                                <div className="w-full aspect-video mt-6">
                                    <iframe
                                        className="w-full h-full rounded-md shadow-md"
                                        src={corestory.youtube_link}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
                                        allowFullScreen
                                    ></iframe>
                                </div>

                            </div>
                        ))}
                    </div>
                )}

                {/* facts and numbers */}
                <div
                    className='flex flex-col justify-center items-center bg-gray-200 py-8 dark:bg-gray-900 dark:text-gray-100'
                >
                    <h3
                        className='text-3xl font-semibold text-yellow-original border-b-4 border-yellow-original pb-4'
                    >{t('possibilty.title')}</h3>
                    <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 my-8 w-full max-w-7xl'>
                        {ourstory.possibilty.length > 0 ? (
                            ourstory.possibilty.map((item, index) => (
                                <div key={index}
                                    className={`flex items-center p-8  border-gray-400  group relative before:absolute before:content-[''] before:top-1/2 before:-translate-y-1/2  before:right-0 before:w-[1px] before:h-1/2 before:bg-gray-400 after:absolute after:content-[''] ${isInLastRow(index , ourstory.possibilty.length , 3) ? '' : 'after:w-1/2'} after:h-[1px] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-gray-400`}
                                >

                                    <img src={item.image} alt={item.title} className='h-14 object-cover  group-hover:animate-scaleup transition-transform duration-300' />
                                    <div className='px-4'>
                                        <div className='flex gap-2 items-center'>
                                            {
                                                i18n.language === 'en' && (
                                            <span className='text-3xl font-bold text-yellow-original whitespace-nowrap'>{item.mark_number}</span>
                                            )
                                            }
                                            <CountNumber number={item.number} />


                                            {
                                                i18n.language === 'ar' && (
                                            <span className='text-3xl font-bold text-yellow-original whitespace-nowrap'>{item.mark_number}</span>
                                            )
                                            }
                                        </div>
                                        <p className='text-lg '>{item.title}</p>


                                    </div>

                                </div>
                            ))
                        ) : (
                            staticPossibilty.map((item, index) => (
                                <div key={index}
                                    className={`flex items-center p-8  border-gray-400  group relative before:absolute before:content-[''] before:top-1/2 before:-translate-y-1/2  before:right-0 before:w-[1px] before:h-1/2 before:bg-gray-400 after:absolute after:content-[''] ${isInLastRow(index , staticPossibilty.length , 3) ? '' : 'after:w-1/2'} after:h-[1px] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-gray-400`}
                                >

                                    <img src={item} alt={`Static News ${index + 1}`} className='h-14 object-cover  group-hover:animate-scaleup transition-transform duration-300' />
                                    <div className='px-4'>
                                        <div className='flex gap-2 items-center'>

                                            {
                                            i18n.language === 'en' && (
                                             <span className='lg:text-3xl text-2xl font-bold text-yellow-original  whitespace-nowrap'>{t(`possibilty.number_${index + 1}`).split('/')[1]}</span>
                                        )
                                        }
                                            <CountNumber number={parseInt(t(`possibilty.number_${index + 1}`))} />


                                            {
                                                i18n.language === 'ar' && (
                                             <span className='lg:text-3xl text-2xl font-bold text-yellow-original  whitespace-nowrap'>{t(`possibilty.number_${index + 1}`).split('/')[1]}</span>
                                            )
                                            }
                                        </div>
                                        <p className='text-lg '>{t(`possibilty.name_${index + 1}`)}</p>


                                    </div>

                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* recive updates */}
            <ReciveUpdate />
        </>
    )
}

export default Index