import { usePage } from '@inertiajs/react';
import React from 'react'
import Authenticated from './AuthenticatedLayout';
import AuthWelcome from './AuthWelcome';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const { auth }: any = usePage().props;
    if(auth.user){
        return (
            <Authenticated user={auth.user}>
                {children}
            </Authenticated>
        )
    }else{
        return (
            <AuthWelcome>
                {children}
            </AuthWelcome>
        )
    }
    return null;
}

export default AuthLayout