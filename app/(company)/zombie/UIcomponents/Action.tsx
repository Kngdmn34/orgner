
import React, { useState } from 'react'
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, useDisclosure } from "@nextui-org/react";

import axios from 'axios';
import toast from 'react-hot-toast';
import ModifyModalApp from './ModifyModel';




const Action = () => {

    const { isOpen, onOpenChange, onOpen } = useDisclosure()



    const deleteUser = async () => {
        try {
            const res = await axios.delete(`/api/zombie`);

            toast.success('Deleted successfully');
            console.log(res.data);
        } catch (e) {
            // Handle errors, show a toast or update UI state
            toast.error('Failed to delete zombie');
            console.log('Something went wrong', e);
        }
    }

    return (

        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant='light'
                    size='sm'
                >
                    ...
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Action event example"

            >
                <DropdownItem  >
                    <ModifyModalApp onOpen={onOpen} isOpen={isOpen} onOpenChange={onOpenChange} />
                </DropdownItem>

                <DropdownItem onAction={() => deleteUser()} key="delete" className="text-danger text-center" color="danger">
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default Action