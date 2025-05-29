import React from 'react'
import NavLink from '../NavLink'
import { useTranslation } from 'react-i18next'
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
interface Brands{
    id:number;
    header_title :string;
    slug:string;
}
interface CustomBrand extends PageProps {
  Brands: Brands[];
}
const BrandNav = () => {
    const {t , i18n} = useTranslation();
    const {Brands} = usePage<CustomBrand>().props
    return (
        <div className='flex flex-col whitespace-nowrap px-2'>

            {Brands.map((item, index) => (
                <NavLink
                    className='!text-yellow-original hover:!text-white hover:!bg-yellow-original !pt-2 !pb-2 mt-2 border-b w-40 last:border-b-0'
                    key={index}
                    href={route('brand-show', { lang: i18n.language , slug:item.slug })}
                    active={route().current('brand-show')}
                >
                    {item.header_title}
                </NavLink>
            ))}

        </div>
    )
}

export default BrandNav