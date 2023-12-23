import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn } from "@nextui-org/react";
import { FaUserPlus } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import Cvs from "./Cvs";
import ModalApp from "./Modal";


export default function AddDropDown() {


    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="bordered"
                >
                    Add Employee
                </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                <DropdownItem
                    key="new"

                    startContent={<FaUserPlus />}
                >
                    <ModalApp />
                </DropdownItem>
                <DropdownItem
                    key="copy"

                    startContent={<FaUsers />}
                >
                    <Cvs />
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
