import { useTranslation } from "react-i18next";
import img1 from '../../../../../public/possibility/figures-customers.svg';
import img2 from '../../../../../public/possibility/figures-employees.svg';
import img3 from '../../../../../public/possibility/figures-products.svg';
import img4 from '../../../../../public/possibility/figures-tons.svg';
import img5 from '../../../../../public/possibility/poduction-lines.svg';
import img6 from '../../../../../public/possibility/figures-projects.svg';
import CountNumber from "@/Components/CountNumber";
interface PossiblitiItems {
    id: number;
    name: string;
    number: number;
    image: string;
}

interface Props {
    possibilty: PossiblitiItems[];
}
const Possibilty = ({ possibilty }: Props) => {

    const { t, i18n } = useTranslation();
    const staticPossibilty = [img1, img2, img3, img4, img5, img6];
    return (
        <div
            className='py-12 flex flex-col items-center justify-center gap-4 min-h-screen bg-gray-200 w-full'
        >
            <div className='p-4 mx-auto w-full max-w-7xl flex flex-col items-center justify-center gap-8'>
                <h2 className='text-3xl border-b-2 border-sky-500 pb-2 mb-4 text-center'>{t('possibilty.title')}</h2>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full'>
                    {possibilty.length > 0 ? (
                        possibilty.map((item, index) => (
                            <div key={item.id} className='flex flex-col items-center justify-center gap-4 bg-gray-50 rounded-lg shadow p-4 h-full min-w-[250px] md:min-w-[300px] w-full'>

                                <img src={item.image} alt={item.name} className='w-full h-full object-cover rounded-md' />
                                <div className='px-4'>
                                    <h3 className='text-lg font-bold text-center'>{item.name}</h3>
                                    <p className='text-sm text-gray-600 text-center'>{item.number}</p>

                                </div>

                            </div>
                        ))
                    ) : (
                        staticPossibilty.map((item, index) => (
                            <div key={index}
                            //  className='flex flex-col items-center justify-center gap-6 bg-gray-50 shadow w-full min-w-[250px] md:min-w-[300px] h-full'
                            >
                                <div
                                    className="flex items-center border-r-2  pr-4 border-b-2 border-gray-300 pb-4 group"
                                >

                                    <img src={item} alt={`Static News ${index + 1}`} className='h-14 object-cover  group-hover:animate-scaleup transition-transform duration-300' />
                                    <div className='px-4'>
                                        <div className='flex gap-2 items-center'>
                                        {
                                            i18n.language === 'en' && (<span className='text-4xl font-bold text-sky-500'>+</span>)
                                        }
                                        {index +1 === 5 && (
                                            <span className='text-4xl font-bold text-sky-500'>M</span>)}
                                        <CountNumber number={parseInt(t(`possibilty.number_${index + 1}`))} />


                                        {
                                            i18n.language === 'ar' && (<span className='text-4xl font-bold text-sky-500'>+</span>)
                                        }
                                        </div>
                                        <p className='text-lg '>{t(`possibilty.name_${index + 1}`)}</p>

                                    </div>
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