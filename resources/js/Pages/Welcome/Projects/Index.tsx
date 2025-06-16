import { Head, Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import banner from '@/../../public/aboutus/our-story.jpg'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import ReciveUpdate from "@/Components/ReciveUpdate";
import { useState } from "react";
import axios from "axios";
interface Locations {
    id: number;
    location: string;
}
interface Projects {
    id: number;
    title: string;
    content: string;
    image: string;
    project_name: string;
    client_name: string;
    location: string;
    slug: string;

}
interface Props {
    projects: Projects[];
    projectLoactions: Locations[];
}
const Index = ({ projects, projectLoactions }: Props) => {
    const [Projects, setProjects] = useState<Projects[]>(projects);
    const { t, i18n } = useTranslation();
    const HandelFilter = async (location: number) => {
        const response = await axios.get(route('projects-filter', { lang: i18n.language, location:location }));

        if (response.status === 200) {
            const data = await response.data;
            setProjects(data.projects);
        } else {
            console.error('Failed to fetch projects');
        }
    }

    return (
        <>
            <Head title={t('projects.title')} />
            <div
                className="bg-gray-50 flex flex-col dark:bg-gray-900 dark:text-gray-100"
            >
                {/* top banner */}
                <div
                    className="w-full h-[500px] flex relative overflow-hidden"
                >
                    <div
                        className="w-full h-full bg-cover  absolute"
                        style={{
                            backgroundImage: `url('${banner}')`,
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                    <div className='absolute w-full h-full bg-black top-0 right-0 opacity-50'></div>
                    <h2
                        className={`relative flex w-full  items-center  mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-6xl text-white font-medium`}
                    >
                        {t('projects.title')}
                    </h2>
                </div>
                {/* locations */}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    <div className="flex justify-center items-center gap-4">
                        <Link
                        href={route('projects' , {lang:i18n.language})}
                            className="text-lg font-semibold cursor-pointer text-white hover:shadow-none transition-colors bg-yellow-original p-4 shadow-md"
                        >{t('projects.all')}</Link>
                        {projectLoactions.map((location) => (
                            <div key={location.id}
                            onClick={() => HandelFilter(location.id)}
                                className="text-lg font-semibold cursor-pointer text-white hover:shadow-none transition-colors bg-yellow-original p-4 shadow-md"
                            >
                                {location.location}
                            </div>
                        ))}
                    </div>
                </div>

                {/* projects */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 dark:bg-gray-900 dark:text-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Projects?.map((project) => (
                            <div key={project.id} className="bg-white shadow-md  overflow-hidden">
                                <div
                                    className="h-96 overflow-hidden group "
                                >

                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-12 duration-500" />
                                </div>
                                <div className="p-4 bg-slate-200 dark:bg-gray-900 dark:text-gray-100">
                                    <p className="text-gray-800 font-medium flex items-center gap-2 text-xl">
                                        <IoLocationOutline />
                                        {project.location}</p>
                                    <h3 className="text-xl font-semibold mt-2 mb-2">{project.title}</h3>
                                    <div
                                        className="flex justify-start items-center mt-12"
                                    >

                                        <Link href={route(`projects.show`, { lang: i18n.language, slug: project.slug })}

                                            style={{
                                                animationDuration: "1s",
                                                animationDelay: "1.5s"
                                            }}
                                        >
                                            <div className='text-xl text-yellow-original flex items-center justify-center flex-row-reverse gap-2 p-2 relative group'>
                                                {/* Animated background circle that expands on hover */}
                                                <div className={`rounded-full w-10 h-10 border-2 border-yellow-original absolute ${i18n.language === 'ar' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 transition-all duration-300 group-hover:w-full group-hover:bg-yellow-original z-0`}></div>
                                                {/* Content above the background */}
                                                <div className={`flex items-center justify-center flex-row-reverse  w-full relative z-10`}>
                                                    <div className={`flex items-center w-10 h-10 justify-end group-hover:text-white`}>
                                                        {i18n.language === 'ar' ? <FaArrowLeft /> : <FaArrowRight />}

                                                    </div>
                                                    <div className='ml-2 text-xl group-hover:text-white'>{t('Sustainability.readmore')}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <ReciveUpdate/>
        </>
    )
}

export default Index