
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
                className=' w-full max-w-7xl container mx-auto'
            >
                <div className='text-primary-color text-4xl font-semibold py-8 text-center'>NOT FOUND THIS PAGE</div>
            </div>
                <div>
                    <img src={bsco} alt={'notfound'} />
                </div>

        </>
      );
}

export default NotFound