import ReciveUpdate from "@/Components/ReciveUpdate";
import { Head } from "@inertiajs/react";
import { Carousel } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPlay } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import ReactPlayer from "react-player";

// Extend the Window interface to include onYouTubeIframeAPIReady and YT
declare global {
    interface Window {
        onYouTubeIframeAPIReady?: () => void;
        YT?: any;
    }
}

interface CoreStation {
    id: number;
    title: string;
    content: string;
    image: string;
}

interface ProductVideo {
    id: number;
    image: string;
    youtube_link: string;
}

interface OurGoal {
    id: number;
    title: string;
    content: string;
    color: string;
    corestations: CoreStation[];
    productvideo: ProductVideo[];
}

interface Props {
    ourgoal: OurGoal;
}

const Index = ({ ourgoal }: Props) => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [videoEnded, setVideoEnded] = useState(false);


    const ShowVideo = (video: string) => {
        setSelectedVideo(video);
        setIsOpen(true)
    }
    const CloseVideo = () => {
        setIsOpen(false);
        setSelectedVideo(null);
    };

    useEffect(() => {
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);

  window.onYouTubeIframeAPIReady = () => {
    const player = new window.YT.Player('yt-player', {
      events: {
        onStateChange: (event: { data: any; }) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            setVideoEnded(true); // أو أي أكشن تريده
          }
        },
      },
    });
  };
}, []);

    return (
        <>
            <Head title={t('footer.ourgoal')} />
            <div
                className="bg-gray-50 flex flex-col dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                style={{
                    backgroundColor: `${ourgoal.color}`
                }}
            >
                <div
                    className="w-full h-32 bg-yellow-original bg-cover bg-center"
                    style={{
                        backgroundColor: `${ourgoal.color}`
                    }}
                />


                {/* content and video grid */}
                <div className="w-full mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    {/* content */}
                    <div

                        className={`animate-fadeup opacity-100 my-12 flex flex-col gap-6`}
                    >
                        <h3 className="text-4xl text-white font-bold">{ourgoal.title}</h3>
                        <div className="text-white text-2xl prose prose-invert">
                            <ReactMarkdown>{ourgoal.content}</ReactMarkdown>
                        </div>
                    </div>

                    {/* يمكنك هنا إضافة كود الفيديوهات لاحقًا */}
                    <div
                        className={`w-full max-w-7xl mx-auto  gap-6 p-6`}
                    >
                        {/* video play */}
                        {!videoEnded && ourgoal?.productvideo?.[0]?.youtube_link && (
    <div className="w-full aspect-video">
        <iframe
  id="yt-player"
  width="100%"
  height="100%"
  src={`${ourgoal.productvideo[0].youtube_link}?autoplay=1&mute=1&controls=0&enablejsapi=1`}
  title="YouTube video player"
  frameBorder="0"
  allow="autoplay; encrypted-media"
  allowFullScreen
></iframe>

    </div>
)}


                        {/* video ended */}
                        {videoEnded && ourgoal?.productvideo?.length > 0 && (
    <Carousel arrows>
        {[...Array(Math.ceil(ourgoal.productvideo.length / 4))].map((_, groupIndex) => {
            const startIndex = groupIndex * 4;
            const groupVideos = ourgoal.productvideo.slice(startIndex, startIndex + 4);

            return (
                <div key={groupIndex}>
                    <div className="grid grid-cols-2 gap-4">
                        {groupVideos.map((item) => (
                            <div key={item.id} className="relative overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={t('productvideo.title')}
                                    loading="lazy"
                                    className="h-auto w-full object-cover transition-transform duration-300 hover:scale-125"
                                />
                                <div
                                    onClick={() => ShowVideo(item.youtube_link)}
                                    className="absolute bottom-0 left-0 bg-yellow-original p-4 cursor-pointer"
                                >
                                    <FaPlay className="text-white text-2xl" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        })}
    </Carousel>
)}


                    </div>
                </div>

                {/* content station */}
                <div className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-12">
                    {ourgoal?.corestations?.map((item, index) => {

                        return (
                            <div
                                key={item.id}
                                className={`flex flex-col md:flex-row ${index % 2 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    } items-center gap-6`}
                            >
                                <div className="w-full md:w-1/2 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-auto object-cover transition-transform duration-300 hover:scale-125"
                                    />
                                </div>
                                <div

                                    className={`w-full md:w-1/2 `}
                                >
                                    <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
                                    <div className="text-white prose prose-invert">
                                        <ReactMarkdown>{item.content}</ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>

                {/* product video */}
                <div
                    className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 my-12"
                >
                    <div
                        className="grid grid-cols-1"
                    >
                        {ourgoal?.productvideo.filter((item, index) => (index === 0)).map((item, index) => (
                            <div
                                key={index}
                                className='relative h-auto w-full overflow-hidden'
                            >
                                <img
                                    src={item.image}
                                    alt={t('productvideo.title')}
                                    loading='lazy'
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-125"
                                />
                                <div
                                    onClick={() => ShowVideo(item.youtube_link)}
                                    className='absolute bottom-0 left-0 bg-yellow-original p-4 cursor-pointer'
                                >
                                    <FaPlay className="text-white text-2xl" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
                    >

                        {ourgoal?.productvideo.filter((item, index) => !(index === 0)).map((item, index) => (

                            <div
                                key={index}
                                className='relative overflow-hidden'
                            >
                                <img
                                    src={item.image}
                                    alt={t('productvideo.title')}
                                    loading='lazy'
                                    className='h-auto relative bg-cover bg-center transition-transform duration-300 hover:scale-125'
                                />
                                <div
                                    onClick={() => ShowVideo(item.youtube_link)}
                                    className='absolute bottom-0 left-0 bg-yellow-original p-4 cursor-pointer'
                                >
                                    <FaPlay className="text-white text-2xl" />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>


            </div>

            <ReciveUpdate />

            {/* modal */}
            {
                isOpen && selectedVideo && (
                    <div
                        onClick={CloseVideo}
                        className='fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4'
                    >
                        <div
                            className="bg-white rounded-lg overflow-hidden w-full max-w-3xl relative"
                        >
                            <button
                                onClick={CloseVideo}
                                className="absolute top-2 right-2 text-white bg-black rounded-full w-8 h-8 flex items-center justify-center z-10"
                            >
                                ✕
                            </button>

                            <div
                                className="w-full aspect-video"
                            >
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={selectedVideo}
                                    title="YouTube video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                    </div>
                )
            }
        </>
    );
}

export default Index