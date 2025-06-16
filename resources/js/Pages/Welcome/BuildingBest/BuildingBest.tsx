import React from 'react'
import { useTranslation } from 'react-i18next'
import buildingbest from '@/../../public/aboutus/buildingbest.svg'
import useInView from '@/Components/useInView '
const BuildingBest = () => {
    const {t , i18n} = useTranslation();
    const { ref, isVisible } = useInView();
    return (
        <div className='flex justify-center items-center flex-col w-full  bg-gray-100 dark:bg-gray-900 dark:text-gray-100'>
            {/* <h2
            ref={ref}
                className={`text-3xl border-b-2 border-yellow-original pb-2 mb-4 text-center transition-all duration-700 ease-in-out transform ${isVisible ? 'animate-fadeup opacity-100' : 'opacity-0'}`}
            >{t('buildingbest.title')}</h2> */}

            <div
            ref={ref}
            className={`transition-all duration-700 ease-in-out transform ${isVisible ? 'animate-fadeup opacity-100' : 'opacity-0'} w-full`}
            >
                <img src={buildingbest} alt={t('buildingbest.title')} className='w-full' />
            </div>
        </div>
    )
}

export default BuildingBest