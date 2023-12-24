'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, useDisclosure } from "@nextui-org/react";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useSWR from 'swr';

//icons
import { VscAdd } from "react-icons/vsc";
import { AiOutlineLeft } from 'react-icons/ai'
import { PiWarningCircleBold } from 'react-icons/pi'
import getTasks from '@/app/action/getTasks';
import axios, { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import Model from './UIcomponents/Model';
import TaskItem from './UIcomponents/TaskItem';
import SideBar from '@/app/components/SideBar';


type Task = {
    id: string
    title: string;
    description?: string;
    isCompeted: boolean


}

const fetcher = async () => {

    const respone: AxiosResponse<{ tasks: Task[] }> = await axios.get('/api/tasks')
    if (respone.data && respone.data.tasks) {
        return respone.data.tasks
    }
    return []

}



const TaskPage = () => {


    const [isChecked, setIsChecked] = useState(false)

    const { data, error } = useSWR('/api/tasks', fetcher)
    const { isOpen, onOpenChange, onOpen } = useDisclosure()
    const [navbar, setNavbar] = useState(false)


    return (

        <main className='flex'>
            <SideBar navbar={navbar} setNavbar={setNavbar} />

            <div className={`flex ${navbar ? `-translate-x-16 ` : `translate-x-0`} ease-in-out duration-300 flex-col border-2 border-neutral-700 w-full m-6 rounded-lg shadow-xl dark:shadow-orange-800`}>
                <div className='flex pt-5 flex-row items-center space-x-3' >
                    <Link href={'/organisation'} className='p-4'><AiOutlineLeft size={20} /></Link>
                    <h1 className='p-4 border-l tracking-widest drop-shadow-sm'>TASKS</h1>

                </div>


                {data?.length === 0 ?
                    <div className='flex justify-center items-center w-full mt-20'>
                        <span className='w-full flex flex-col space-y-5 justify-center items-center italic text-small dark:text-neutral-300 drop-shadow-sm '>
                            <PiWarningCircleBold size={30} className='text-orange-700 drop-shadow-md' />
                            <p className='block mx-5 drop-shadow-sm'>
                                Tasks are the building blocks of every project and help you visualize both the project work breakdown structure and timeline. After you create a task, there are a variety of details you can set and task actions you can perform
                            </p>
                            <Model isOpen={isOpen} onOpenChange={onOpenChange} onOpen={onOpen} />
                        </span>
                    </div>
                    :
                    <div className='w-full flex-col space-y-5 justify-center'>
                        <span className='flex flex-row justify-center mt-5 space-x-5 '>
                            <span className='flex border-2 p-1 rounded-lg text-sm '>In Progress: {data?.filter((task) => (!task.isCompeted)).length}</span>
                            <Model isOpen={isOpen} onOpenChange={onOpenChange} onOpen={onOpen} />
                        </span>
                        <hr className='w-72 mx-auto' />

                        <ul className='w-full mt-16'>
                            {data?.map((data) => (
                                <li key={data.id}>
                                    <TaskItem isChecked={isChecked} id={data.id} title={data.title} description={data.description} isCompleted={data.isCompeted} />
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
        </main>
    )
}

export default TaskPage