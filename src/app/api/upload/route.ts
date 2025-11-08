    import { NextResponse } from 'next/server';
    import { writeFile } from 'fs/promises';
    import { mkdir } from 'fs/promises';
    import path from 'path';

    export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const uploadDir = path.join(process.cwd(), 'uploads');
        await mkdir(uploadDir, { recursive: true });

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(uploadDir, file.name);
        
        await writeFile(filePath, buffer);
        
        return NextResponse.json({ 
        message: 'File uploaded successfully',
        fileName: file.name 
        });
    } catch (error) {
        return NextResponse.json(
        { error: 'Error uploading file' },
        { status: 500 }
        );
    }
    }
