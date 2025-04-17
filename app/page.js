"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    validateToken
} from '../app/_app/auth';

export default function HomePage() {

    const router = useRouter();

    useEffect(() => {
        if(localStorage.getItem('token')) {
            validateToken().then((res)=>{
                if (res.status == 200) {
                    router.push('/dashboard');
                } else {
                    router.push('/login');
                }
            })
        } else {
            router.push('/login');
        }
    }, []);

    return (
        null
    );
}