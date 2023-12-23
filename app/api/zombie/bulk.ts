import nextConnect from 'next-connect';
import multer from 'multer';
import { createReadStream } from 'fs';
import { parse } from 'papaparse';
import prisma from '@/app/libs/prismadb';
import getCurrentOwner from '@/app/action/getCurrentOwner';
import { NextResponse } from 'next/server';

// Create a custom type for Multer request
interface MulterRequest extends Request {
  file: Express.Multer.File;
}

const upload = multer({ dest: 'uploads/' });

const handler = nextConnect();

handler.use(upload.single('file'));

handler.post(async (req: MulterRequest, res) => {
  try {
    const owner = await getCurrentOwner();
    if (!owner) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const file = req.file;

    if (!file) {
      return new NextResponse('No file provided', { status: 400 });
    }

    const stream = createReadStream(file.path);

    const parseOptions = {
      header: true,
      skipEmptyLines: true,
      complete: async (results: any) => {
        const zombiesData = results.data;

        for (const zombie of zombiesData) {
          await prisma.zombie.create({
            data: {
              userId: owner.id as string,
              position: zombie.position,
              name: zombie.name,
            },
          });
        }

        return new NextResponse('Zombies added successfully', { status: 201 });
      },
    };

    await new Promise((resolve) => parse(stream, { ...parseOptions, complete: resolve }));
  } catch (error) {
    console.error('Bulk Upload Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
});

export default handler;
