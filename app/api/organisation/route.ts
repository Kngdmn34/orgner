import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/app/libs/prismadb';
import getCurrentOwner from '@/app/action/getCurrentOwner';



export async function GET () { 
  try { 

    const owner = await getCurrentOwner()

    if ( !owner?.id || !owner?.email  ) { 
return new NextResponse('Unauthorized')

    }

    //fetch for the organisation

    const organisation = await prisma.organisation.findFirst({
      where: { 
        userId: owner.id as string ,
        
      }
    })
    if (!organisation) { 
      return NextResponse.error()
    }

    return  NextResponse.json({organisation}, {status: 201})

  }
  catch( error) { 
console.log('Error get Org', error)
  }
}


export async function POST(req: Request) {
  try {
    const owner = await getCurrentOwner();
    const body = await req.json();
    const { userId,age,phase, employees, organisationName,value } = body;

    if (!owner?.id || !owner?.email) {
      return new NextResponse('Unauthorized', { status: 400 });
    }

    

    // Check if an organization with the given userId already exists
    const existingOrganisations = await prisma.organisation.findMany({
        where: {
            userId: 
               owner.id ,
           
          },
        });
    if (existingOrganisations.length > 0) {
      return new NextResponse('Organization already exists', { status: 400 });
    }

    // Create a new organization
    const newOrganisation = await prisma.organisation.create({
      data: {
        organisationName,
        employees,
        value,
        age,
        phase,
      userId: owner.id,
      },
      include: {
        user: true,
      },
    });

    return  NextResponse.json(newOrganisation);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
