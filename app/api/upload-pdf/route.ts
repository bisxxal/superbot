import { NextRequest, NextResponse } from 'next/server';
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

export async function POST(req: NextRequest) {
    try {
    const formData = await req.formData();
    const file = formData.get('pdfFile') as File;

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    const uploadResponse = await imagekit.upload({
        file: fileBuffer,
        fileName: file.name,
        folder: '/pdfs',
    });

    return NextResponse.json({ success: true, url: uploadResponse.url });
    } catch (error) {
    return NextResponse.json({ error: 'Failed to upload PDF.' }, { status: 500 });
    }
}