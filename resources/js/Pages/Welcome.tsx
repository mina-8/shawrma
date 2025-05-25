import ChangeLang from '@/Components/ChangeLang/ChangeLang';
import LangWraper from '@/Layouts/LangWraper';
import { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { AiOutlineGlobal } from 'react-icons/ai';

import OurNews from './Welcome/OurNews/OurNews';

import Possibilty from './Welcome/Possibilty/Possibilty';
import Sliders from './Welcome/Sliders/Sliders';
import OurMainPlairs from './Welcome/OurMainPlairs/OurMainPlairs';
import Sustainability from './Welcome/Sustainability/Sustainability';
import ReciveUpdate from '@/Components/ReciveUpdate';
import OurImapct from './Welcome/OurImpact/OurImapct';
import BuildingBest from './Welcome/BuildingBest/BuildingBest';

export default function Welcome({
  blogs = [],
  slides = [],
  factnumbers = [],
  ourimpacts = []
}: PageProps<{ blogs?: [] , slides?:[] , factnumbers?:[] , ourimpacts?:[]}>) {

    const { t, i18n } = useTranslation();
    const { applang } = usePage().props;
    console.log(applang, i18n.language);
    return (
        <>
            <Head title="Home" />
            <Sliders slides={slides} />
        <div className=" flex min-h-screen flex-col items-center justify-start">
            <OurNews news={blogs}/>

            <OurMainPlairs about={[]}/>

            <Possibilty possibilty={factnumbers}/>

            <Sustainability/>

            <BuildingBest/>

            <OurImapct ourimpact={ourimpacts} />

        </div>
            <ReciveUpdate/>
        </>
    );
}
