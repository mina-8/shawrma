import React from 'react'
import Dropdown from '../Dropdown'
import { usePage } from '@inertiajs/react'
import { PageProps } from '@/types';
interface Props extends PageProps {
    currentRoute : string;
    slugs?: Record<string, string>
}
const ChangeLang = () => {
    const { currentRoute, slugs }: Props  = usePage<Props>().props;
    const { lang, ...restParams } = route().params;

    const createLangUrl = (targetLang: string) => {
        const newSlug = slugs?.[targetLang] || restParams.slug;

        return route(currentRoute, { ...restParams, slug: newSlug, lang: targetLang });
    };

    return (
        <Dropdown.Content>
            <Dropdown.Link href={createLangUrl('en')}>English</Dropdown.Link>
            <Dropdown.Link href={createLangUrl('ar')}>عربي</Dropdown.Link>
        </Dropdown.Content>
    )
}

export default ChangeLang
