import ReciveUpdate from '@/Components/ReciveUpdate';
import { Head } from '@inertiajs/react';
import React from 'react'
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

interface OurImapct {
    id: number;
    title: string;
    content: string;
    image: string;
    slug: string;
}

interface Props {
    ourimpact: OurImapct
}
const Show = ({ ourimpact }: Props) => {
    const { t, i18n } = useTranslation()
    return (
        <>
            <Head title={ourimpact.title} />
            <div
                className="bg-gray-50 flex flex-col"
            >
                {/* top banner */}
                <div
                    className="w-full h-[500px] flex relative overflow-hidden"
                >
                    <div
                        className="w-full h-full bg-cover  absolute"
                        style={{
                            backgroundImage: `url('${ourimpact.image}')`,
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                    <div className='absolute w-full h-full bg-black top-0 right-0 opacity-50'></div>
                    <h2
                        className={`relative flex w-full  items-center  mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-6xl text-white font-medium`}
                    >
                        {ourimpact.title}
                    </h2>

                </div>

            </div>
            {/* content */}
            <div
            className='mx-auto w-full max-w-7xl my-12 p-12 text-xl'
            >
                <ReactMarkdown>{ourimpact.content}</ReactMarkdown>
            </div>
            <ReciveUpdate />
        </>
    )
}

export default Show