import getCurrentOwner from '@/app/action/getCurrentOwner';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';


export async function GET ( ) {
    
    try { 

        const owner = await getCurrentOwner()
        if (!owner) { 
            return new NextResponse('Unauthorized')
            
        }

        const tasks = await prisma.tasks.findMany({
            where: { 
                userId: owner?.id as string
            }
            
        })
        if(!tasks) { 
            return null
        }
        return NextResponse.json({tasks}, { status: 200})

    }
catch(error) { 
    return NextResponse.json({error}, {status: 500})
}
}

export async function POST  (req: Request ) { 

    try { 
        const owner = await getCurrentOwner( );
        if ( !owner ) { 
            return new NextResponse('ERROR')
            
        }

        const body = await req.json()
        const { userId,title, description } = body
        
        //check if the task is already exist 
        const chcktask = await prisma.tasks.findUnique({
            where : { 
                title,
                description,
                
            }
        })
        if(chcktask?.title || chcktask?.description) { 
            return NextResponse.error()
        }

        const newTask = await prisma.tasks.create({
            data: { 
userId : owner.id as string,
title,
description,


            }
        })
        return NextResponse.json((newTask), {status: 200})
    }
catch( error ) { 
    return NextResponse.json({error}, {status: 500})
}
}

export async function DELETE ( ) { 

    try { 

        const owner = await getCurrentOwner()
        if(!owner) { 
            return NextResponse.error()
        }

        // check for the owner of the task 

        const ownerTask = await prisma.tasks.findFirst({
            where: { 
                userId:  owner.id as string 
            }
        })

        if (!ownerTask) { 
return NextResponse.error()
        }

        const deleteTask = await prisma.tasks.delete({
            where: { 
                id: ownerTask.id
            }
        })

        return NextResponse.json({deleteTask} , { status: 200})
        

    }catch(error){ 
        return NextResponse.error()
    }
}