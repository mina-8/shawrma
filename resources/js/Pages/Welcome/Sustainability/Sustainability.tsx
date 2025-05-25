import React from 'react'
import sustainbilityImage from '@/../../public/sustainbility/sustainbility.jpg'
import { Link } from '@inertiajs/react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import useInView from '@/Components/useInView '
const Sustainability = () => {
    const { t, i18n } = useTranslation();
    const { ref, isVisible } = useInView();
    return (
        <div
            className='flex flex-col justify-center items-center py-12 w-full h-[500px] gap-12 bg-fixed bg-center'
            style={{
                backgroundImage: `url('${sustainbilityImage}')`,
                // backgroundPosition:'center',
                backgroundRepeat:'no-repeat'
            }}
        >
            <h3
                className='text-white text-4xl font-semibold'
            >
                {t('Sustainability.title')}
            </h3>
            <div
            ref={ref}
                className={`flex flex-col justify-center items-center gap-8 transition-all duration-700 ease-in-out transform ${isVisible ? 'animate-fadeup opacity-100' : 'opacity-0'}`}
            >
                <p
                    className='text-2xl text-white'
                >{t('Sustainability.content')}</p>
                <p
                    className='text-2xl text-white w-3/4 text-center'
                >
                    {t('Sustainability.description')}
                </p>

                <Link href={route(`welcome`, { lang: i18n.language })}

                    style={{
                        animationDuration: "1s",
                        animationDelay: "1.5s"
                    }}
                >
                    <div className='text-xl text-white flex items-center justify-center flex-row-reverse gap-2 p-2 relative group'>
                        {/* Animated background circle that expands on hover */}
                        <div className={`rounded-full w-10 h-10 border-2 border-white absolute ${i18n.language === 'ar' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 transition-all duration-300 group-hover:w-full group-hover:bg-yellow-original z-0`}></div>
                        {/* Content above the background */}
                        <div className={`flex items-center justify-center flex-row-reverse  w-full relative z-10`}>
                            <div className={`flex items-center w-10 h-10 justify-end `}>
                                {i18n.language === 'ar' ? <FaArrowLeft /> : <FaArrowRight />}

                            </div>
                            <div className='ml-2 text-xl'>{t('Sustainability.readmore')}</div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Sustainability