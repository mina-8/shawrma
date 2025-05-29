import BlogCards from "@/Components/BlogCards";
import ReciveUpdate from "@/Components/ReciveUpdate";
import { Head } from "@inertiajs/react";
import { Carousel } from "antd";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

interface Blog {
    id: number;
    title: string;
    content: string;
    image: string;
    slug: string;
}

interface Props {
    blog: Blog;
    otherblogs: Blog[];
}

const Show = ({ blog  , otherblogs}: Props) => {
    
    const { t, i18n } = useTranslation()
    const CustomArrow = ({ direction, onClick }: any) => {
        const ArrowIcon = direction === 'prev' ? FaArrowLeft : FaArrowRight;
        return (


            <div
                className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-yellow-original text-yellow-original shadow-lg cursor-pointer transition hover:bg-custom-dark-blue group"
                style={{
                    position: 'absolute',
                    top: '50%',

                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    [direction === 'prev' ? 'left' : 'right']: '-50px',
                }}
                onClick={onClick}
            >
                <ArrowIcon className="text-custom-dark-blue group-hover:text-white text-2xl" />
            </div>
        );
    };
    return (
        <>
            <Head title={blog.title} />
            <div className="flex min-h-screen flex-col items-center justify-start bg-gray-50">
                {/* Header Image */}
                <div className="w-full h-20 bg-yellow-original bg-cover bg-center" />

                {/* Blog Content */}
                <div className="max-w-7xl w-full px-4 py-8 md:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Text */}
                        <div className="p-4">
                            <h1 className="text-3xl font-bold mb-4 text-yellow-original md:text-4xl">
                                {blog.title}
                            </h1>
                            <div className="prose prose-sky max-w-none">
                                <ReactMarkdown>{blog.content}</ReactMarkdown>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="p-4">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-auto shadow-md object-cover"
                            />
                        </div>
                    </div>

                    {/* Other Blogs Carousel */}
                    {otherblogs.length > 0 &&
                    <div className="mt-12 text-center">
                        <h2 className="text-2xl text-yellow-original font-semibold  mb-6 border-b-2 border-yellow-original pb-2">{t('blogcards.otherblogs')}</h2>
                        <Carousel
                            arrows
                            dots={false}
                            slidesToShow={3}
                            slidesToScroll={1}
                            prevArrow={<CustomArrow direction="prev" />}
                            nextArrow={<CustomArrow direction="next" />}
                            responsive={[
                                {
                                    breakpoint: 1024,
                                    settings: {
                                        slidesToShow: 2,
                                        slidesToScroll: 1,
                                    },
                                },
                                {
                                    breakpoint: 768,
                                    settings: {
                                        slidesToShow: 1,
                                        slidesToScroll: 1,
                                    },
                                },
                            ]}
                        >
                            {otherblogs.map((item, index) => (
                                <div key={index} className="px-2">
                                    <BlogCards item={item} />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    }
                </div>
            </div>
            <ReciveUpdate/>
        </>
    );
};

export default Show;
