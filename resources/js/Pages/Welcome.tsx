
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

import React, { Suspense } from 'react';


const OurNews = React.lazy(() => import('./Welcome/OurNews/OurNews'))
const Possibilty = React.lazy(() => import('./Welcome/Possibilty/Possibilty'));
const Sliders = React.lazy(() => import('./Welcome/Sliders/Sliders'));
const OurMainPlairs = React.lazy(() => import('./Welcome/OurMainPlairs/OurMainPlairs'));
const Sustainability = React.lazy(() => import('./Welcome/Sustainability/Sustainability'));
const ReciveUpdate = React.lazy(() => import('@/Components/ReciveUpdate'));
const OurImapct = React.lazy(() => import('./Welcome/OurImpact/OurImapct'));
const BuildingBest = React.lazy(() => import('./Welcome/BuildingBest/BuildingBest'));
const OurBrand = React.lazy(() => import('./Welcome/OurBrand/OurBrand'));

export default function Welcome({
    blogs = [],
    slides = [],
    factnumbers = [],
    ourimpacts = [],
    brands = [],
    ourmainplair = []
}: PageProps<{ blogs?: [], slides?: [], factnumbers?: [], ourimpacts?: [], brands?: [], ourmainplair?: [] }>) {


    return (
        <>
            <Head title="Home" />
            <Suspense fallback={
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-500"></div>
                </div>}>
                <Sliders slides={slides} />
                <div className=" flex min-h-screen flex-col items-center justify-start dark:bg-gray-900 dark:text-gray-100 text-gray-900 bg-white ">
                    <OurNews news={blogs} />


                    <OurMainPlairs about={ourmainplair} />

                    <Possibilty possibilty={factnumbers} />

                    <Sustainability />

                    <BuildingBest />

                    <OurImapct ourimpact={ourimpacts} />

                    <OurBrand brands={brands} />

                </div>
                <ReciveUpdate />
            </Suspense>
        </>
    );
}
