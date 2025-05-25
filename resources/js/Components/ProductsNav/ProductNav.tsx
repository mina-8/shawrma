import React, { useEffect, useState } from 'react'
import NavLink from '../NavLink'
import { useTranslation } from 'react-i18next'
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Products {
    id: number;
    title: string;
    slug: string;
}
interface MainProducts {
    id: number;
    title: string;
    slug: string;
    products: Products[]
}

interface CustomPageProps extends PageProps {
    mainproducts: MainProducts[];
}

const ProductNav = () => {
    const { t, i18n } = useTranslation();
    const Navmainproducts = usePage<CustomPageProps>().props.mainproducts;

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        // Cleanup on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    console.log(width)
    return (
        <div
        style={{ width: width * 0.9 }}
            className={`flex gap-2 px-2 justify-around`}
        >
            {Navmainproducts.length > 0 &&
                Navmainproducts.map((mainproduct) => (
                    <div className='flex flex-col' key={mainproduct.id}>
                        {/* header title */}
                        <NavLink
                            className='!text-sky-500 pb-1 pt-0 border-b-2 border-yellow-original hover:!bg-yellow-original hover:!text-white flex justify-center'
                            href={route('mainproduct.show', { lang: i18n.language, slug: mainproduct.slug })}
                            active={route().current('mainproduct.show')}
                        >
                            {mainproduct.title}
                            <svg
                                className="-me-0.5 ms-2 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </NavLink>
                        {/* products */}
                        {mainproduct.products.length > 0 && (
                            mainproduct.products.map((product) => (
                                product.title?.trim() || product.slug?.trim() ? (
                                    <NavLink
                                        key={product.id}
                                        className='!text-sky-500 hover:!text-white hover:!bg-yellow-original !pt-2 !pb-2 mt-2'
                                        href={route('product.show', { lang: i18n.language, slug: product.slug })}
                                        active={route().current('product.show')}
                                    >
                                        {product.title}
                                    </NavLink>
                                ) : (<></>)
                            ))
                        )}


                    </div>
                ))
            }

            {/* products custom-design */}

                <div className='flex flex-col'>
                    {/* header title */}
                    <NavLink
                        className='!text-sky-500 pb-1 pt-0 border-b-2 border-yellow-original hover:!bg-yellow-original hover:!text-white flex justify-start'
                        href={route('product-search', { lang: i18n.language })}
                        active={route().current('product-search')}
                    >
                        {t('products.ourproducts')}
                        <svg
                            className="-me-0.5 ms-2 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </NavLink>
                    {/* products */}
                    <NavLink
                        className='!text-sky-500 hover:!text-white hover:!bg-yellow-original !pt-2 !pb-2 mt-2 '
                        href={route('product-search', { lang: i18n.language })}
                        active={route().current('product-search')}
                    >
                        {t('products.products-search')}
                    </NavLink>
                    <NavLink
                        className='!text-sky-500 hover:!text-white hover:!bg-yellow-original !pt-2 !pb-2 mt-2 '
                        href={route('product-video', { lang: i18n.language })}
                        active={route().current('product-video')}
                    >
                        {t('products.products-video')}
                    </NavLink>
                </div>


        </div>
    )
}

export default ProductNav