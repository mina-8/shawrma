import { Link } from '@inertiajs/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
interface Brand {
    id: number;
    header_title:string;
    image: string;

    slug: string;
}
interface Props {
    brands: Brand[];
}
const OurBrand = ({ brands }: Props) => {
    const { t, i18n } = useTranslation()
    return (
        <div className="w-full max-w-7xl mx-auto my-8 px-4">
            <div className="flex flex-col justify-center items-center">
                <h3 className="text-3xl font-semibold border-b-4 border-primary-color pb-4">
                    {t('home.brands')}
                </h3>

                <div className="flex flex-col lg:flex-row gap-6 mt-8">
                    {brands?.map((item) => (
                        <Link
                            href={route('brand-show', { lang: i18n.language, slug: item.slug })}
                            key={item.id} className="flex flex-col items-center">
                            <img
                                src={item.image}
                                alt={item.header_title}
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
    )
}

export default OurBrand