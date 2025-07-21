import { Head } from '@inertiajs/react';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { FaRegCalendarAlt } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

interface CoreStations {
    id: number;
    title: string;
    content: string;
    image: string;
}

interface OurStory {
    id: number;
    title: string;
    image: string;
    content: string;
    corestations: CoreStations[];

}

interface Props {
    ourstory: OurStory
}
const Index = ({ ourstory }: Props) => {
    const { t, i18n } = useTranslation();


    return (
        <>
            <Head title={t('ourstory.title')} />
            <div className="grid grid-cols-1 md:grid-cols-2 mx-auto min-h-screen">
                {/* Text Content */}
                <div className="px-12 text-xl leading-10 flex flex-col justify-center">
                    <h3 className="text-4xl font-semibold mb-4">{ourstory?.title}</h3>
                    <ReactMarkdown>{ourstory?.content}</ReactMarkdown>
                </div>

                {/* Image */}
                <div className="flex justify-center items-center">
                    <img
                        src={ourstory?.image}
                        alt={ourstory?.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* time line */}
            <div
                className='flex flex-col gap-6 w-full max-w-7xl mx-auto my-12 relative py-12'
            >
                <span
                    className='hidden md:block w-1 bg-gray-200 h-full absolute top-0 left-1/2 -translate-x-1/2 after:bottom-0 after:rounded-full after:left-1/2 after:-translate-x-1/2 after:absolute after:w-3 after:h-3 after:bg-gray-200
                    before:absolute before:rounded-full before:w-3 before:h-3 before:top-0 before:left-1/2 before:-translate-x-1/2 before:bg-gray-200
                    '
                ></span>
                {ourstory.corestations.length > 0 && (
                    ourstory.corestations.map((item, index) =>
                        <div
                            key={index}
                            className={`flex flex-col ${index % 2 ? 'md:flex-row' : 'md:flex-row-reverse'}  items-start relative gap-4`}
                        >

                            <div
                                className='w-full md:w-1/2 my-4 flex-col flex gap-6'
                            >
                                <div
                                    className={`${index % 2 ? 'text-end' : 'text-start'} text-xl text-primary-color font-bold`}
                                >{item.title}</div>
                                <img src={item.image} alt={item.title} className='object-cover  overflow-clip h-[430px]' />
                            </div>

                            <div
                            className='bg-primary-color rounded-full p-2 border-4 border-gray-200 z-10 mt-4 text-xl ml-2 mr-2'
                            >
                                <FaRegCalendarAlt className='text-gray-200'/>
                            </div>

                            {/* title */}
                            <div
                                className={`w-full md:w-1/2 h-[500px]  my-4 shadow-lg rounded-lg p-8 bg-[#f2f2f2] flex flex-col gap-6 relative after:absolute after:w-5 after:h-5 after:bg-[#f2f2f2] after:rotate-45 after:top-4 ${index % 2 ? 'border-r-2 after:-right-2.5 after:border-t-2 after:border-r-2' : 'border-l-2 after:-left-2.5 after:border-l-2 after:border-b-2 '} after:border-primary-color border-primary-color`}
                            >
                                <div
                                    className={`text-7xl font-bold text-[#e9e9e9] ${index % 2 ? 'text-start' : 'text-end'}`}
                                >{item.title}</div>
                                <div
                                    className={`text-[#7a7a7a] text-2xl ${index % 2 ? 'text-start' : 'text-end'}`}
                                ><ReactMarkdown>{item.content}</ReactMarkdown></div>

                            </div>

                        </div>
                    )
                )}
            </div>
        </>
    )
}

export default Index