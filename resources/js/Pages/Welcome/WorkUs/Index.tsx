import ReciveUpdate from "@/Components/ReciveUpdate";
import { Head, Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import banner from '@/../../public/aboutus/our-story.jpg'
import ReactMarkdown from "react-markdown";
import { IoMdCheckmark } from "react-icons/io";
interface CoreVesions {
    id: number;
    title: string;
    content: string;
    image: string;
}
interface jobads {
    id: number;
    title: string;
    content: string;
    image: string;
    slug: string;
}

interface WorkUs {
    id: number;
    title: string;
    header_title: string;
    header_content: string;
    banner: string;
    content: string;

    corevesions: CoreVesions[];
    jobads: jobads[];

}

interface Props {
    workus: WorkUs
}

const Index = ({ workus }: Props) => {
    const { t, i18n } = useTranslation()
    return (
        <>
            <Head title={workus.header_title} />
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
                            backgroundImage: `url('${workus.banner ? workus.banner : banner}')`,
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
                            {workus.header_title}
                        </h2>
                        <h3
                            className={`relative flex w-full items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-xl text-white font-medium`}
                        >
                            {workus.header_content}
                        </h3>
                    </div>

                </div>
                {/* content */}
                <div
                    className="flex flex-col justify-center items-center my-8 px-4 "
                >
                    <div
                        className='flex flex-col justify-center items-center '
                    >
                        <h3
                            className='text-3xl font-semibold text-yellow-original border-b-4 border-yellow-original pb-4'
                        >{workus?.title}</h3>
                        <div
                            className='mx-12 my-12 text-lg flex justify-center items-center w-1/2'
                        >
                            <ReactMarkdown>{workus?.content}</ReactMarkdown>
                        </div>
                    </div>

                </div>
                {/* vesions */}
                <div
                    className='flex justify-between items-center w-full bg-slate-200 mx-0 px-0 dark:bg-gray-900 dark:text-gray-100'
                >
                    {workus?.corevesions.map((item, index) =>
                        <div
                            className={`flex items-center ${index % 2 ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            <img
                                src={item?.image}
                                className='w-1/2'
                            />
                            <div
                                className='mx-4 text-xl leading-10'
                            >
                                <ReactMarkdown
                                    components={{
                                        li({ children, ...props }) {
                                            return (
                                                <li className="flex items-start gap-2" {...props}>
                                                    <IoMdCheckmark className="text-yellow-original mt-1" />
                                                    <span>{children}</span>
                                                </li>
                                            );
                                        },
                                    }}
                                >{item?.content}</ReactMarkdown>
                            </div>
                        </div>
                    )}

                </div>
                {/* stations */}
                <div
                className="my-12 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {workus.jobads.map((item)=>(
                        <Link
                        href={route('work-us.jobads.show',{lang:i18n.language , slug:item.slug})}
                        key={item.id}
                        className="flex flex-col justify-center items-center gap-4 py-12 bg-yellow-original p-4 rounded-br-3xl rounded-tl-3xl group dark:bg-gray-600 dark:text-gray-100"
                        >
                            <div
                            className="h-16 "
                            >
                                <img src={item.image} alt={item.title} className="h-full bg-cover bg-center group-hover:animate-scaleup transition-transform duration-300"/>
                            </div>
                            <div
                            className="text-white text-lg"
                            >
                                {item?.title}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <ReciveUpdate />
        </>
    )
}

export default Index