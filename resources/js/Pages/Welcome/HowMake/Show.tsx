import { Head, Link } from '@inertiajs/react';
import React from 'react'
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
interface CoreStations {
    id: number;
    title: string;
    content: string;
    image: string;
}

export interface ProductInfo {
    id: number;
    nav_title: string;
    title: string;
    content: string;
    image: string;
    corestations: CoreStations[];
}

export interface Props {
    proinfo: ProductInfo;
}

const Show = ({ proinfo }: Props) => {
    const { t, i18n } = useTranslation();

    return (
        <>
            <Head title={proinfo.nav_title} />
            <section
                className='w-full min-h-screen bg-center bg-cover p-8 flex relative'
                style={{ backgroundImage: `url('${proinfo.image}')` }}
            >
                 <div className='absolute w-full h-full bg-black top-0 right-0 opacity-50'></div>
                <div
                className='mx-auto w-full max-w-7xl flex justify-center  flex-col gap-8 relative'
                >

                <h3 className="text-7xl font-semibold mb-4 text-white">{proinfo?.title}</h3>
                <div className=" text-2xl font-bold leading-10 flex flex-col justify-center text-white">
                    <ReactMarkdown>{proinfo?.content}</ReactMarkdown>

                </div>
                </div>

            </section>
            {/* news */}
            <section
                className="grid grid-cols-1 md:grid-cols-2 items-center"
            >
                {proinfo.corestations.length > 0 && (
                    proinfo.corestations.map((item, index) =>
                        <React.Fragment key={item.id || index}>
                            {index % 2 ? (
                                <>

                                    {/* النص */}
                                    <div className="mx-4 md:mx-8 text-lg md:text-xl leading-relaxed py-6 md:py-0 flex flex-col gap-6">
                                        <div
                                            className='text-4xl font-bold'
                                        >{item.title}</div>
                                        <ReactMarkdown>{item?.content}</ReactMarkdown>

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
                                        <ReactMarkdown>{item?.content}</ReactMarkdown>

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

export default Show