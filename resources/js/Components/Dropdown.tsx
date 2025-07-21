import { Transition } from '@headlessui/react';
import { InertiaLinkProps, Link } from '@inertiajs/react';
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState,
} from 'react';

const DropDownContext = createContext<{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    toggleOpen: () => void;
}>( {
    open: false,
    setOpen: () => {},
    toggleOpen: () => {},
} );

const Dropdown = ( { children }: PropsWithChildren ) => {
    const [open, setOpen] = useState( false );

    const toggleOpen = () => {
        setOpen( ( prev ) => !prev );
    };

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            {/*
              Wrap the entire dropdown in a div that listens for hover events.
              onMouseEnter = open
              onMouseLeave = close
            */}
            <div
                className="relative"
                onMouseEnter={() => setOpen( true )}
                onMouseLeave={() => setOpen( false )}
            >
                {children}
            </div>
        </DropDownContext.Provider>
    );
};

const Trigger = ( { children }: PropsWithChildren ) => {
    return (
        <div className="cursor-pointer">
            {children}
        </div>
    );
};

const Content = ( {
    align = 'right',
    width = '48',
    contentClasses = 'py-1 bg-white',
    children,
}: PropsWithChildren<{
    align?: 'left' | 'right' | 'center';
    width?: '48';
    contentClasses?: string;
}> ) => {
    const { open } = useContext( DropDownContext );

    let alignmentClasses = 'origin-top';
    if ( align === 'left' ) {
        alignmentClasses = 'ltr:origin-top-left rtl:origin-top-right start-0';
    } else if ( align === 'right' ) {
        alignmentClasses = 'ltr:origin-top-right rtl:origin-top-left end-0';
    }else if (align === 'center') {
        alignmentClasses =
            'left-1/2 -translate-x-1/2 origin-top'; // ✅ center
    }

    let widthClasses = width === '48' ? 'w-48' : '';

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
                className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
            >
                <div
                    className={
                        `rounded-md ring-1 ring-black ring-opacity-5 ` +
                        contentClasses
                    }
                >
                    {children}
                </div>
            </div>
        </Transition>
    );
};

const DropdownLink = ( {
    className = '',
    children,
    ...props
}: InertiaLinkProps ) => {
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
