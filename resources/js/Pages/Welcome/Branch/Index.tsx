import ContentRenderer from '@/Components/ContentRenderer';
import React from 'react'
import { useTranslation } from 'react-i18next';
interface props {
    branches: {
        id: number;
        content: string;
        map: string;
        video: string;
    }[]
}
const Index = ({ branches }: props) => {
    const {t} = useTranslation()
    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-8">
            <div
                className=' flex flex-col justify-center items-center gap-8'
            >
                {branches.length > 0 && (
                    branches.map((branch, index) =>
                        <div
                            key={branch.id}

                            className=' flex flex-col justify-center items-center gap-8 w-full border-b-2 border-black pb-12'
                        >
                            <ContentRenderer content={branch.content} />
                            <div
                            className='flex justify-between items-center w-full'
                            >
                            <a href={branch.map} target="_blank" rel="noopener noreferrer"
                                className='w-full '
                            >
                                <iframe
                                    src={branch.map}
                                    frameBorder="0"
                                    className='w-full h-[500px]'
                                />

                            </a>

                            <video
                                // autoPlay
                                // muted
                                loop
                                playsInline
                                // poster={posterImage}
                                controls
                                className='w-full h-[500px]'
                                // style={{ width: '100%', height: 'auto' }}
                                aria-label="BSCO Video"
                            >
                                <source src={branch.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            </div>
                        </div>
                    )
                )}
            </div>
        </section>
    )
}

export default Index