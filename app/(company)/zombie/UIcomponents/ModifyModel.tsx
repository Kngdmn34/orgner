'use client'

import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, DropdownItem, Input, Link } from "@nextui-org/react";
import { FieldValues, useForm, SubmitHandler, set } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from 'axios'
import toast from 'react-hot-toast';


const schema = yup
    .object({

        name: yup.string().min(4).max(30).required(),
        position: yup.string().min(4).max(30).required(),
        status: yup.string().min(2).max(30).required()
    })
    .required()

type FormData = {

    name: string;
    position: string;

};


interface ModifyModelProps {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
    zombieId: string
}

export const ModifyModalApp: React.FC<ModifyModelProps> = ({
    isOpen,
    onOpen,
    onOpenChange,
    zombieId
}) => {

    const [isMounted, setIsMounted] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    })
    useEffect(() => {
        if (zombieId) {
            axios.get(`/api/zombie/${zombieId}`)
                .then((res) => {
                    const zombieData = res.data;
                    setValue("name", zombieData.name)
                    setValue("position", zombieData.position)
                    setValue("status", zombieData.status)

                }).catch((error) => console.log('Error', error))
        }
    })
    useEffect(() => {
        setIsMounted(true);

    }, [isMounted]);

    if (!isMounted) {
        return null;
    }

    const OnSubmit: SubmitHandler<FormData> = async (FormData) => {

        try {
            axios.patch(`/api/zombie/${zombieId}`,)
                .then((res) => {

                    console.log(res.data)
                    toast.success(' Employee Modefied')
                })
                .catch((error) => {
                    toast.error('Something went wrong', error)
                })


        } catch (error) {
            console.log('Zombied PATCH AXIOS ERROR', error)
        }

    }

    return (
        <>
            <Button variant="ghost" size="sm" className="w-full text-left" onPress={onOpen}>Edit</Button>
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
                                        <label className="flex text-small text-left justify-start">Name</label>
                                        <input className="px-3 py-1 border shadow-sm" {...register('name')} type='text' placeholder='Full Name' required />
                                        <p>{errors.name?.message}</p>
                                        <label className="flex text-small text-left justify-start">Position</label>
                                        <input className="px-3 py-1 border shadow-sm" {...register('position')} type='text' placeholder='Role' required />
                                        <p>{errors.position?.message}</p>
                                        <label className="flex text-small text-left justify-start">Status</label>
                                        <input className="px-3 py-1 border shadow-sm" {...register('status')} type='text' placeholder='Current Status' required />
                                        <p>{errors.status?.message}</p>

                                    </span>


                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" size="sm" variant="flat" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button type="submit" size="sm" variant='flat' onPress={onClose}>
                                        Update
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
export default ModifyModalApp