import { Head } from '@inertiajs/react'
import React, { ReactNode } from 'react'

type PageComponentProps = {
  children: ReactNode;
  title: string;
};
const PageComponent = ({ children, title }: PageComponentProps) => {
    return (
        <>
            <Head title={title} />
            <div
            className="flex min-h-screen flex-col items-center justify-start bg-gray-50"
            >
                {/* navbar header */}
                <div className="w-full h-16 bg-sky-500 bg-cover bg-center" />
                <div
                className="max-w-7xl w-full px-4 py-8 md:px-6 lg:px-8"
                >
                    {children}
                </div>
            </div>
        </>
    )
}

export default PageComponent