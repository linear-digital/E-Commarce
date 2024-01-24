import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import fs from "fs";
import cors from "cors";
import NextCors from "nextjs-cors";



export const runtime = 'nodejs'
export const preferredRegion = 'auto'


export const POST = async (req, res) => {
   
    const formData = await req.formData();
    const files = formData.getAll("products");

    // Check if any files are received
    if (files.length === 0) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    try {
        const code = req.headers.get('code');
        const baseDirectory = path.resolve(process.cwd(), `public/images/products/${code}`);
        await fs.promises.mkdir(baseDirectory, { recursive: true });

        // Loop through each file and save it
        const savedFiles = await Promise.all(
            files.map(async (file) => {
                const buffer = Buffer.from(await file.arrayBuffer());
                const filename = file.name.replace(/ /g, "_");
                const filePath = path.join(baseDirectory, filename);

                await writeFile(filePath, buffer);
                return { filename, image: `/images/products/${code}/${filename}`, fileSize: file.size, video: file.type.includes('video') };
            })
        );

        return NextResponse.json({ Message: "Success", images: savedFiles, status: 201 });
    } catch (error) {
        console.log("Error occurred ", error);
        return NextResponse.json({ Message: "Failed", status: 500 });
    }
    // return NextResponse.json({ message: 'Hello NextJs Cors!' });
};

