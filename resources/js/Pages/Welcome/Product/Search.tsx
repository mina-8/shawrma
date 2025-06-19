
import ReciveUpdate from '@/Components/ReciveUpdate';
import { Head, Link, router } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
interface Product {
    id: number;
    title: string;
    description: string;
    image: string;
    slug: string;
}
interface MainProduct {
    id: number;
    title: string;
    slug: string;

}

interface Props {
    searchmainproducts: MainProduct[];
    searchproducts: Product[];
    resultproduct?:Product[];

}
const Search = ({ searchmainproducts, searchproducts , resultproduct}: Props) => {

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
        const filtered = searchproducts.filter((item: Product) => item.title.toLowerCase().includes(value.toLowerCase()))
        setFilterProduct(filtered)
        setshowFilter(true)
    }


    const HandelSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();

        const querysearch = {
            product:Product,
            mainproduct : MainProduct
        }

        router.get(route('product-search' , {lang:i18n.language } ) , querysearch)

    }
    return (
        <>
            <Head title={t('product-search.title')} />
            <div
                className="bg-gray-50 flex flex-col"
            >
                {/* Top Banner */}
                <div
                    className="w-full h-32 bg-yellow-original bg-cover bg-center"
                />
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
                                className='relative w-3/4'
                            >
                                <input
                                    name='product'
                                    value={Product}
                                    onChange={(e) => HandelProducts(e.target.value)}
                                    type="text"
                                    className={`${i18n.language === 'ar' ? 'rounded-tr-3xl' : 'rounded-tl-3xl mr-4'} p-4 w-full`}
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
                                {searchmainproducts.map((product: any) => (
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
                    className='w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-12'
                >
                    {(resultproduct && resultproduct.length > 0 ? resultproduct : searchproducts).map((item)=>(
                        <Link
                            key={item.id}
                            href={route('product.show', { lang: i18n.language, slug: item.slug })}
                            className="flex bg-white shadow-lg p-2 overflow-hidden group dark:bg-gray-600 dark:text-gray-100"
                        >
                            <div className="w-1/2 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="object-cover h-40 group-hover:scale-125 group-hover:rotate-12 duration-500"
                                />
                            </div>
                            <div className="w-1/2 p-4 flex flex-col">
                                <h4 className="text-lg font-semibold mb-2 text-yellow-original">{item.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-white">{item.description}</p>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>
            <ReciveUpdate/>
        </>
    )
}

export default Search