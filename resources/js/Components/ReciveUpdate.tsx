import React from 'react'
import { useTranslation } from 'react-i18next';

const ReciveUpdate = () => {
    const { t, i18n } = useTranslation()
    return (
        <div className="bg-yellow-original py-12 px-4">
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
                        console.log('Submitted Email:', email);
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