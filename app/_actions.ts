'use server'

import createZombie from '@/app/action/createZombie';
import { revalidatePath } from 'next/cache';
type MyFormData = {
    name: string;
    position: string;
};

export async function createZombieAction ( data: MyFormData) { 
    await createZombie(data)
    revalidatePath('/zombie')

}