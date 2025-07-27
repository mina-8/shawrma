
import Footer from '@/Layouts/Footer';
import { Head, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

const Servay = () => {

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        lastOrder: '',
        foodQuilty: '',
        serviceSpeed: '',
        recommend: '',
        staffRating: '',
        howDidYouKnow: '',
        suggestions: ''
    });

    // handle input change
    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    // validate required fields for current step
    const validateStep = () => {
        if (currentStep === 1) {
            return (
                formData.fullName.trim() !== '' &&
                formData.phoneNumber.trim() !== '' &&
                formData.lastOrder.trim() !== ''
            );
        }
        if (currentStep === 2) {
            return formData.foodQuilty.trim() !== '';
        }
        if (currentStep === 3) {
            return formData.serviceSpeed.trim() !== '' && formData.recommend.trim() !== '';
        }
        if (currentStep === 4) {
            return formData.staffRating.trim() !== '' && formData.howDidYouKnow.trim() !== '';
        }
        return true;
    };

    // handle next step
    const nextStep = () => {
        if (!validateStep()) {
            alert('يرجى ملء جميع الحقول المطلوبة قبل المتابعة');
            return;
        }
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    // handle previous step
    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // handle form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateStep()) {
            alert('يرجى ملء جميع الحقول المطلوبة قبل الإرسال');
            return;
        }

        console.log('form submit', formData);
    };

    // progress bar
    const renderProgressBar = () => (
        <div className="container flex justify-between items-center gap-4 relative after:absolute after:h-[1px] after:w-full after:bg-black after:-z-10">
            {[1, 2, 3, 4, 5].map((step) => (
                <div
                    key={step}
                    className={`w-10 h-10 text-center flex justify-center items-center rounded-full border-2 border-white ${currentStep >= step ? 'bg-white text-black' : 'bg-primary-color text-white'
                        }`}
                >
                    {step}
                </div>
            ))}
        </div>
    );

    // radio options
    const satisfactionOptions = ['غير راضي', 'مقبول', 'جيد', 'ممتاز'];

    // step rendering
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <div className="flex flex-col gap-4 w-full my-4">
                            <label>الاسم بالكامل</label>
                            <input
                                type="text"
                                placeholder="الاسم بالكامل"
                                value={formData.fullName}
                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-4 w-full my-4">
                            <label>رقم الهاتف</label>
                            <input
                                type="tel"
                                placeholder="رقم الهاتف"
                                value={formData.phoneNumber}
                                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-4 w-full my-4">
                            <label>ماذا كان آخر طلب لك من شاورمتي الأصلي؟</label>
                            <input
                                type="text"
                                placeholder="آخر طلب"
                                value={formData.lastOrder}
                                onChange={(e) => handleInputChange('lastOrder', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div>
                        <div className="flex flex-col gap-4 w-full my-4">
                            <label>ما مدى رضاك عن جودة طعامك؟</label>
                            <div className="flex flex-col gap-2">
                                {satisfactionOptions.map((option) => (
                                    <label key={option} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="foodQuality"
                                            value={option}
                                            checked={formData.foodQuilty === option}
                                            onChange={() => handleInputChange('foodQuilty', option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div>
                        <div className="flex flex-col gap-4 w-full my-4">
                            <label>ما مدى رضاك عن سرعة تقديم الطعام؟</label>
                            <div className="flex flex-col gap-2">
                                {satisfactionOptions.map((option) => (
                                    <label key={option} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="serviceSpeed"
                                            value={option}
                                            checked={formData.serviceSpeed === option}
                                            onChange={() => handleInputChange('serviceSpeed', option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 w-full my-4">
                            <label>هل توصي أصدقاءك بمطعمنا؟</label>
                            <div className="flex flex-col gap-2">
                                {['نعم', 'لا'].map((option) => (
                                    <label key={option} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="recommend"
                                            value={option}
                                            checked={formData.recommend === option}
                                            onChange={() => handleInputChange('recommend', option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div>
                        <div className="flex flex-col gap-4 w-full my-4">
                            <label>كيف تقيّم تعامل موظفي المطعم والعاملين فيه؟</label>
                            <div className="flex flex-col gap-2">
                                {satisfactionOptions.map((option) => (
                                    <label key={option} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="staffRating"
                                            value={option}
                                            checked={formData.staffRating === option}
                                            onChange={() => handleInputChange('staffRating', option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 w-full my-4">
                            <label>كيف تعرفت على مطعمنا؟</label>
                            <input
                                type="text"
                                placeholder="مثال: صديق، إعلان..."
                                value={formData.howDidYouKnow}
                                onChange={(e) => handleInputChange('howDidYouKnow', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div>
                        <div className="flex flex-col gap-4 w-full my-4">
                            <label>هل لديك اقتراحات أو انتقادات لتحسين خدماتنا أو جودة طعامنا؟</label>
                            <textarea
                                placeholder="اكتب اقتراحاتك هنا..."
                                value={formData.suggestions}
                                onChange={(e) => handleInputChange('suggestions', e.target.value)}
                                rows={5}
                            />
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <Head title="servay" />
            <section className="mx-auto w-full max-w-4xl px-4 py-8">
                <section className="bg-primary-color text-white p-4 flex justify-center items-center rounded-lg my-6 text-2xl font-bold">
                    رأيك يهمنا
                </section>

                {renderProgressBar()}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-8">
                    {renderStep()}

                    <div className="flex justify-between gap-4 mt-6">
                        {currentStep > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="bg-gray-500 text-white px-6 py-3 rounded-lg"
                            >
                                السابق
                            </button>
                        )}

                        {currentStep < 5 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="bg-primary-color text-white px-6 py-3 rounded-lg"
                            >
                                التالي
                            </button>
                        ) : (
                            <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg">
                                إرسال
                            </button>
                        )}
                    </div>
                </form>


            </section>
            {/* footer */}
            <Footer />
        </>
    );
};

export default Servay;
