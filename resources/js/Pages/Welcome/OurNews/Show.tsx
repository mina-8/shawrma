
import ContentRenderer from "@/Components/ContentRenderer";
import { Head } from "@inertiajs/react";

import { useTranslation } from "react-i18next";

import ReactMarkdown from "react-markdown";

interface Blog {
    id: number;
    title: string;
    content: string;
    image: string;

    youtube_link: string;
    slug: string;
}

interface Props {
    blog: Blog;
}

const Show = ({ blog }: Props) => {

    const { t, i18n } = useTranslation()

    return (
        <>
            <Head title={blog.title} />
            <section className="grid grid-cols-1 md:grid-cols-2  mx-auto min-h-screen">


                {/* Image */}
                <div className="flex justify-center items-center">
                    <img
                        src={blog?.image}
                        alt={blog?.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Text Content */}
                <div className="px-12 text-xl leading-10 flex flex-col justify-center bg-gray-200">
                    <h3 className="text-4xl font-semibold mb-4">{blog?.title}</h3>
                    <ContentRenderer content={blog.content} />

                </div>
            </section>
        </>
    );
};

export default Show;
