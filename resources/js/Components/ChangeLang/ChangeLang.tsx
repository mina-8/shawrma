import React from 'react'
import { Link, usePage } from '@inertiajs/react'
import { PageProps } from '@/types';
import { AiOutlineGlobal } from 'react-icons/ai';
interface Props extends PageProps {
    currentRoute: string;
    slugs?: Record<string, string>
}
const ChangeLang = () => {
    const { currentRoute, slugs }: Props = usePage<Props>().props;
    const { lang, ...restParams } = route().params;

    const createLangUrl = (targetLang: string) => {
        const newSlug = slugs?.[targetLang] || restParams.slug;

        return route(currentRoute, { ...restParams, slug: newSlug, lang: targetLang });
    };
    return (
        <Link href={createLangUrl(lang === 'en' ? 'ar' : 'en')}
         className="flex justify-center items-center px-4 text-white "
         >
            <AiOutlineGlobal size={24} />
            {lang === 'en' ? 'عربي' : 'English'}
        </Link>
    )
}

export default ChangeLang