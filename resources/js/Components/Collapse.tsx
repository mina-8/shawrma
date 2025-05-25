import React, { useState } from 'react'

const Collapse = ({ title, children }: { title: string, children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border shadow-lg overflow-hidden">
            <div
                className="p-4 flex justify-between items-center cursor-pointer bg-white hover:bg-yellow-original hover:text-white group"
                onClick={toggleCollapse}
            >
                <span className='group-hover:text-white text-lg '>{title}</span>
                <svg
                    className={`w-6 h-6 transform transition-transform group-hover:text-white text-sky-500 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
            >
                <div className="p-4 bg-white">{children}</div>
            </div>
        </div>
    )
}

export default Collapse