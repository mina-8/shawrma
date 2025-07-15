import BlogCards from '@/Components/BlogCards';
import ReciveUpdate from '@/Components/ReciveUpdate'
import { Head, Link } from '@inertiajs/react'
import { Carousel } from 'antd';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { BsBuildings } from 'react-icons/bs';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { TbUserSquareRounded } from 'react-icons/tb';
import ReactMarkdown from 'react-markdown';
interface Project {
    id: number;
    title: string;
    content: string;
    image: string;
    project_name: string;
    client_name: string;
    location: string;
    slug: string;

}
interface Props {
    project: Project;
    otherProjects: Project[];
}

const Show = ({ project, otherProjects }: Props) => {
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
            <Head title={project.title} />
            <div
                className=" bg-gray-50 flex flex-col dark:bg-gray-900 dark:text-gray-100"
            >
                {/* Top Banner */}
                <div className="w-full h-32 bg-primary-color bg-cover bg-center" />
                {/* project */}
                <div
                    className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto'
                >
                    {/* project content and title */}
                    <div
                        className='flex flex-col  gap-4 my-12'
                    >
                        <h3
                            className='text-3xl text-primary-color font-semibold'
                        >{project.title}</h3>
                        <div
                            className='leading-8 text-lg'
                        >
                            <ReactMarkdown>{project.content}</ReactMarkdown>
                        </div>
                    </div>
                    <div
                        className='flex flex-col gap-8 my-12'
                    >
                        <h3
                            className='text-xl border-b-2 pb-4 border-primary-color'
                        >{t('projects.details')}</h3>
                        <p
                            className='flex items-center gap-4 text-2xl border-2 p-4 group'
                        >
                            <BsBuildings

                                className='group-hover:animate-scaleup transition-transform duration-300 text-primary-color'
                            />
                            {t('projects.project_name')} :
                            {project.project_name}</p>
                        <p
                            className='flex items-center gap-4 text-2xl border-2 p-4 group'
                        >
                            <TbUserSquareRounded
                                className='group-hover:animate-scaleup transition-transform duration-300 text-primary-color'
                            />
                            {t('projects.project_client')} :
                            {project.client_name}</p>
                        <p
                            className='flex items-center gap-4 text-2xl border-2 p-4 group'
                        >
                            <IoLocationOutline
                                className='group-hover:animate-scaleup transition-transform duration-300 text-primary-color'
                            />
                            {t('projects.project_location')} :
                            {project.location}</p>

                        <div>
                            <img src={project.image} alt={project.title} />
                        </div>
                    </div>
                </div>
                <div
                    className='w-full max-w-7xl mx-auto my-12'
                >
                    {/* other projects */}
                    {otherProjects.length > 0 &&
                        <div className="mt-12 text-center">
                            <h2 className="text-2xl text-primary-color font-semibold  mb-6 border-b-2 border-primary-color pb-2">{t('blogcards.otherblogs')}</h2>
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
                                {otherProjects.map((item, index) => (
                                    <div key={index} className="px-2">
                                        <div
                                            key={item.id}
                                            className="bg-gray-200 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:bg-gray-900 dark:text-gray-100"
                                        >
                                            <div className="overflow-hidden">
                                                <img src={item.image} className=" hover:scale-125 hover:rotate-12 duration-500 w-full" />
                                            </div>
                                            <div className="p-4">
                                                <p className="text-gray-800 font-medium flex flex-row-reverse items-center gap-2 text-xl">
                                                    <IoLocationOutline />
                                                    {project.location}</p>
                                                <h3 className="text-xl  font-semibold mt-2 mb-2 text-end">{project.title}</h3>

                                                <div className={`flex ${i18n.language === 'ar' ? 'justify-end' : 'justify-start'} items-center gap-4 mt-12 xs:flex-col`}>
                                                    <Link href={route('news.show', { lang: i18n.language, slug: item.slug })}

                                                    >
                                                        <div className='text-xl text-white flex items-center justify-center flex-row-reverse gap-2 p-2 relative group'>
                                                            {/* Animated background circle that expands on hover */}
                                                            <div className={`rounded-full w-10 h-10 border-2 border-primary-color absolute ${i18n.language === 'ar' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 transition-all duration-300 group-hover:w-full group-hover:bg-primary-color z-0`}></div>
                                                            {/* Content above the background */}
                                                            <div className={`flex items-center justify-center ${i18n.language === 'ar' ? 'flex-row' : 'flex-row-reverse'} w-full relative z-10`}>
                                                                <div className={`flex items-center text-primary-color group-hover:text-white w-10 h-10 ${i18n.language === 'ar' ? '' : 'justify-end'}`}>
                                                                    {i18n.language === 'ar' ? <FaArrowLeft /> : <FaArrowRight />}

                                                                </div>
                                                                <div className='text-primary-color group-hover:text-white'>{t('blogcards.readmore')}</div>
                                                            </div>
                                                        </div>
                                                    </Link>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    }
                </div>
            </div>
            <ReciveUpdate />
        </>
    )
}

export default Show