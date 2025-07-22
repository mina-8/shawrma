import ContentRenderer from '@/Components/ContentRenderer';
import { Head, Link } from '@inertiajs/react';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { FaFilePdf, FaPhoneVolume } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';

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


interface OurDelivery {
    id: number;
    title: string;
    content: string;
    call_us: string;
    shop_link: string;
    phone: string;
    corestations: CoreStations[];
    corevesions: CoreVesions[];

}

interface Props {
    ourdelivery: OurDelivery
}
const Index = ({ ourdelivery }: Props) => {
    const { t, i18n } = useTranslation();
    console.log(ourdelivery.content)
    return (
        <>
            <Head title={t('ourdelivery.title')} />
            <section className="grid grid-cols-1 md:grid-cols-2  mx-auto h-[500px]">
                {/* Text Content */}
                <div className="px-12 text-xl leading-10 flex flex-col justify-center my-12">
                    <h3 className="text-4xl font-semibold mb-4">{ourdelivery?.title}</h3>


                    <ContentRenderer content={ourdelivery.content} />

                </div>

                {/* Image */}
                <div className="flex justify-center items-center flex-col bg-gray-200 gap-8">
                    <a
                        href={`tel:${ourdelivery.phone}`}
                        className='flex flex-col justify-center items-center gap-2 '
                    >
                        <div
                            className='bg-primary-color text-4xl text-white  p-4 rounded-full'>
                            <FaPhoneVolume />
                        </div>
                        <div
                        className='text-2xl font-bold'
                        >
                            {ourdelivery.call_us}
                        </div>
                    </a>
                    <a
                    href={ourdelivery.shop_link}
                    className='flex flex-col justify-center items-center gap-2 '
                    >
                        <div
                            className='bg-primary-color text-4xl text-white  p-4 rounded-full'>
                            <FaCartShopping />
                        </div>
                        <div
                        className='text-2xl font-bold'
                        >
                            {t('ourdelivery.shop')}
                        </div>
                    </a>
                </div>
            </section>

            {/* core station */}
            {
                ourdelivery.corevesions.length > 0 && (
                    ourdelivery.corevesions.map((item, index) =>

                        <section
                            className="relative flex flex-col justify-center items-center gap-4 min-h-screen bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url('${item.image}')`,
                            }}

                        >
                            <div
                                className="
            bg-white p-6 sm:p-8 md:p-12 flex flex-col gap-4 sm:gap-6 md:gap-8
            w-[90%] sm:w-[80%] md:w-[60%] lg:w-1/2
            absolute bottom-4 sm:bottom-8 md:-bottom-10
            left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-10 lg:right-20
            shadow-lg rounded-lg
          "
                            >
                                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                                    {item.title}
                                </h3>

                                <div className="text-base sm:text-lg md:text-xl leading-relaxed md:leading-9">

                                    <ContentRenderer content={item.content} />
                                </div>
                            </div>



                        </section>
                    )
                )
            }
            {/* core station */}
            <section
                className='grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto max-w-7xl my-12'
            >
                {ourdelivery.corestations.length > 0 && (
                    ourdelivery.corestations.map((item, index) =>
                        <div
                            key={index}
                            className='flex flex-col'
                        >
                            <div>
                                <img src={item.image} alt={item.content} className='h-60' />
                            </div>
                            <div className="text-base sm:text-lg md:text-xl leading-relaxed md:leading-9">
                                {/* <div
                                    className="ql-editor"
                                    dangerouslySetInnerHTML={{ __html: item.content }}
                                /> */}
                                <ContentRenderer content={item.content} />
                            </div>

                        </div>
                    )
                )}
            </section>


        </>
    )
}

export default Index