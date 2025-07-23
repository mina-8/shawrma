
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

import React, { Suspense } from 'react';
import Sliders from './Welcome/Sliders/Sliders';
import Loading from '@/Components/Loading';



export default function Welcome({
    slides = [],
proudct=[]
}: PageProps<{  slides?: [] , proudct?:[]}>) {


    return (
        <>
            <Head title="Home" />
            
            <Sliders slides={slides} product={proudct} />

        </>
    );
}
