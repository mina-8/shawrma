import React from 'react'
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
    const mainproducts = usePage<CustomPageProps>().props.mainproducts;
    return (
        <div
            className='flex gap-2 px-2 whitespace-nowrap'
        >
            {mainproducts.length > 0 && (
                mainproducts.map((mainproduct) => (
                    <div className='flex flex-col' key={mainproduct.id}>
                        {/* header title */}
                        <NavLink
                            className='!text-sky-500 pb-0 pt-0 border-b-2 border-sky-500 hover:!bg-sky-500 hover:!text-white'
                            href={route('mainproduct.show', { lang: i18n.language , slug:mainproduct.slug })}
                            active={route().current('mainproduct.show')}
                        >
                            {mainproduct.title}
                        </NavLink>
                        {/* products */}
                        {mainproduct.products.length > 0 && (
                            mainproduct.products.map((product) => (
                                product.title?.trim() || product.slug?.trim() ? (
                                    <NavLink
                                        key={product.id}
                                        className='!text-sky-500 hover:!text-white hover:!bg-sky-500 !pt-2 !pb-2 mt-2'
                                        href={route('product.show', { lang: i18n.language , slug:product.slug })}
                                        active={route().current('product.show')}
                                    >
                                        {product.title}
                                    </NavLink>
                                ) : (<></>)
                            ))
                        )}


                    </div>
                ))
            )}

            {/* products custom-design */}
            <div className='flex flex-col'>
                {/* header title */}
                <NavLink
                    className='!text-sky-500 pb-0 pt-0 border-b-2 border-sky-500 hover:!bg-sky-500 hover:!text-white flex justify-center'
                    href={route('products', { lang: i18n.language })}
                    active={route().current('products')}
                >
                    {t('products.custom-design')}
                </NavLink>
                {/* products */}
                <NavLink
                    className='!text-sky-500 hover:!text-white hover:!bg-sky-500 !pt-2 !pb-2 mt-2'
                    href={route('products', { lang: i18n.language })}
                    active={route().current('products')}
                >
                    {t('products.page-design')}
                </NavLink>
            </div>
        </div>
    )
}

export default ProductNav