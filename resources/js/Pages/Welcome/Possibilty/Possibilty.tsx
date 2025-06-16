import { useTranslation } from "react-i18next";
import img1 from '../../../../../public/possibility/figures-customers.svg';
import img2 from '../../../../../public/possibility/figures-employees.svg';
import img3 from '../../../../../public/possibility/figures-products.svg';
import img4 from '../../../../../public/possibility/figures-tons.svg';
import img5 from '../../../../../public/possibility/poduction-lines.svg';
import img6 from '../../../../../public/possibility/figures-projects.svg';
import CountNumber from "@/Components/CountNumber";
import useInView from "@/Components/useInView ";
import isInLastRow from "@/Components/IsinLastRow/IsinLastRow";
interface PossiblitiItems {
    id: number;
    title: string;
    number: number;
    mark_number: string;
    image: string;
}

interface Props {
    possibilty: PossiblitiItems[];
}



const Possibilty = ({ possibilty }: Props) => {
    const { ref, isVisible } = useInView();
    const { t, i18n } = useTranslation();
    const staticPossibilty = [img1, img2, img3, img4, img5, img6, img6, img6];
    console.log(t('possibilty.number_1').split('/')[0]);
    return (
        <div

            className={`py-12 flex flex-col items-center justify-center gap-4 min-h-screen bg-gray-200 w-full dark:bg-gray-900 dark:text-gray-100 text-gray-900 `}
        >
            <div
                ref={ref}
                className={`p-4 mx-auto w-full max-w-7xl flex flex-col items-center justify-center gap-8 transition-all duration-700 ease-in-out transform ${isVisible ? 'animate-fadeup opacity-100' : 'opacity-0'
                    }`}
            >
                <h2 className='text-3xl border-b-2 border-yellow-original pb-2 mb-4 text-center'>{t('possibilty.title')}</h2>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full'>
                    {possibilty.length > 0 ? (
                        possibilty.map((item, index) => (
                            <div key={index}
                                className={`flex items-center p-8  border-gray-400  group relative before:absolute before:content-[''] before:top-1/2 before:-translate-y-1/2  before:right-0 before:w-[1px] before:h-1/2 before:bg-gray-400 ${isInLastRow(index, possibilty.length, 3) ? '' : 'after:w-1/2'} after:absolute after:content-['']   after:h-[1px] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-gray-400`}
                            >

                                <img src={item.image} alt={item.title} className='h-14 object-cover  group-hover:animate-scaleup transition-transform duration-300' />
                                <div className='px-4'>
                                    <div className='flex gap-2 items-center'>


                                        {
                                            i18n.language === 'en' && (
                                                <span className='lg:text-3xl text-2xl font-bold text-yellow-original whitespace-nowrap'>{item.mark_number}</span>
                                            )
                                        }



                                        <CountNumber number={item.number} />


                                        {
                                            i18n.language === 'ar' && (
                                                <span className='lg:text-3xl text-2xl font-bold text-yellow-original whitespace-nowrap'>{item.mark_number}</span>
                                            )
                                        }

                                    </div>
                                    <p className='text-lg '>{item.title}</p>


                                </div>

                            </div>
                        ))
                    ) : (
                        staticPossibilty.map((item, index) => (
                            <div key={index}
                                className={`flex items-center p-8  border-gray-400  group relative before:absolute before:content-[''] before:top-1/2 before:-translate-y-1/2  before:right-0 before:w-[1px] before:h-1/2 before:bg-gray-400 after:absolute after:content-[''] ${isInLastRow(index, possibilty.length, 3) ? '' : 'after:w-1/2'} after:h-[1px] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-gray-400`}
                            >

                                <img src={item} alt={`Static News ${index + 1}`} className='h-14 object-cover  group-hover:animate-scaleup transition-transform duration-300' />
                                <div className='px-4'>
                                    <div className='flex gap-2 items-center'>

                                        {
                                            i18n.language === 'en' && (
                                             <span className='lg:text-3xl text-2xl font-bold text-yellow-original  whitespace-nowrap'>{t(`possibilty.number_${index + 1}`).split('/')[1]}</span>
                                        )
                                        }


                                        <CountNumber number={parseInt(t(`possibilty.number_${index + 1}`).split('/')[0])} />



                                            {
                                                i18n.language === 'ar' && (
                                             <span className='lg:text-3xl text-2xl font-bold text-yellow-original  whitespace-nowrap'>{t(`possibilty.number_${index + 1}`).split('/')[1]}</span>
                                            )
                                            }
                                    </div>
                                    <p className='text-lg '>{t(`possibilty.name_${index + 1}`)}</p>


                                </div>

                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Possibilty