'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, useDisclosure } from "@nextui-org/react";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'


//icons
import { VscAdd } from "react-icons/vsc";
import { AiOutlineLeft } from 'react-icons/ai'
import { PiWarningCircleBold } from 'react-icons/pi'
import getTasks from '@/app/action/getTasks';
import axios from 'axios';
import toast from 'react-hot-toast';
import Model from './UIcomponents/Model';
import TaskItem from './UIcomponents/TaskItem';


type Task = {
    id: string
    title: string;
    description?: string;
    isCompeted?: boolean


}



const TaskPage = () => {

    const [tasks, setTasks] = useState<Task[] | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tasksData = await getTasks();
                setTasks(tasksData);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchData();
    }, []);


    const { isOpen, onOpenChange, onOpen } = useDisclosure()

    return (


        <main className='flex flex-col border-2 w-full m-6 rounded-lg shadow-xl dark:shadow-orange-800'>
            <div className='flex pt-5 flex-row items-center space-x-3' >
                <Link href={'/organisation'} className='p-4'><AiOutlineLeft size={20} /></Link>
                <h1 className='p-4 border-l tracking-widest drop-shadow-sm'>TASKS</h1>

            </div>


            {tasks?.length === 0 ?
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
                        <span className='flex border-2 p-1 rounded-lg text-sm '>In Progress: {tasks?.filter((task) => (!task.isCompeted)).length}</span>
                        <Model isOpen={isOpen} onOpenChange={onOpenChange} onOpen={onOpen} />
                    </span>
                    <hr className='w-72 mx-auto' />

                    <ul className='w-full mt-16'>
                        {tasks?.map((task) => (
                            <li key={task.id}><TaskItem id={task.id} title={task.title} description={task.description} isCompleted={task.isCompeted} /> </li>
                        ))}
                    </ul>
                </div>
            }
        </main>
    )
}

export default TaskPage