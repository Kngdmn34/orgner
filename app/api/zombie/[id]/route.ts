import getCurrentOwner from "../../../action/getCurrentOwner"
import prisma from '../../../libs/prismadb'
import { NextResponse } from 'next/server';

export async function DELETE (req: Request, {params}: {params: {id:string}}) { 

    try { 
    const owner = await getCurrentOwner()
    if (!owner) {
        return new NextResponse('ERROR')
    }

    const zombie = await prisma.zombie.findFirst({
        where: {
          userId: owner.id as string,
        },
      });
  
      if (!zombie) {
        // No zombie found for the current owner
        return new NextResponse('Zombie not found', { status: 404 });
      }

      const {id} = params

    const deleteZombie = await prisma.zombie.delete({
        where: { 
            id
           
        }
    })

    return NextResponse.json({deleteZombie}, {status: 201})

}catch(error) { 
    return NextResponse.json({error}, {status: 500})
}

}
