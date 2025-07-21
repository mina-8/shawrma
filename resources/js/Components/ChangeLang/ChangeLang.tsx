import React from 'react'
import { Link, usePage } from '@inertiajs/react'
import { PageProps } from '@/types';
import { AiOutlineGlobal } from 'react-icons/ai';
interface Props extends PageProps {
    currentRoute?: string; // اجعلها اختيارية لأن أحيانًا ما بتكون موجودة في صفحات 404
    slugs?: Record<string, string>
}
const ChangeLang = () => {
    const { currentRoute, slugs }: Props = usePage<Props>().props;

    const params = route().params ?? {};

    const lang = params.lang ?? 'en';

    // ✅ أمان: لو currentRoute غير موجود أو غير معرف لا تعرض شيء
    if(!currentRoute || !route().has(currentRoute)){
        return null;
    }

    const resetParams = {...params};
    delete resetParams.lang;

    const createLangUrl = (targetLang: string) => {
        const newSlug = slugs?.[targetLang] || resetParams.slug;

        return route(currentRoute, { ...resetParams, slug: newSlug, lang: targetLang });
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