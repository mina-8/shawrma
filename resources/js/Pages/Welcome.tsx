import ChangeLang from '@/Components/ChangeLang/ChangeLang';
import LangWraper from '@/Layouts/LangWraper';
import { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { AiOutlineGlobal } from 'react-icons/ai';
import Sliders from './Welcome/Sliders/Sliders';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };
    const { t, i18n } = useTranslation();
    const { applang } = usePage().props;
    console.log(applang, i18n.language);
    return (
            <Sliders slides={[]} />
        // <div className=" flex min-h-screen flex-col items-center justify-center">
        // </div>   
    );
}
