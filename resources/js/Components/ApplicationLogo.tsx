import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 200 60"
            xmlns="http://www.w3.org/2000/svg"
        >

            <text
                x="50%"
                y="60%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="70"
                fill="#EEE"
                fontFamily="'Times New Roman', serif"
                fontWeight="bold"
            >
                BSCO
            </text>
        </svg>
    );
}
