import { useTranslation } from "react-i18next";
import img1 from '../../../../../public/possibility/figures-customers.svg';
import img2 from '../../../../../public/possibility/figures-employees.svg';
import img3 from '../../../../../public/possibility/figures-products.svg';
import img4 from '../../../../../public/possibility/figures-tons.svg';
import img5 from '../../../../../public/possibility/poduction-lines.svg';
import img6 from '../../../../../public/possibility/figures-projects.svg';
import CountNumber from "@/Components/CountNumber";
import useInView from "@/Components/useInView ";
interface PossiblitiItems {
    id: number;
    title: string;
    number: number;
    image: string;
}

interface Props {
    possibilty: PossiblitiItems[];
}
const Possibilty = ({ possibilty }: Props) => {
const { ref, isVisible } = useInView();
    const { t, i18n } = useTranslation();
    const staticPossibilty = [img1, img2, img3, img4, img5, img6];
    return (
        <div

            className={`py-12 flex flex-col items-center justify-center gap-4 min-h-screen bg-gray-200 w-full `}
        >
            <div
            ref={ref}
            className={`p-4 mx-auto w-full max-w-7xl flex flex-col items-center justify-center gap-8 transition-all duration-700 ease-in-out transform ${isVisible ? 'animate-fadeup opacity-100' : 'opacity-0'
                                    }`}
            >
                <h2 className='text-3xl border-b-2 border-sky-500 pb-2 mb-4 text-center'>{t('possibilty.title')}</h2>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full'>
                    {possibilty.length > 0 ? (
                        possibilty.map((item, index) => (
                            <div key={index}
                                    className={`flex items-center p-8  border-gray-400  group relative before:absolute before:content-[''] before:top-1/2 before:-translate-y-1/2  before:right-0 before:w-[1px] before:h-1/2 before:bg-gray-400 after:absolute after:content-[''] after:w-1/2 after:h-[1px] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-gray-400`}
                                >

                                    <img src={item.image} alt={item.title} className='h-14 object-cover  group-hover:animate-scaleup transition-transform duration-300' />
                                    <div className='px-4'>
                                        <div className='flex gap-2 items-center'>
                                            {
                                                i18n.language === 'en' && (<span className='text-4xl font-bold text-yellow-400'>+</span>)
                                            }
                                            {index + 1 === 5 && (
                                                <span className='text-4xl font-bold text-yellow-original'>M</span>)}
                                            {/* <CountNumber number={parseInt(t(`possibilty.number_${index + 1}`))} /> */}
                                            <CountNumber number={item.number} />


                                            {
                                                i18n.language === 'ar' && (<span className='text-4xl font-bold text-yellow-original'>+</span>)
                                            }
                                        </div>
                                        <p className='text-lg '>{item.title}</p>


                                    </div>

                                </div>
                        ))
                    ) : (
                        staticPossibilty.map((item, index) => (
                             <div key={index}
                                    className={`flex items-center p-8  border-gray-400  group relative before:absolute before:content-[''] before:top-1/2 before:-translate-y-1/2  before:right-0 before:w-[1px] before:h-1/2 before:bg-gray-400 after:absolute after:content-[''] after:w-1/2 after:h-[1px] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-gray-400`}
                                >

                                    <img src={item} alt={`Static News ${index + 1}`} className='h-14 object-cover  group-hover:animate-scaleup transition-transform duration-300' />
                                    <div className='px-4'>
                                        <div className='flex gap-2 items-center'>
                                            {
                                                i18n.language === 'en' && (<span className='text-4xl font-bold text-yellow-original'>+</span>)
                                            }
                                            {index + 1 === 5 && (
                                                <span className='text-4xl font-bold text-yellow-original'>M</span>)}
                                            <CountNumber number={parseInt(t(`possibilty.number_${index + 1}`))} />


                                            {
                                                i18n.language === 'ar' && (<span className='text-4xl font-bold text-yellow-original'>+</span>)
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