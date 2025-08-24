
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

import React, { Suspense } from 'react';
import Sliders from './Welcome/Sliders/Sliders';
import Loading from '@/Components/Loading';
import { useTranslation } from 'react-i18next';
import TextSahwrma from '@/Components/TextSahwrma';



export default function Welcome({
    slides = [],
proudct=[]
}: PageProps<{  slides?: [] , proudct?:[]}>) {

const {t} = useTranslation()
    return (
        <>
            <Head title={t('home.home')} />

            <TextSahwrma />

            <Sliders slides={slides} product={proudct} />

        </>
    );
}
