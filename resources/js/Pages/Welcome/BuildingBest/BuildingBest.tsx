import React from 'react'
import { useTranslation } from 'react-i18next'
import buildingbesten from '@/../../public/aboutus/building_en.png'
import buildingbest from '@/../../public/aboutus/building.png'
import useInView from '@/Components/useInView '
const BuildingBest = () => {
    const { t, i18n } = useTranslation();
    const { ref, isVisible } = useInView();
    return (
        <div className='flex justify-center items-center flex-col w-full  bg-gray-100 dark:bg-gray-900 dark:text-gray-100'>
            
            <div
                ref={ref}
                className={`transition-all duration-700 ease-in-out transform ${isVisible ? 'animate-fadeup opacity-100' : 'opacity-0'} w-full`}
            >
                {i18n.language === 'en' ?
                    <img src={buildingbesten} alt={t('buildingbest.title')} className='w-full' />
                    :
                    <img src={buildingbest} alt={t('buildingbest.title')} className='w-full' />
                }
            </div>
        </div>
    )
}

export default BuildingBest