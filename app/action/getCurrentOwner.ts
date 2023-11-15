import prisma from '@/app/libs/prismadb';
import getSession from './getSession';

const  getCurrentOwner = async () => { 


    try{ 

        const session = await getSession();

        if(!session?.user?.email){ 
            return null;
        }

        const currentOwner  = await prisma.user.findUnique({
            where: { 
                email: session.user.email as string 
            }
        });

        if (!currentOwner) { 
            return null 
        }

        return currentOwner
    } catch(error) {
return null
    }

}

export default getCurrentOwner