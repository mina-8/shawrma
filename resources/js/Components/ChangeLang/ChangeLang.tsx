import React from 'react'
import Dropdown from '../Dropdown'
import { Link, usePage } from '@inertiajs/react';

const ChangeLang = () => {
    const { currentRoute }: string | any = usePage().props;
    const { lang, ...params } = route().params; // احذف lang الحالي
    return (

        <Dropdown.Content>
            <Dropdown.Link href={route(currentRoute, { ...params, lang: 'en' })}>English</Dropdown.Link>
            <Dropdown.Link href={route(currentRoute, { ...params, lang: 'ar' })}>عربي</Dropdown.Link>
        </Dropdown.Content>
    )
}

export default ChangeLang