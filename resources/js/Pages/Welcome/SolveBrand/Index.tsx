import ReciveUpdate from '@/Components/ReciveUpdate'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import banner from '@/../../public/aboutus/our-story.jpg'
const Index = ({solvebrand}:any) => {
  const { t, i18n } = useTranslation()
    console.log(solvebrand)
    return (
        <>
            <Head title={solvebrand.title} />
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
                            backgroundImage: `url('${solvebrand.banner ? solvebrand.banner : banner}')`,
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                    <div className='absolute w-full h-full bg-black top-0 right-0 opacity-50'></div>
                    <h2
                        className={`relative flex w-full  items-center  mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-6xl text-white font-medium`}
                    >
                        {solvebrand.title}
                    </h2>
                </div>
            </div>
            <div
                className=' w-full max-w-7xl container mx-auto'
            >

                <div
                    className='w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-12'
                >

                    {solvebrand.mainproducts.map((item:any) => (
                        <div
                            key={item.id}
                            className=' bg-yellow-original'
                            style={{
                                backgroundColor: item.color,
                                // backgroundImage: `url('${item.image}')`,
                                // backgroundRepeat: 'no-repeat',
                                // backgroundPosition: 'right top',
                                // backgroundSize: 'cover'
                            }}
                        >
                            <div
                                className='flex flex-col justify-center items-center bg-yellow-original '
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
                                                src={item.icons}
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