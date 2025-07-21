import { SVGAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '@/../../public/logo.svg'
export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {

    return (
        <img src={logo} alt="ORCA" className='bg-cover bg-center h-16 md:h-24 rounded-lg ' />
    );
}