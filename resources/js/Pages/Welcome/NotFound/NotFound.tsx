import ReciveUpdate from '@/Components/ReciveUpdate';
import { Head } from '@inertiajs/react';
import React from 'react'
import { useTranslation } from 'react-i18next';
import bsco from '@/../../public/bsco_not_found_page.png'
const NotFound = () => {
  const { t, i18n } = useTranslation();

      return (
          <>
            <Head title={t('notfound')} />
            <div
                className="bg-gray-50 flex flex-col"
            >
                {/* Top Banner */}
                <div
                    className="w-full h-28 bg-yellow-original bg-cover bg-center"
                />
            </div>
            <div
                className=' w-full max-w-7xl container mx-auto'
            >
                <div className='text-yellow-original text-4xl font-semibold py-8 text-center'>NOT FOUND THIS PAGE</div>
            </div>
                <div>
                    <img src={bsco} alt={'notfound'} />
                </div>
            <ReciveUpdate/>
        </>
      );
}

export default NotFound