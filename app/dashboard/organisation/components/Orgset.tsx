'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { FieldValues, SubmitHandler, useController, NestedValue, useForm, FieldName } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Input from '../UIcomponents/Input';
import Select from 'react-select'
import toast from 'react-hot-toast';
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation';
import { LuLoader2 } from "react-icons/lu";


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

const countries = [
    {
        label: 'Morocco',
        value: 'morocco'
    },
    {
        label: 'French',
        value: 'french'
    },
    {
        label: 'UAE',
        value: 'uae'
    },
    {
        label: 'United Kingdom',
        value: 'uk'
    }

]


const schema = yup
    .object({
        employees: yup.number().required().integer().positive().max(500),
        organisationName: yup.string().strict().min(4).max(20).required().lowercase().matches(/^[a-z]+$/, 'Only Text Required'),
        value: yup.string().required(),
        phase: yup.string().required(),
        country: yup.string().required(),
        age: yup.date().required(),

    })
    .required()

type FormData = yup.InferType<typeof schema>;

const steps = [
    { id: 'Step 1', name: 'Create', fields: ['organisationName', 'employees', 'value'] },
    { id: 'Step 2', name: 'Details', fields: ['phase', 'age'] },
    { id: 'Step 3', name: 'Complete', fields: 'completed' }
]

const Orgset = () => {

    const [previousStep, setPreviousStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const [loading, setLoading] = useState(false)
    const delta = currentStep - previousStep

    type FieldName = keyof FormData

    const next = async () => {

        const fields = steps[currentStep].fields
        const output = await trigger(fields as FieldName[], { shouldFocus: true })

        if (!output) return



        if (currentStep < steps.length - 1) {
            if (currentStep === steps.length - 2) {
                await handleSubmit(onSubmit)()
                console.log(onSubmit)
            }
            setPreviousStep(currentStep)
            setCurrentStep(step => step + 1)
        }
    }

    const prev = () => {
        if (currentStep > 0) {
            setPreviousStep(currentStep)
            setCurrentStep(step => step - 1)
        }
    }



    const router = useRouter()




    const { register, trigger, watch, reset, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })




    const onSubmit: SubmitHandler<FormData> = (data) => {

        setLoading(true)
        try {

            axios.post('/api/organisation', data)
                .then((response) => {
                    console.log(response)
                    toast.success('Organisation created')
                    router.push('/organisation')
                })
                .catch((error) => {
                    console.log(error, 'AXIOS POST ERROR')
                })
                .finally(() => setLoading(false))

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
        finally {
            setLoading(false)
        }

    };



    return (
        <section>
            <nav aria-label='progress' className='absolute inset-0 top-10 '>
                <ol role='list' className='w-1/2 mx-auto flex flex-row justify-center items-center space-x-8 '>
                    {steps.map((step, index) => (
                        <li key={step.name} className='md:flex-1'>
                            {currentStep > index ? (
                                <div className='group flex w-full flex-col border-l-4 border-green-700 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                    <span className='text-sm font-medium text-green-600 transition-colors '>
                                        {step.id}
                                    </span>
                                    <span className='text-sm font-medium'>{step.name}</span>
                                </div>
                            ) : currentStep === index ? (
                                <div
                                    className='flex w-full flex-col border-l-4 border-amber-400 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                                    aria-current='step'
                                >
                                    <span className='text-sm font-medium text-amber-500'>
                                        {step.id}
                                    </span>
                                    <span className='text-sm font-medium'>{step.name}</span>
                                </div>
                            ) : (
                                <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                    <span className='text-sm font-medium text-gray-500 transition-colors'>
                                        {step.id}
                                    </span>
                                    <span className='text-sm font-medium'>{step.name}</span>
                                </div>
                            )}
                        </li>
                    ))}

                </ol>

            </nav>
            {/* Form */}
            <form className='mt-6 py-12' onSubmit={handleSubmit(onSubmit)}>
                {currentStep === 0 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <h2 className='text-base font-semibold leading-7'>
                            Company Information
                        </h2>
                        <p className='mt-1 text-sm leading-6 '>
                            Provide your personal details.
                        </p>
                        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                            <div className='sm:col-span-3'>
                                <label
                                    htmlFor='organisationName'
                                    className='block text-sm font-medium leading-6 '
                                >
                                    Company Name
                                </label>
                                <div className='mt-2'>
                                    <input
                                        type='text'
                                        id='firstName'
                                        {...register('organisationName')}
                                        autoComplete='given-name'
                                        className='block w-full rounded-md border-0 py-1.5 px-3  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                    />
                                    {errors.organisationName?.message && (
                                        <p className='mt-2 text-sm text-red-400'>
                                            {errors.organisationName.message.slice(0, 50)}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className='sm:col-span-3'>
                                <label
                                    htmlFor='employees'
                                    className='block text-sm font-medium leading-6 '
                                >
                                    Employees
                                </label>
                                <div className='mt-2'>
                                    <input
                                        type='text'
                                        id='employees'
                                        {...register('employees', { valueAsNumber: true })}
                                        autoComplete='family-name'
                                        className='block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                    />
                                    {errors.employees?.message && (
                                        <p className='mt-2 text-sm text-red-400'>
                                            {errors.employees.message.slice(0, 29)}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <label className='block text-sm font-medium leading-6 '>Organisation type</label>
                            <select
                                typeof='string'
                                {...register('value')}
                                disabled={loading}
                                className='border shadow-md  p-1 rounded-md'
                            >
                                {options.map((option) => (
                                    <option className='p-1 ' value={option.value} key={option.value}>{option.label}</option>
                                ))}
                            </select>

                        </div>
                    </motion.div>
                )}

                {currentStep === 1 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <h2 className='text-base font-semibold leading-7 text-gray-900'>
                            Basic Details
                        </h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600'>
                            Basic details helps IA to analyse your company health condition
                        </p>



                        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                            <div className='sm:col-span-3'>
                                <label
                                    htmlFor='phase'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                    Country
                                </label>
                                <div className='mt-2'>
                                    <select
                                        typeof='string'
                                        {...register('country')}
                                        disabled={loading}
                                        className='border p-1'
                                    >
                                        {countries.map((option) => (
                                            <option value={option.value} key={option.value}>{option.label}</option>
                                        ))}
                                    </select>

                                    {errors.country?.message && (
                                        <p className='mt-2 text-sm text-red-400'>
                                            {errors.country.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className='sm:col-span-3'>
                                <label
                                    htmlFor='phase'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                    Company Phase
                                </label>
                                <div className='mt-2'>
                                    <select
                                        typeof='string'
                                        {...register('phase')}
                                        disabled={loading}
                                        className='border p-1'
                                    >
                                        {phase.map((option) => (
                                            <option value={option.value} key={option.value}>{option.label}</option>
                                        ))}
                                    </select>

                                    {errors.phase?.message && (
                                        <p className='mt-2 text-sm text-red-400'>
                                            {errors.phase.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className='col-span-full'>
                                <label
                                    htmlFor='age'
                                    className='block text-sm font-medium leading-6 '
                                >
                                    Company Start Date
                                </label>
                                <div className='mt-2'>
                                    <input
                                        type='date'
                                        id='age'
                                        {...register('age')}
                                        autoComplete='street-address'
                                        className='block px-3 w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                    />
                                    {errors.age?.message && (
                                        <p className='mt-2 text-sm text-red-400'>
                                            {errors.age.message}
                                        </p>
                                    )}
                                </div>
                            </div>


                        </div>
                    </motion.div>
                )}

                {currentStep === 2 && (
                    <>
                        <h2 className='text-base font-semibold leading-7'>
                            Creating ... {loading && <LuLoader2 size='40' />}
                        </h2>

                    </>

                )}

            </form>

            <div className='mt-8 pt-5'>
                <div className='flex justify-between'>
                    <button
                        type='button'
                        onClick={prev}
                        disabled={currentStep === 0}
                        className='rounded z-10 bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset  hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='h-6 w-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15.75 19.5L8.25 12l7.5-7.5'
                            />
                        </svg>
                    </button>
                    <button
                        type='button'
                        onClick={next}
                        disabled={currentStep === steps.length - 1 || loading}
                        className='rounded bg-white px-2 py-1 z-10 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset  hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='h-6 w-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M8.25 4.5l7.5 7.5-7.5 7.5'
                            />
                        </svg>
                    </button>
                </div>
            </div>

        </section >
    )
}

export default Orgset