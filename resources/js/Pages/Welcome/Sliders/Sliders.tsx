import React from 'react'
import { Carousel } from 'antd'
import { useTranslation } from 'react-i18next'
import ApplicationLogo from '@/Components/ApplicationLogo'
import { MdFacebook } from 'react-icons/md'
import { IoLogoInstagram } from 'react-icons/io5'
import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'
import Footer from '@/Layouts/Footer'

interface Slides {
    id: number
    title: string
    content: string
    image: string
    price: boolean | string
}
interface Props {
    slides: Slides[]
    product: Slides[]
}

export default function Sliders({ slides, product }: Props) {
    const { t } = useTranslation()

    // ✅ Custom carousel settings to show 3 slides
    const carouselSettings: any = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 },
            },
        ],
    }

    return (
        <>
            <section className="mx-auto w-full max-w-7xl px-4 py-8">
                {/* ✅ Carousel Section */}
                {slides.length > 0 && (
                    <Carousel {...carouselSettings} className="mb-10">
                        {slides.map((slide) => (
                            <div
                                key={slide.id}
                                className="relative p-2 h-[300px] md:h-[400px] lg:h-[450px]"
                            >
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            </div>
                        ))}
                    </Carousel>
                )}

                {/* ✅ Section title */}
                <section className="bg-primary-color text-white p-4 flex justify-center items-center rounded-lg my-6 text-3xl font-bold">
                    استكشف القائمة
                </section>

                {/* ✅ Product Grid Section */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                    {product.length > 0 ? (
                        product.map((item, index) => (
                            <div
                                key={index}
                                className={`relative ${(index + 1) % 18 === 0 ? 'lg:col-span-2' : ''}`}
                            >
                                {/* ✅ Image on top */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-40 object-cover relative right-1/2 translate-x-1/2 top-10"
                                />

                                {/* ✅ Card content */}
                                <div className="p-6 flex flex-col items-center text-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 pt-12">
                                    <h3 className="text-xl font-semibold text-primary-color">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 mt-2">{item.content}</p>

                                    {/* ✅ Price */}
                                    <p className="mt-4 bg-primary-color text-white px-6 py-2 rounded-full w-full">
                                        {item.price}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">
                            {t('No products available')}
                        </p>
                    )}
                </section>
            </section>
            {/* footer */}
            <Footer />
        </>
    )
}
