import ChangeLang from '@/Components/ChangeLang/ChangeLang';
import LangWraper from '@/Layouts/LangWraper';
import { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { AiOutlineGlobal } from 'react-icons/ai';
import Sliders from './Welcome/Sliders/Sliders';
import OurNews from './Welcome/OurNews/OurNews';
import AboutUs from './Welcome/AboutUs/AboutUs';
import Possibilty from './Welcome/Possibilty/Possibilty';

export default function Welcome({
  blogs = []
}: PageProps<{ blogs?: []}>) {

    const { t, i18n } = useTranslation();
    const { applang } = usePage().props;
    console.log(applang, i18n.language);
    return (
        <>
            <Head title="Home" />
            <Sliders slides={[]} />
        <div className=" flex min-h-screen flex-col items-center justify-start">
            <OurNews news={blogs}/>

            <AboutUs about={[]}/>

            <Possibilty possibilty={[]}/>
        </div>
        </>
    );
}
