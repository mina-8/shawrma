import { SVGAttributes } from 'react';
import { useTranslation } from 'react-i18next';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    const {i18n} = useTranslation();
    const fontFamily = i18n.language === 'ar' ? '"Cairo", "Readex Pro", "Noto Sans", sans-serif' : 'Poppins, Roboto, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    return (
        <svg
            {...props}
            viewBox="0 0 600 150"
            xmlns="http://www.w3.org/2000/svg"
        >

            <text
                x="50%"
                y="60%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="150"
                fill="#EEE"
                fontFamily={fontFamily}
                fontWeight="bold"
            >
                BSCO
            </text>
        </svg>
    );
}
