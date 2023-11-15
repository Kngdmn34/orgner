'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { FieldValues, SubmitHandler, useController, NestedValue, useForm } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Input from '../UIcomponents/Input';
import Select from 'react-select'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const phase = [
    {
        label: 'Launch',
        value: 'launch'
    },
    {
        label: 'Growth',
        value: 'growth'
    },
    {
        label: 'Maturity',
        value: 'maturity'
    },
    {
        label: 'Renewal',
        value: 'renewal'
    }

]

const options = [
    {
        label: 'Freelancer',
        value: 'freelancer'
    },
    {
        label: 'Startup',
        value: 'startup'
    },
    {
        label: 'Big Firm',
        value: 'bigfirm'
    },
    {
        label: 'E-comm',
        value: 'ecomms'
    }

]
type FormData = {
    organisationName: string;
    employees: number;
    value: string;
    phase: string;
    age: number
};

const schema = yup
    .object({
        employees: yup.number().required().integer().positive().max(500),
        organisationName: yup.string().min(4).max(20).required().lowercase(),
        value: yup.string().required(),
        phase: yup.string().required(),
        age: yup.number().required().integer().positive().max(100),

    })
    .required()


const Orgset = () => {

    const [loading, setLoading] = useState(false);
    const router = useRouter()




    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })




    const onSubmit: SubmitHandler<FormData> = (data) => {
        setLoading(true)
        console.log(data);
        try {
            axios.post('/api/organisation', data)
                .then((response) => {
                    console.log(response)
                    toast.success('Organisation created')
                    router.back()
                })
                .catch((error) => {
                    console.log(error, 'AXIOS POST ERROR')
                })
                .finally(() => setLoading(false))

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }

    };



    return (
        <div className='flex flex-col justify-center text-center drop-shadow-sm   space-y-5'>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='w-72 flex flex-col space-y-3 '>
                    <label className='flex justify-start mx-1 text-small'>Organisation Name</label>
                    <input className='border-2 px-1 rounded-md shadow-md' required placeholder='enter company name ...' {...register('organisationName')} type='text' />
                    <p className='text-red-500'>{errors.organisationName?.message}</p>
                    <label className='flex justify-start mx-1 text-small'>Employees Number</label>
                    <input className='border-2 px-1 rounded-md shadow-md' required {...register('employees', { valueAsNumber: true })} type='number' />
                    <p className='text-small text-red-500'>{errors.employees?.message?.slice(0, 35)}..</p>
                    <label className='flex justify-start mx-1 text-small'>Company Age</label>
                    <input className='border-2 px-1 rounded-md shadow-md' required {...register('age', { valueAsNumber: true })} type='number' />
                    <p className='text-small text-red-500'>{errors.age?.message?.slice(0, 35)}..</p>


                    <label className='flex justify-start mx-1 text-small'>Organisation Phase</label>
                    <select
                        typeof='string'
                        {...register('phase')}
                        disabled={loading}
                    >
                        {phase.map((option) => (
                            <option value={option.value} key={option.value}>{option.label}</option>
                        ))}
                    </select>


                    <label className='flex justify-start mx-1 text-small'>Organisation type</label>
                    <select
                        typeof='string'
                        {...register('value')}
                        disabled={loading}
                    >
                        {options.map((option) => (
                            <option value={option.value} key={option.value}>{option.label}</option>
                        ))}
                    </select>



                    <button className='border' type='submit' >Create</button>
                </div>
            </form>

        </div>
    )
}

export default Orgset