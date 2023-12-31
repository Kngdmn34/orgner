'use client'

import React, { useState, useTransition, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiLoader5Fill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import { MdOutlineDone, MdDeleteOutline } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';

import { useSWRConfig } from "swr";

interface TaskItemProps {
    id: string
    title: string;
    description?: string
    isCompleted: boolean
    isChecked: boolean

}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, description, isCompleted, isChecked }) => {

    const [vdescription, setVdescription] = useState(false)
    const { mutate } = useSWRConfig()

    const ToggleDes = () => {
        if (vdescription == true) {
            setVdescription(false)
        }
        if (vdescription == false) {
            setVdescription(true)
        }

    }




    const deleteTask = async (id: string) => {
        try {
            const response = await axios.delete(`/api/tasks/${id}`)
            toast.success('Task Deleted')
            return response.data
        }
        catch (error) {
            console.log(error)
        }
        finally {
            mutate('/api/tasks')
        }
    }

    const taskUpdate = async (id: string) => {
        try {
            const response = await axios.put(`/api/tasks/${id}`, { isCompleted: !isCompleted })
            toast.success('Task Completed')

            return response.data



        }

        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className={` mx-auto overflow-hidden w-[96%] ${vdescription ? `border-l-2 border-r-2 border-t-2 shadow-none` : `border-2  shadow-md`} ${isCompleted == true ? `bg-green-800` : ``}  p-1 rounded-lg`}>
                <span className='flex z-10  w-full items-center justify-between '>
                    <label htmlFor={id}>{title}</label>
                    <span className='flex flex-row items-center space-x-5'>

                        <button className='z-20' onClick={() => deleteTask(id)}
                        ><MdDeleteOutline /></button>







                        <button className='flex z-20 ease-in delay-500' onClick={() => ToggleDes()}>
                            {vdescription == true ? <IoIosArrowUp className=' ease-in text-orange-700 drop-shadow-sm' /> : <IoIosArrowDown className='text-orange-700 drop-shadow-sm' />}

                        </button>
                    </span>
                </span>


            </div>
            <div className={` mx-auto ${vdescription ? ` translate-y-0  border-b-2 border-r-2 border-l-2 p-1 rounded-lg    ` : ` -translate-y-6 `}  z-0 ease-in-out  duration-400  w-[96%]  `}>
                <p className={`block  ${vdescription ? `visible translate-y-0  ease-in-out delay-300 duration-400` : `opacity-0 -translate-y-5`}    `}>

                    {description?.slice(0, 100)}
                </p>
            </div>
        </>
    )
}

export default TaskItem