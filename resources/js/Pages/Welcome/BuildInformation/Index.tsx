
import { Head } from '@inertiajs/react'
import banner from '@/../../public/aboutus/our-story.jpg'
import ReactMarkdown from 'react-markdown';
import { IoMdCheckmark } from 'react-icons/io';
import rehypeRaw from 'rehype-raw';
import rehypeColorCodeToParent from '@/Components/rehypeColorCodeToParent';
interface BuildInformation {
    id: number;
    banner: string;
    title: string;
    content: string;
}
interface Props {
    buildinforamtion: BuildInformation;
}
const Index = ({ buildinforamtion }: Props) => {
    return (
        <>
            <Head title={buildinforamtion.title} />
            <div
                className='bg-gray-50 flex flex-col dark:bg-gray-900 dark:text-gray-100'
            >
                {/* top banner */}
                <div
                    className='w-full h-[500px] flex relative overflow-hidden'
                >
                    {/* banner */}
                    <div
                        className="w-full h-full bg-cover  absolute inset-0 bg-black/50"
                        style={{
                            backgroundImage: `url('${buildinforamtion.banner ? buildinforamtion.banner : banner}')`,
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                    <div className='absolute w-full h-full bg-black top-0 right-0 opacity-50'></div>

                    <h2
                        className={`relative flex w-full items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-6xl text-white font-medium`}
                    >
                        {buildinforamtion.title}
                    </h2>

                </div>
                {/* content */}
                <div
                    className='w-full max-w-7xl mx-auto my-12 leading-10 text-xl'
                >
                    <ReactMarkdown
  rehypePlugins={[rehypeRaw, rehypeColorCodeToParent]}
  components={{
    img: ({ ...props }) => (
      <img {...props} className="bg-transparent h-16 my-2 inline-flex mx-4" />
    ),
    li({ children, ...props }) {
      return (
        <li className="flex items-center gap-2" {...props}>
          <IoMdCheckmark className="text-primary-color mt-1" />
          <span>{children}</span>
        </li>
      );
    },
  }}
>
  {buildinforamtion.content}
</ReactMarkdown>

                </div>

            </div>
            
        </>
    )
}

export default Index