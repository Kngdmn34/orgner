'use server'

import axios from 'axios'
import { revalidatePath } from 'next/cache';
import React from 'react';
import toast from 'react-hot-toast';
import prisma from '@/app/libs/prismadb'
import getCurrentOwner from './getCurrentOwner';


type MyFormData = {
    name: string;
    position: string;
};

 const createZombie =async (data: MyFormData) => {

   try{ 
    const owner = await getCurrentOwner()
    if(!owner){ 
        throw Error
    }
const zombie = await prisma.zombie.create({
    
    data: { 
        userId: owner.id as string,
        name: data.name,
        position: data.position
    }
})
return {zombie}
   }
catch(e) { 

}
}

export default createZombie
  
{/*try {
      await  axios.post('/api/zombie', data)
            .then((res) => {

                console.log(res)
                toast.success('New Employee Added')
                

            })
            
           
    } catch (error) {
        console.log('Zombied POST AXIOS ERROR', error)
    }
*/}

