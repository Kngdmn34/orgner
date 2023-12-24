
import React from 'react';
import { UseFormRegisterReturn, FieldValues } from 'react-hook-form'

interface InputProps {
    register: UseFormRegisterReturn
    label: string
    type?: string
    valueAsNumber?: boolean
    placeholder?: string;
    required?: boolean

}

const Input: React.FC<InputProps> = ({ register, required, placeholder, label, type, valueAsNumber }) => {

    //testing UI
    return (
        <div className='flex flex-col'>
            <h2 className='text-tiny mx-1 flex justify-start '>{label}</h2>
            <input
                placeholder={placeholder}
                required={required}
                type={type}

                className='border-2 px-1 rounded-md shadow-md  ' />
        </div>
    )
}

export default Input