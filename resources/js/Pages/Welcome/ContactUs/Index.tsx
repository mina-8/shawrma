import ReciveUpdate from '@/Components/ReciveUpdate'
import { Head, router, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import banner from '@/../../public/aboutus/our-story.jpg'
import { countries } from '@/Components/AllCountry/countries'
import { PageProps } from '@/types'

interface FlashMessages {
  success?: string | null;
  error?: string | null;
}

interface Customflash extends PageProps {
  flash?: FlashMessages;
}
interface OurRegional {
    id: number;
    state: string;
    address: string;
    mailbox: string;
    phone: string;
    email: string;
}
interface Props {
    ourregionalOffice: OurRegional[];
}
const Index = ({ ourregionalOffice }: Props) => {
    const { t, i18n } = useTranslation();
    const { props } = usePage<Customflash>();
    const [showSuccess, setShowSuccess] = useState<boolean>(!!props?.flash?.success);
    const SuccessMessage  = props?.flash?.success;

    useEffect(() => {
        if (SuccessMessage) {
            setShowSuccess(true);
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 10000); // 10 seconds

            return () => clearTimeout(timer); // Cleanup on unmount
        }
    }, [SuccessMessage]);
    const [formData, setFormData] = useState({
        type: 'inquiry',
        name: '',
        email: '',
        phone: '',
        country: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('contact-us', { lang: i18n.language }), formData)
    };
    return (
        <>
            {showSuccess && (
                <div className="fixed top-4 left-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg transition duration-500">
                    {SuccessMessage}
                </div>
            )}

            <Head title={t('navbar-links.contact-us')} />
            <div
                className="relative bg-gray-50 flex flex-col"
            >

                {/* top banner */}
                <div
                    className="w-full h-[500px] flex relative overflow-hidden"
                >
                    <div
                        className="w-full h-full bg-cover  absolute"
                        style={{
                            backgroundImage: `url('${banner}')`,
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                    <div className='absolute w-full h-full bg-black top-0 right-0 opacity-50'></div>
                    <h2
                        className={`relative flex w-full  items-center  mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-6xl text-white font-medium`}
                    >
                        {t('navbar-links.contact-us')}
                    </h2>
                </div>
                {/* create form contact us */}
                <div
                    className='w-full max-w-7xl mx-auto my-12'
                >
                    <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-4'>
                        <div className='self-start w-full'>
                            <h3 className='mb-2'>{t('contact.query')}</h3>
                            <div className='flex flex-col md:flex-row gap-4'>
                                {[
                                    { value: 'inquiry', label: t('contact.types.inquiry') },
                                    { value: 'complaint', label: t('contact.types.complaint') },
                                    { value: 'comments', label: t('contact.types.comments') },
                                ].map((option) => (
                                    <label
                                        key={option.value}
                                        className={`px-6 py-3 border cursor-pointer font-medium text-center transition-all
          ${formData.type === option.value
                                                ? 'border-yellow-original bg-yellow-original text-white'
                                                : 'border-gray-300 bg-white text-gray-700'
                                            }`}
                                    >
                                        <input
                                            type='radio'
                                            name='type'
                                            value={option.value}
                                            checked={formData.type === option.value}
                                            onChange={handleChange}
                                            className='hidden'
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div
                            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'
                        >
                            <div

                            >
                                <input type='text' name='name' placeholder={t('contact.name')} value={formData.name} onChange={handleChange}
                                    className='w-full border  px-4 py-4 mb-4 rounded-tr-3xl'
                                    required />
                                <input type='email' name='email' placeholder={t('contact.email')} value={formData.email} onChange={handleChange}
                                    className='w-full border  px-4 py-4 mb-4'
                                    required />
                                <input type='tel' name='phone' placeholder={t('contact.phone')} value={formData.phone} onChange={handleChange}
                                    className='w-full border  px-4 py-4 mb-4 rounded-tr-3xl'
                                    required />
                                <select name='country' value={formData.country} onChange={handleChange} style={{ backgroundImage: 'none' }}
                                    className='w-full border  px-4 py-4 '
                                    required>
                                    <option value="">{t('contact.select_country')}</option>
                                    {countries.map((country) => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <textarea name='message' placeholder={t('contact.message')} value={formData.message} onChange={handleChange} className='w-full border  px-4 py-2' rows={4} required />

                        </div>
                        <button type='submit'
                            className='p-4 bg-yellow-original text-white font-semibold text-lg shadow-md hover:shadow-none'
                        >{t('contact.submit')}</button>
                    </form>

                </div>
                {/* our regional */}
                <div
                    className='bg-gray-200'
                >

                    <div
                        className='flex flex-col  w-full max-w-7xl mx-auto py-12 '
                    >
                        <div
                            className='flex justify-center items-center'
                        >
                            <h3
                                className='text-2xl font-semibold border-b-2 pb-2 border-yellow-original mb-4'
                            >{t('ourregional.title')}</h3>
                        </div>
                        <div
                            className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '
                        >
                            {ourregionalOffice?.map((item) => (
                                <div
                                    key={item.id}
                                    className='bg-white shadow-md p-4 flex flex-col gap-4'
                                >
                                    <div>
                                        {t('ourregional.state')} : {item.state}
                                    </div>
                                    <div>
                                        {t('ourregional.address')} : {item.address}
                                    </div>
                                    <div>
                                        {t('ourregional.mailbox')} : {item.mailbox}
                                    </div>
                                    <div>
                                        {t('ourregional.phone')} : {item.phone}
                                    </div>
                                    <div>
                                        {t('ourregional.email')} : {item.email}
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* recive updates */}
            <ReciveUpdate />
        </>
    )
}

export default Index