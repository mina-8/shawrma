import ReciveUpdate from '@/Components/ReciveUpdate'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'

interface Product {
    id: number
    title: string;
    description:string;
    slug: string
    image: string
    special: boolean
}

interface MainProduct {
    title: string
    content: string
    image: string
    products: Product[]
}

interface ShowProps {
    mainproduct: MainProduct
}

const Show: React.FC<ShowProps> = ({ mainproduct }) => {

    const { t, i18n } = useTranslation()

    return (
        <>
            <Head title={mainproduct.title} />
            <div className="bg-gray-50 flex flex-col dark:bg-gray-900 dark:text-gray-100">
                {/* Top Banner */}
                <div className="w-full h-96 flex relative overflow-hidden">
                    <div className='absolute w-full h-full bg-black top-0 right-0 opacity-50'></div>

                    {/* Right Half */}
                    <div className={`w-1/2 h-full bg-yellow-original relative after:content-[''] after:absolute after:top-0 after:right-[-40px] after:w-[120%] after:h-full after:bg-yellow-original ${
                        i18n.language === 'ar' ? 'after:skew-x-[-390deg]' : 'after:skew-x-[190deg]'
                    }`}>
                        <div className='flex flex-col items-center justify-center gap-8 h-full z-50 relative'>
                            <h2 className='text-4xl font-medium text-white'>{mainproduct.title}</h2>
                            <div className='mx-12 text-white text-lg prose prose-invert max-w-none'>
                                <ReactMarkdown>{mainproduct.content}</ReactMarkdown>
                            </div>
                        </div>
                    </div>

                    {/* Left Half */}
                    <div
                        className="w-1/2 h-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${mainproduct.image}')` }}
                    />
                </div>

                {/* Featured Products */}
                <div className="flex flex-col justify-center items-center my-8 px-4">
                    <h3 className="text-4xl font-medium border-b-4 pb-4 border-yellow-original text-center">
                        {t('mainproduct.featured-products')}
                    </h3>

                    {mainproduct.products?.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8 w-full max-w-7xl">
                            {mainproduct.products
                                .filter(product => product.special)
                                .map(product => (
                                    <Link
                                        key={product.id}
                                        href={route('product.show', { lang: i18n.language, slug: product.slug })}
                                        className="flex bg-white shadow-lg p-2 overflow-hidden dark:bg-gray-600 dark:text-gray-100"
                                    >
                                        <div className="w-1/2">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="object-cover h-40"
                                            />
                                        </div>
                                        <div className="w-1/2 p-4 flex flex-col">
                                            <h4 className="text-lg font-semibold mb-2 text-yellow-original">{product.title}</h4>
                                            <p className="text-sm text-gray-600 dark:text-white">{product.description}</p>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    )}
                </div>

                {/* All Products */}
                <div className="flex flex-col justify-center items-center my-8 px-4">
                    <h3 className="text-4xl font-medium border-b-4 pb-4 border-yellow-original text-center">
                        {t('mainproduct.all-products')}
                    </h3>

                    {mainproduct.products?.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8 w-full max-w-7xl">
                            {mainproduct.products
                                .filter(product => !product.special)
                                .map(product => (
                                    <Link
                                        key={product.id}
                                        href={route('product.show', { lang: i18n.language, slug: product.slug })}
                                        className="flex bg-white shadow-lg p-2 overflow-hidden group dark:bg-gray-600 dark:text-gray-100"
                                    >
                                        <div className="w-1/2 overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="object-cover h-40 group-hover:scale-125 group-hover:rotate-12 duration-500"
                                            />
                                        </div>
                                        <div className="w-1/2 p-4 flex flex-col">
                                            <h4 className="text-lg font-semibold mb-2 text-yellow-original">{product.title}</h4>
                                            <p className="text-sm text-gray-600 dark:text-white">{product.description}</p>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    )}
                </div>
            </div>
            <ReciveUpdate />
        </>
    )
}

export default Show
