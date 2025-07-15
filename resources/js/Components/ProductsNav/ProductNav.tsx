import React, { useEffect, useState } from 'react'
import NavLink from '../NavLink'
import { useTranslation } from 'react-i18next'
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';


interface MainProducts {
    id: number;
    title: string;
    slug: string;
}
export interface SolveBrand {
    id: number;
    title: string;
    slug: string;
    mainproducts: MainProducts[];
}
interface CustomPageProps extends PageProps {
    solvebrands: SolveBrand[];
    mainproducts: MainProducts[];
}

const ProductNav = () => {
    const { t, i18n } = useTranslation();
    const { solvebrands, mainproducts: unassignedProducts } = usePage<CustomPageProps>().props;



    return (
        <div

            className={`flex gap-2 px-2 justify-around whitespace-nowrap`}
        >
            <div className='flex flex-col w-60 '>
                {/* header title */}
                <NavLink
                    className='!text-black justify-center pb-1 pt-0 border-b-2 border-primary-color hover:!bg-primary-color  flex'
                    href={route('mainproduct', { lang: i18n.language })}
                    active={route().current('mainproduct')}
                >
                    {t('mainproduct.title')}

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
                {unassignedProducts.length > 0 &&
                    unassignedProducts.map((item) => (
                        item.title?.trim() || item.slug?.trim() ? (
                            <NavLink
                                key={item.id}
                                className='!text-black justify-center  hover:!bg-primary-color !pt-2 !pb-2 mt-2'
                                href={route('mainproduct.show', { lang: i18n.language, slug: item.slug })}
                                active={route().current('mainproduct.show')}
                            >
                                {item.title}
                            </NavLink>
                        ) : (<></>)
                    ))
                }
            </div>

            <div className='flex flex-row gap-4 '>
                {solvebrands.map((brand) => (
                    <div
                    className='flex flex-col'
                    key={brand.id}
                    >
                        <NavLink
                            key={brand.id}
                            className='!text-black justify-center pb-1 pt-0 border-b-2 border-primary-color hover:!bg-primary-color '
                            href={route('solve-brand', { lang: i18n.language  , slug:brand.slug})}
                            active={route().current('mainproduct')}
                        >
                            {brand.title}

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

                        {brand.mainproducts.length > 0 &&
                            brand.mainproducts.map(product => (
                                product.title?.trim() || product.slug?.trim() ? (
                                    <NavLink
                                        key={product.id}
                                        className='!text-black justify-center hover:!bg-primary-color !pt-2 !pb-2 mt-2'
                                        href={route('mainproduct.show', {
                                            lang: i18n.language,
                                            slug: product.slug
                                        })}
                                        active={route().current('mainproduct.show')}
                                    >
                                        {product.title}
                                    </NavLink>
                                ) : null
                            ))
                        }

                    </div>
                ))}

            </div>

            {/* products custom-design */}

            <div className='flex flex-col w-60'>
                {/* header title */}
                <NavLink
                    className='!text-black justify-center pb-1 pt-0 border-b-2 border-primary-color hover:!bg-primary-color '
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
                    className='!text-black justify-center hover:!bg-primary-color !pt-2 !pb-2 mt-2 '
                    href={route('product-search', { lang: i18n.language })}
                    active={route().current('product-search')}
                >
                    {t('products.products-search')}
                </NavLink>
                <NavLink
                    className='!text-black justify-center hover:!bg-primary-color !pt-2 !pb-2 mt-2 '
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