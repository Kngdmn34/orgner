'use client'

import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToasterUIProvider = () => {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
    )
}

export default ToasterUIProvider