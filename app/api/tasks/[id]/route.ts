import getCurrentOwner from "../../../action/getCurrentOwner"
import prisma from '../../../libs/prismadb'
import { NextResponse } from 'next/server';

export async function DELETE (req: Request, {params}: {params: {id:string}}) { 

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

        const { id } = params

        const deleteTask = await prisma.tasks.delete({
            where: { 
                id
            }
        })

        return NextResponse.json({deleteTask} , { status: 200})
        

    }catch(error){ 
        return NextResponse.error()
    }
}

export async function PUT ( req: Request, {params} : { params: {id:string}}){
    try{ 
        const owner = await getCurrentOwner()
        if(!owner) {
            return new NextResponse('ERROR')
        }

        const body = await req.json()
        const {  isCompleted } =  body

        const updateTask = await prisma.tasks.update({
            where:{
                id: params.id
            }
            ,data:{
                
                isCompleted
            }
        })

return NextResponse.json({updateTask}, { status: 200})

    }
    catch(error){ 
        return new NextResponse('ERROR', { status: 400})
    }
}
