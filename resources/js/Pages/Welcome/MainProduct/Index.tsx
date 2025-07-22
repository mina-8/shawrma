

import { Head, Link, router } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import themecard from '@/../../public/theme_card.svg'
import { FaCartShopping } from 'react-icons/fa6';
import ContentRenderer from '@/Components/ContentRenderer';

interface MainProduct {
    id: number;
    title: string;
    link: string;
    image: string;
    content: string;


}

interface Props {
    mainproduct: MainProduct[];

}
const Index = ({ mainproduct }: Props) => {

    const { t, i18n } = useTranslation();

    return (
        <>
            <Head title={t('mainproduct.title')} />
            <section
                className="grid grid-cols-1 md:grid-cols-2 items-center"
            >
                {
                    mainproduct.length > 0 && (
                        mainproduct.map((item, index) =>
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
                                            {item.link && (
                                                    <div
                                                    className='w-1/4'
                                                    >
                                                    <a
                                                    target='_blank'
                                                        href={item.link}
                                                        className="bg-primary-color px-4 py-2 rounded-lg shadow-lg text-white hover:shadow-md flex justify-start items-center gap-2 transition"
                                                    >
                                                        <FaCartShopping className="text-white" />
                                                        <span>

                                                        {t('mainproduct.purchase')}
                                                        </span>
                                                    </a>
                                                    </div>
                                                )}


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

                                                {item.link && (
                                                    <div
                                                    className='w-1/4'
                                                    >
                                                    <a
                                                    target='_blank'
                                                        href={item.link}
                                                        className="bg-primary-color px-4 py-2 rounded-lg shadow-lg text-white hover:shadow-md flex justify-start items-center gap-2 transition"
                                                    >
                                                        <FaCartShopping className="text-white" />
                                                        <span>

                                                        {t('mainproduct.purchase')}
                                                        </span>
                                                    </a>
                                                    </div>
                                                )}



                                        </div>

                                    </>
                                )}
                            </React.Fragment>
                        )
                    )
                }
            </section>
        </>
    )
}

export default Index