'use client'
import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, DropdownItem, Input, Link } from "@nextui-org/react";
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from 'axios'
import toast from 'react-hot-toast';

interface ModelTaskProps {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void
}


const schema = yup
    .object({
        title: yup.string().min(4).max(30).required(),
        description: yup.string().min(4).max(100),


    })
    .required()

type FormData = {
    title: string
    description?: string;


}

const Model: React.FC<ModelTaskProps> = ({ isOpen, onOpen, onOpenChange }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    }
    )
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    const OnSubmit: SubmitHandler<FormData> = (data) => {
        try {
            axios.post('/api/tasks', data)
                .then((res) => {
                    if (res.data && res.data.tasks) {
                        console.log(res)
                        toast.success('TASK ADDED')

                    }
                })
                .catch((error) => {
                    toast.error('SOMETHING WENT WRONG')
                    console.log(error, 'AXIOS POST ERROR')
                })
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>
            <Button variant="ghost" size="sm" className=" text-left" onPress={onOpen}>+</Button>
            <Modal

                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                backdrop="blur"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Edit Worker Informations</ModalHeader>
                            <form onSubmit={handleSubmit(OnSubmit)}>
                                <ModalBody>

                                    <span className='flex flex-col justify-center items-center space-y-3'>
                                        <label className="flex text-small text-left justify-start">Title</label>
                                        <input className="px-3 py-1 border shadow-sm" {...register('title')} type='text' placeholder='Full Name' required />
                                        <p>{errors.title?.message}</p>
                                        <label className="flex text-small text-left justify-start">Description</label>
                                        <input className="px-3 py-1 border shadow-sm" {...register('description')} type='text' placeholder='Description' />
                                        <p>{errors.description?.message}</p>



                                    </span>


                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" size="sm" variant="flat" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button type="submit" size="sm" variant='flat' onPress={onClose}>
                                        Create
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default Model