import Zombiespage from '@/app/(company)/zombie/page';
import getCurrentOwner from '@/app/action/getCurrentOwner';
import getOrganisation from '@/app/action/getOrganisation';
import prisma from '@/app/libs/prismadb'
import next from 'next';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import toast from 'react-hot-toast';

export const revalidate = 60
export async  function GET () { 
    
    try { 

        //check the owner

        const owner = await getCurrentOwner()
        if(!owner) { 
            return new NextResponse('Unauthorized')
        }

       //check the organisation 
       

        const zombies = await prisma.zombie.findMany({
            where: { 
                
userId: owner.id as string ,

            }
        })
        
       

        return NextResponse.json({zombies}, {status: 201} )

    }catch( error) { 
        return NextResponse.json({error}, {status: 500})
    }

}

export async function POST(req: Request) {
    try {
      const owner = await getCurrentOwner();
  
      if (!owner) {
        return new NextResponse('Unauthorized', { status: 401 });
      }
  
      const body = await req.json();
      const { userId, position, name } = body;
  
      if (!name || !position) {
        return new NextResponse('Name and position are required fields', { status: 400 });
      }
  
      // Check if already created
      const checkifFound = await prisma.zombie.findUnique({
        where: {
          name,
          position,
        },
      });
  
      if (checkifFound) {
        return new NextResponse('Zombie already exists', { status: 400 });
      }
  
      const newZombie = await prisma.zombie.create({
        data: {
          userId: owner.id as string,
          position,
          name,
        },
      });
  
      return NextResponse.json(newZombie, { status: 201 });
    } catch (error) {
      console.error('Zombie POST ERROR', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }
  

export async function PATCH (req: Request) {
    try {

        const body = await req.json();


        const {position, name , status  } = body 

        const owner = await getCurrentOwner();

        if ( !owner ) { 
            return NextResponse.error()
        }

        // check if the zombie is already exsit

        const zombie = await prisma.zombie.findFirst({
            where: {
              userId: owner.id as string,
            },
          });
      
          if (!zombie) {
            // No zombie found for the current owner
            return new NextResponse('Zombie not found', { status: 404 });
          }

        

        const updateZombie = await prisma.zombie.update({
            where: { 
                id: zombie.id
            },
            data: {
                name,
                position,
                status

            }

        })
        return (NextResponse.json(updateZombie))
    }
    catch (error)
     { 
        return NextResponse.json({ message: 'Internal Server Error' })
     }
}