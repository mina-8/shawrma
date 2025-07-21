import { Button, Carousel, ConfigProvider } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

import slideone from '../../../../../public/sliders/slide (1).webp'
import slidetow from '../../../../../public/sliders/slide (2).webp'
import slidethree from '../../../../../public/sliders/slide (3).webp'
import slidefour from '../../../../../public/sliders/slide (4).webp'
import { useTranslation } from 'react-i18next'
import { Link } from '@inertiajs/react'

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import { MdOutlineArrowCircleLeft, MdOutlineArrowCircleRight } from 'react-icons/md'

interface Slides {
    id: number;
    title: string;
    content: string;
    image: string;
    active_btn: boolean
    str_btn: string;
    link: string;
}

interface Props {
    slides: Slides[]
}
export default function Sliders({ slides }: Props) {

    const { t, i18n } = useTranslation();

    const [visibleSlides , setVisibleSlides] = useState<boolean[]>(
        Array(slides.length).fill(false)
    )

    const slideRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'))
          if (!isNaN(index)) {
            setVisibleSlides((prev) => {
              const updated = [...prev]
              updated[index] = entry.isIntersecting
              return updated
            })
          }
        })
      },
      { threshold: 0.1 } // يبدأ الأنيميشن لما يظهر 30% من العنصر
    )

    slideRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()

  }, [slides.length]);

    const images = [
        slideone,
        slidetow,
        slidethree,
        slidefour
    ];

    return (
        <div className='flex justify-center items-center flex-col '>
            <div className='w-full'>
                {slides?.length > 0 ?
                    slides.map((item, index) =>
                        <div
                        key={index}
                            className='w-full h-screen bg-center bg-cover '
                            data-index={index}
                            ref={(el)=>(slideRefs.current[index] = el)}
                            style={{ backgroundImage: `url('${item.image}')` }}
                        >
                            {index === 0 ?
                                <div
                                    className='flex justify-center items-center h-full flex-col'
                                >

                                    <p className='text-white text-[45px] font-bold'
                                        style={{ textShadow: '2px 1px 2px rgba(0,0,0,0.3)' }}
                                    >{item.title}</p>
                                    <div className='text-white font-bold text-4xl'
                                        style={{ textShadow: '2px 1px 2px rgba(0,0,0,0.3)' }}
                                    ><ReactMarkdown>{item.content}</ReactMarkdown></div>
                                </div>
                                :

                                <div
                                    className={`flex mx-auto max-w-7xl h-full  w-full overflow-hidden ${index % 2 ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div

                                        className={`flex flex-col justify-center items-start ${visibleSlides[index] ? index % 2 ? ' animate-faderight' : ' animate-fadeleft' : "opacity-0"} `}
                                    >

                                        <p className='text-white text-[45px] font-bold'
                                            style={{ textShadow: '2px 1px 2px rgba(0,0,0,0.3)' }}
                                        >{item.title}</p>
                                        <div className='text-white font-bold text-xl'
                                            style={{ textShadow: '2px 1px 2px rgba(0,0,0,0.3)' }}
                                        ><ReactMarkdown>{item.content}</ReactMarkdown></div>
                                        {item.active_btn &&
                                            <Link
                                                className='px-4 py-2 rounded my-4 font-semibold bg-primary-color text-white flex items-center gap-3'
                                                href={route(item.link)}
                                            >
                                                {item.str_btn}
                                                {i18n.language == 'ar' ? <MdOutlineArrowCircleLeft /> : <MdOutlineArrowCircleRight />}
                                            </Link>
                                        }
                                    </div>
                                </div>

                            }
                        </div>
                    )
                    :
                    images.map((item, index) =>
                        <div></div>
                    )

                }
            </div>

        </div>
    )
}
