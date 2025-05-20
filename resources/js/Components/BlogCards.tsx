import { Link } from "@inertiajs/react"
import { useTranslation } from "react-i18next"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import img4 from '@/../../public/ournews/live-uni.jpg'
const BlogCards = ({ item }: any) => {
    const { t, i18n } = useTranslation()
    return (
        <div
            key={item}
            className="bg-gray-200 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
            <div className="overflow-hidden">
                <img src={img4} className=" hover:scale-125 hover:rotate-12 duration-500" />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-medium text-sky-500 mb-2">
                    Blog Title {item}
                </h3>
                <div className={`flex ${i18n.language === 'ar' ? 'justify-end' : 'justify-start'} items-center gap-4 mt-12 xs:flex-col`}>
                    <Link href={route('welcome', { lang: i18n.language })}

                    >
                        <div className='text-xl text-white flex items-center justify-center flex-row-reverse gap-2 p-2 relative group'>
                            {/* Animated background circle that expands on hover */}
                            <div className={`rounded-full w-10 h-10 border-2 border-white absolute ${i18n.language === 'ar' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 transition-all duration-300 group-hover:w-full group-hover:bg-sky-500 z-0`}></div>
                            {/* Content above the background */}
                            <div className={`flex items-center justify-center ${i18n.language === 'ar' ? 'flex-row' : 'flex-row-reverse'} w-full relative z-10`}>
                                <div className={`flex items-center w-10 h-10 ${i18n.language === 'ar' ? '' : 'justify-end'}`}>
                                    {i18n.language === 'ar' ? <FaArrowLeft /> : <FaArrowRight />}

                                </div>
                                <div>{t('blogcards.readmore')}</div>
                            </div>
                        </div>
                    </Link>

                </div>

            </div>
        </div>
    )
}

export default BlogCards