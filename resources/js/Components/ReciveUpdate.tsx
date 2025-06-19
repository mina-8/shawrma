import { PageProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
interface FlashMessages {
  success?: string | null;
  error?: string | null;
}

interface Customflash extends PageProps {
  flash?: FlashMessages;
}
const ReciveUpdate = ({color = ''}:{color?:string}) => {
    const { t, i18n } = useTranslation();
    const { props } = usePage<Customflash>();
        const [showSuccess, setShowSuccess] = useState<boolean>(!!props?.flash?.success);
        const SuccessMessage  = props?.flash?.success;
        useEffect(() => {
                if (SuccessMessage) {
                    setShowSuccess(true);
                    const timer = setTimeout(() => {
                        setShowSuccess(false);
                    }, 1000); // 10 seconds

                    return () => clearTimeout(timer); // Cleanup on unmount
                }
            }, [SuccessMessage]);
    return (
        <div className="bg-yellow-original py-12 px-4"
        style={{ backgroundColor: color || '#facc15' }}
        >
            {showSuccess && (
                <div className="fixed top-4 left-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg transition duration-500">
                    {SuccessMessage}
                </div>
            )}
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-6">
                {/* Text */}
                <div>
                    <p className="text-white text-4xl font-semibold">
                        {t('reciveupdate.subscribeText') || 'Stay updated — receive our latest news'}
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        // TODO: send email value to backend or API
                        const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
                        router.post(route('contact-form' , {lang:i18n.language}) , {email:email})
                    }}
                    className="flex flex-col sm:flex-row "
                >
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder={t('reciveupdate.placeholder')}
                        className={`flex-1 text-2xl px-4 py-2 border border-gray-300 focus:outline-none focus:ring-0 focus:ring-none ${i18n.language === 'ar' ? 'rounded-tr-3xl' : 'rounded-tl-3xl'}`}
                    />
                    <button
                        type="submit"
                        className={`px-6 py-2 bg-black text-white font-medium  transition ${i18n.language === 'ar' ? 'rounded-bl-3xl' : 'rounded-br-3xl'} `}
                    >
                        {t('reciveupdate.submit') || 'Subscribe'}
                    </button>
                </form>
            </div>
        </div>

    )
}

export default ReciveUpdate