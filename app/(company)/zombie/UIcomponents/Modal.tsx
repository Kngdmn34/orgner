'use client'
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Link } from "@nextui-org/react";
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from 'axios'
import toast from 'react-hot-toast';
import { IoMdAdd } from 'react-icons/io'

const schema = yup
    .object({
        name: yup.string().min(4).max(30).required(),
        position: yup.string().min(4).max(30).required()
    })
    .required()

type FormData = {
    name: string;
    position: string;
};
interface ModalProps {

    id: string
    name: string;
    position: string
}

export default function ModalApp() {
    const [loading, setLoading] = useState(false)


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const { isOpen, onOpen, onOpenChange } = useDisclosure();



    const OnSubmit: SubmitHandler<FormData> = (data) => {
        setLoading(true)
        try {
            axios.post('/api/zombie', data)
                .then((res) => {

                    console.log(res)
                    toast.success('New Employee Added')
                })
                .catch((error) => {
                    toast.error('Something went wrong', error)
                })
                .finally(() => setLoading(false))
        } catch (error) {
            console.log('Zombied POST AXIOS ERROR', error)
        }

    }

    return (
        <>
            <Button onPress={onOpen} size="sm" variant="ghost" className="w-full shadow-sm"> Add One </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                backdrop="blur"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add Worker</ModalHeader>
                            <form onSubmit={handleSubmit(OnSubmit)}>
                                <ModalBody>

                                    <span className='flex flex-col justify-center items-center space-y-3'>
                                        <label className="flex text-small text-left justify-start">Name</label>
                                        <input className="px-3 py-1 border shadow-sm" {...register('name')} type='text' placeholder='Full Name' required />
                                        <p>{errors.name?.message}</p>
                                        <label className="flex text-small text-left justify-start">Position</label>
                                        <input className="px-3 py-1 border shadow-sm" {...register('position')} type='text' placeholder='Role' required />
                                        <p>{errors.position?.message}</p>



                                    </span>


                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" size="sm" variant="flat" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button type="submit" size="sm" variant='flat' onPress={onClose}>
                                        Add
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
