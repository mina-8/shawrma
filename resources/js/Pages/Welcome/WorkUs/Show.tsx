import ReciveUpdate from "@/Components/ReciveUpdate";
import { Head, Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import banner from '@/../../public/aboutus/our-story.jpg'
import ReactMarkdown from "react-markdown";


interface JobAd {
    title: string;
    content: string;
    image: string;
    slug: string;
}


interface Props {
    jobad: JobAd
}

const Index = ({ jobad }: Props) => {
    const { t, i18n } = useTranslation()
    return (
        <>
            <Head title={jobad.title} />
            <div
                className='bg-gray-50 flex flex-col dark:bg-gray-900 dark:text-gray-100'
            >
                {/* top banner */}
                <div
                    className='w-full h-[500px] flex relative overflow-hidden'
                >
                    {/* banner */}
                    <div
                        className="w-full h-full bg-cover  absolute inset-0 bg-black/50"
                        style={{
                            backgroundImage: `url('${jobad.image ? jobad.image : banner}')`,
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                    <div className='absolute w-full h-full bg-black top-0 right-0 opacity-50'></div>
                    {/* title banner */}
                    <div
                        className="flex flex-col justify-center items-center gap-6 w-full max-w-7xl mx-auto"
                    >

                        <h2
                            className={`relative flex w-full items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-6xl text-white font-medium`}
                        >
                            {jobad.title}
                        </h2>

                    </div>

                </div>
                {/* content */}
                <div
                    className='w-full max-w-7xl mx-auto my-12 leading-10 text-xl'
                >

                    <ReactMarkdown>{jobad?.content}</ReactMarkdown>

                </div>


            </div>
            <ReciveUpdate />
        </>
    )
}

export default Index