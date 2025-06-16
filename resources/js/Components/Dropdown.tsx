import { Transition } from '@headlessui/react';
import { InertiaLinkProps, Link } from '@inertiajs/react';
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState,
    useRef,
    useEffect,
} from 'react';

const DropDownContext = createContext<{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}>({
    open: false,
    setOpen: () => {},
});

const Dropdown = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => {
    const [open, setOpen] = useState(false);
    const closeTimeout = useRef<NodeJS.Timeout | null>(null);

    // Helpers to open and close with delay on mouse leave
    const openMenu = () => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
            closeTimeout.current = null;
        }
        setOpen(true);
    };

    const closeMenu = () => {
        closeTimeout.current = setTimeout(() => {
            setOpen(false);
        }, 150); // delay 150ms before closing to allow smooth hover between menu and submenu
    };

    return (
        <DropDownContext.Provider value={{ open, setOpen }}>
            {/*
                Wrap with div to track mouse enter/leave for hover behavior
                We'll pass openMenu/closeMenu handlers as props for Trigger and Content
             */}
            <div className={`relative ${className}`} onMouseLeave={closeMenu} onMouseEnter={openMenu}>
                {children}
            </div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => {
    // Trigger does not handle open state directly now (it's on parent hover)
    return <div className={className}>{children}</div>;
};

const Content = ({
    align = 'left',
    width = '48',
    contentClasses = 'py-1 bg-white/50',
    className = '',
    children,
}: PropsWithChildren<{
    align?: 'left' | 'right';
    width?: '48';
    contentClasses?: string;
    className?: string;
}>) => {
    const { open } = useContext(DropDownContext);

    let alignmentClasses = 'origin-top';

    if (align === 'left') {
        alignmentClasses = 'ltr:origin-top-left rtl:origin-top-right start-0';
    } else if (align === 'right') {
        alignmentClasses = 'ltr:origin-top-right rtl:origin-top-left end-0';
    }

    let widthClasses = '';

    if (width === '48') {
        widthClasses = `w-48`;
    }

    return (
        <Transition
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <div
                className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${className}`}
            >
                <div className={`ring-1 ring-black ring-opacity-5 ${contentClasses}`}>
                    {children}
                </div>
            </div>
        </Transition>
    );
};

const DropdownLink = ({
    className = '',
    children,
    ...props
}: InertiaLinkProps) => {
    return (
        <Link
            {...props}
            className={
                'block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ' +
                className
            }
        >
            {children}
        </Link>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
