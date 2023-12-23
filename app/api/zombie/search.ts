import prisma from '@/app/libs/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

import { NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextApiRequest, res: NextApiResponse ) { 
    try { 
        const {query} = req.query;

        if(!query) { 
            return res.status(400).json({ message: 'Query parameter is required' });
        }

const zombies = await prisma.zombie.findMany( { 
    where: { 
        name: {
            contains: query.toString(),
        }
    }
})
return res.status(200).json({ zombies });
    }

    catch(error) { 

    }
}