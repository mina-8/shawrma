import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-6 text-lg font-bold pt-1 pb-1 leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-black text-primary-color focus:border-black'
                    : 'border-transparent text-black hover:border-black hover:text-gray-700 focus:border-gray-300 focus:text-gray-700') +
                className
            }
        >
            {children}
        </Link>
    );
}
