
import { Head, Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { IoMdCheckmark } from "react-icons/io";
import React from "react";
import ContentRenderer from "@/Components/ContentRenderer";
interface CoreVesions {
    id: number;
    title: string;
    content: string;
    image: string;
}


interface WorkUs {
    id: number;
    title: string;
    content: string;
    image: string;
    content_title: string;
    footer_content: string;
    corevesions: CoreVesions[];

}

interface Props {
    workus: WorkUs
}

const Index = ({ workus }: Props) => {
    const { t, i18n } = useTranslation()
    return (
        <>
            <Head title={workus.title} />
            <section className="grid grid-cols-1 md:grid-cols-2  mx-auto min-h-screen">
                {/* Text Content */}
                <div className="px-12 text-xl leading-10 flex flex-col justify-center bg-gray-200">
                    <h3 className="text-4xl font-semibold mb-4">{workus?.title}</h3>
                    <div>

                        <ContentRenderer content={workus.content} />
                    </div>
                </div>

                {/* Image */}
                <div className="flex justify-center items-center">
                    <img
                        src={workus?.image}
                        alt={workus?.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* contet title */}
            <section>
                <div
                    className="flex justify-center items-center my-8 mx-auto "
                >
                    <p
                        className="font-bold text-7xl"
                    >

                        {workus.content_title}
                    </p>
                </div>
            </section>

            {/* core vesion */}
            <section
                className="grid grid-cols-1 md:grid-cols-2 items-center"
            >
                {workus.corevesions.length > 0 && (
                    workus.corevesions.map((item, index) =>
                        <React.Fragment key={item.id || index}>
                            {index % 2 ? (
                                <>

                                    {/* النص */}
                                    <div className="mx-4 md:mx-8 text-lg md:text-xl leading-relaxed py-6 md:py-0 flex flex-col gap-6">
                                        <div
                                            className='text-4xl font-bold'
                                        >{item.title}</div>
                                        <div>

                                            <ContentRenderer content={item.content} />
                                        </div>
                                    </div>

                                    {/* الصورة */}
                                    <div className="h-64 md:h-full">
                                        <img
                                            src={item?.image}
                                            alt="About Us"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                </>
                            ) : (
                                <>

                                    {/* الصورة */}
                                    <div className="h-64 md:h-full">
                                        <img
                                            src={item?.image}
                                            alt="About Us"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* النص */}
                                    <div className="mx-4 md:mx-8 text-lg md:text-xl leading-relaxed py-6 md:py-0 flex flex-col gap-6">
                                        <div
                                            className='text-4xl font-bold'
                                        >{item.title}</div>
                                        <div>

                                            <ContentRenderer content={item.content} />
                                        </div>

                                    </div>

                                </>
                            )}
                        </React.Fragment>
                    )
                )}
            </section>

            {/* footer */}
            <section
                className="mx-auto w-full max-w-7xl flex justify-center items-center my-8 flex-col gap-4"
            >
                <div>

                    <ContentRenderer content={workus.footer_content} />
                </div>
            </section>

        </>
    )
}

export default Index