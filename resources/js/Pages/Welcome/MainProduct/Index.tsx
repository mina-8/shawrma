
import ReciveUpdate from '@/Components/ReciveUpdate';
import { Head, Link, router } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import themecard from '@/../../public/theme_card.svg'
import banner from '@/../../public/aboutus/our-story.jpg'
interface Product {
    id: number;
    title: string;
}
interface MainProduct {
    id: number;
    title: string;
    color: string;
    image: string;
    icon: string;
    slug: string;

}

interface Props {
    mainproduct: MainProduct[];
    product: Product[];

}
const Index = ({ mainproduct, product }: Props) => {

    const { t, i18n } = useTranslation();
    const [Product, setProduct] = useState('');
    const [MainProduct, setMainProduct] = useState('');
    const [FilterProduct, setFilterProduct] = useState<Product[]>([]);
    const [showFilter, setshowFilter] = useState(false);
    const HandelProducts = (value: string) => {
        setProduct(value);
        if (value.trim() === "") {
            setFilterProduct([]);
            setshowFilter(false);
            return;

        }
        const filtered = product.filter((item: Product) => item.title.toLowerCase().includes(value.toLowerCase()))
        setFilterProduct(filtered)
        setshowFilter(true)
    }


    const HandelSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();

        const querysearch = {
            product: Product,
            mainproduct: MainProduct
        }

        router.get(route('product-search', { lang: i18n.language }), querysearch)

    }
    return (
        <>
            <Head title={t('mainproduct.title')} />
            <div
                className="bg-gray-50 flex flex-col"
            >
                {/* Top Banner */}
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
                        {t('mainproduct.title')}
                    </h2>
                </div>
            </div>
            <div
                className=' w-full max-w-7xl container mx-auto'
            >
                {/* search */}
                <div className='w-full max-w-7xl container mx-auto'>
                    {/* search */}
                    <div className='my-12 bg-yellow-original flex justify-center lg:justify-start items-center p-8'>
                        <form className='flex flex-col lg:flex-row items-center w-full' onSubmit={HandelSubmitForm}>
                            <div
                                className={`relative w-3/4 ${i18n.language === 'en' && 'mr-4'}`}
                            >
                                <input
                                    name='product'
                                    value={Product}
                                    onChange={(e) => HandelProducts(e.target.value)}
                                    type="text"
                                    className={`${i18n.language === 'ar' ? 'rounded-tr-3xl' : 'rounded-tl-3xl'} p-4 w-full`}
                                    placeholder={t('product-search.product-name')}
                                />
                                {showFilter &&
                                    <div
                                        className='absolute bg-gray-50 w-full p-4 flex flex-col gap-4'
                                    >
                                        {FilterProduct.map((item: any) => (
                                            <div
                                                key={item.id}
                                                className='hover:text-yellow-original'
                                            >
                                                <Link
                                                    href={route('product.show', { lang: i18n.language, slug: item.slug })}
                                                >
                                                    {item.title}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>

                            <select
                                name='mainproduct'
                                className={`${i18n.language === 'ar' ? 'rounded-tr-3xl mr-4' : 'rounded-tl-3xl'} p-4 w-3/4 `}
                                defaultValue=""
                                style={{ backgroundImage: 'none' }}
                                value={MainProduct}
                                onChange={(e) => setMainProduct(e.target.value)}
                            >
                                <option value="" disabled>
                                    {t('product-search.mainproduct-name')}
                                </option>
                                {mainproduct.map((product: any) => (
                                    <option key={product.id} value={product.id}>
                                        {product.title}
                                    </option>
                                ))}
                            </select>
                            <button
                                className={`${i18n.language === 'ar' ? 'rounded-bl-3xl' : 'rounded-br-3xl'} bg-black text-white p-4`}
                            >
                                {t('product-search.search')}
                            </button>
                        </form>
                    </div>

                </div>

                <div
                    className='w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-12'
                >

                    {mainproduct.map((item) => (
                        <div
                            key={item.id}
                            className='pr-[40px] bg-yellow-original'
                            style={{
                                backgroundColor: item.color,
                                backgroundImage: `url('${themecard}')`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right top',
                                backgroundSize: 'cover'
                            }}
                        >
                            <div
                                className='flex flex-col justify-center items-center bg-yellow-original'
                                style={{
                                    backgroundColor: item.color
                                }}
                            >
                                <Link
                                    href={route('mainproduct.show', { lang: i18n.language, slug: item.slug })}
                                    className='overflow-hidden'
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className='h-52 w-full bg-no-repeat bg-cover hover:scale-125 hover:rotate-12 duration-500'
                                    />
                                </Link>
                                <Link
                                    href={route('mainproduct.show', { lang: i18n.language, slug: item.slug })}
                                    className='w-full'
                                >
                                    <div className='flex justify-start items-center gap-4 px-4 py-4'>
                                        {item.icon &&  item.icon.endsWith('.svg') &&  (
                                            <img
                                                src={item.icon}
                                                alt={`${item.title} icon`}
                                                className='h-6 w-auto object-contain '
                                                style={{
                                                    filter : 'brightness(0) invert(1)'
                                                }}
                                            />
                                        )}
                                        <p className='text-white text-lg ml-2'>{item.title}</p>
                                    </div>
                                </Link>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ReciveUpdate />
        </>
    )
}

export default Index