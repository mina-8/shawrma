import ContentRenderer from '@/Components/ContentRenderer';
import { Head, Link } from '@inertiajs/react';
import React from 'react'
import { useTranslation } from 'react-i18next';

interface CoreStations {
    id: number;
    title: string;
    content: string;
    image: string;
}

export interface HowMake {
    id: number;
    title: string;
    content: string;
    image: string;
    corestations: CoreStations[];
}

export interface Props {
    howmake: HowMake;
}

const Index = ({ howmake }: Props) => {
    const { t, i18n } = useTranslation();

    return (
        <>
            <Head title={t('ourblog.title')} />
            <section className="grid grid-cols-1 md:grid-cols-2  mx-auto min-h-screen">
                {/* Text Content */}
                <div className="px-12 text-xl leading-10 flex flex-col justify-center bg-gray-200">
                    <h3 className="text-4xl font-semibold mb-4">{howmake?.title}</h3>
                    <div>

                        <ContentRenderer content={howmake.content} />
                    </div>


                </div>

                {/* Image */}
                <div className="flex justify-center items-center">
                    <img
                        src={howmake?.image}
                        alt={howmake?.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* news */}
            <section
                className="grid grid-cols-1 md:grid-cols-2 items-center"
            >
                {howmake.corestations.length > 0 && (
                    howmake.corestations.map((item, index) =>
                        <React.Fragment key={item.id || index}>
                            {index % 2 ? (
                                <>

                                    {/* النص */}
                                    <div className="mx-4 md:mx-8 text-lg md:text-xl leading-relaxed py-6 md:py-0 flex flex-col gap-6">
                                        <div
                                            className='text-4xl font-bold'
                                        >{item.title}</div>
                                        <div>

                                            <ContentRenderer content={item.content} />
                                        </div>


                                    </div>

                                    {/* الصورة */}
                                    <div className="h-64 md:h-full">
                                        <img
                                            src={item?.image}
                                            alt="About Us"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                </>
                            ) : (
                                <>

                                    {/* الصورة */}
                                    <div className="h-64 md:h-full">
                                        <img
                                            src={item?.image}
                                            alt="About Us"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* النص */}
                                    <div className="mx-4 md:mx-8 text-lg md:text-xl leading-relaxed py-6 md:py-0 flex flex-col gap-6">
                                        <div
                                            className='text-4xl font-bold'
                                        >{item.title}</div>
                                        <div>

                                            <ContentRenderer content={item.content} />
                                        </div>


                                    </div>

                                </>
                            )}
                        </React.Fragment>
                    )
                )}

            </section>


        </>
    )
}

export default Index