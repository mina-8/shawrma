import Collapse from '@/Components/Collapse';

import { Head, Link } from '@inertiajs/react';

import { useTranslation } from 'react-i18next';
import { FaRegFilePdf, FaStar } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

import ReciveUpdate from '@/Components/ReciveUpdate';

import { IoMdCheckmark } from 'react-icons/io';
interface UsageProducts {
    id: number;
    title: string;
    content: string;
}
interface Product {
    id: number;
    title: string;
    content: string;
    description:string;
    uses: string;
    advantages: string;
    color : string;
    image: string;
    pdf: string;
    usageproduct: UsageProducts[];
    slug: string;
}

interface Props {
    product: Product;
    otherproducts:Product[]
}
const Show = ({ product  , otherproducts}: Props) => {
    const { t, i18n } = useTranslation();

    return (
        <>
            <Head title={product.title} />
            <div className=" bg-gray-50 flex flex-col dark:bg-gray-900 dark:text-gray-100">
                {/* Top Banner */}
                <div className="w-full h-32 bg-yellow-original bg-cover bg-center"
                style={{
                    backgroundColor : product.color
                }}
                />

                {/* Main Content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {/* Text Section */}
                        <div className="flex flex-col justify-center items-center text-center px-4">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-original">
                                {product.title}
                            </h2>
                            <p className='py-4'>{product.description}</p>
                            <div className="text-xl leading-8 text-center">
                                <ReactMarkdown>{product.content}</ReactMarkdown>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="flex justify-center items-start">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="max-h-80 w-full object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Uses and Advantages Section */}
                <div className="bg-yellow-original text-white py-8"
                style={{
                    backgroundColor : product.color
                }}
                >
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col items-center">
                                <div
                                    className='border-b-2 border-gray-600 pb-2 text-4xl font-medium mb-4'
                                >
                                    {t('products.uses')}
                                </div>

                                <ReactMarkdown
                                    components={{
                                        li({ children, ...props }) {
                                            return (
                                                <li className="flex items-start gap-2" {...props}>
                                                    <IoMdCheckmark  className="text-white mt-1" />
                                                    <span>{children}</span>
                                                </li>
                                            );
                                        },
                                    }}
                                >
                                    {product.uses}
                                </ReactMarkdown>

                            </div>
                            <div className="flex flex-col items-center">
                                <div
                                    className='border-b-2 border-gray-600 pb-2 text-4xl font-medium mb-4'
                                >
                                    {t('products.advantages')}
                                </div>

                                <ReactMarkdown
                                    components={{
                                        li({ children, ...props }) {
                                            return (
                                                <li className="flex items-start gap-2" {...props}>
                                                    <IoMdCheckmark  className="text-white mt-1" />
                                                    <span>{children}</span>
                                                </li>
                                            );
                                        },
                                    }}
                                >
                                    {product.advantages}
                                </ReactMarkdown>

                            </div>
                        </div>
                    </div>
                </div>

                {/* instruction-uses */}
                {product.usageproduct.length > 0 && (
                    <div
                        className='flex flex-col justify-center items-center my-8'
                    >
                        <h3
                            className='text-4xl font-medium border-b-4 pb-4 border-yellow-original'
                            style={{
                    backgroundColor : product.color
                }}
                        >
                            {t('products.instruction-uses')}
                        </h3>
                        <div
                            className='flex flex-col gap-4 py-4 w-3/4'
                        >
                            {
                                product.usageproduct.map((item) => (
                                    <Collapse key={item.id} title={item.title}>
                                        <ReactMarkdown>{item.content}</ReactMarkdown>
                                    </Collapse>
                                ))
                            }
                        </div>
                    </div>
                )}

                {/* download pdf */}
                <div className="bg-yellow-original text-white py-8"
                style={{
                    backgroundColor : product.color
                }}
                >
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex justify-evenly items-center">
                                <div
                                    className='border-b-2 border-gray-500 text-2xl font-medium mb-2'
                                >
                                    {t('products.downloadpdf')}
                                </div>
                                <a
                                    href={product.pdf}
                                    className='border-2 border-white p-4 text-lg flex justify-center items-center gap-2 hover:bg-white dark:hover:bg-gray-900 hover:text-yellow-original group'
                                >
                                    <FaRegFilePdf size={32} className='group-hover:animate-scaleup transition-transform duration-300' />
                                    {t('products.pdf-file')}
                                </a>
                            </div>

                        </div>
                    </div>
                </div>

                {/* explore more */}

                <div className="flex flex-col justify-center items-center my-8 px-4">
                    <h3 className="text-4xl font-medium border-b-4 pb-4 border-yellow-original text-center"
                    style={{
                    backgroundColor : product.color
                }}
                    >
                        {t('products.explore-more')}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8 w-full max-w-7xl">

                        {otherproducts.length > 0 && otherproducts.map((item) => (

                            <Link
                            href={route('product.show', { lang: i18n.language, slug: item.slug })}
                            className="flex bg-white shadow-lg p-2 overflow-hidden dark:bg-gray-600 dark:text-gray-100">
                                <div className="w-1/2">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="object-cover h-40"
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

            </div>

            <ReciveUpdate color={product.color}/>
        </>
    );
};

export default Show;
