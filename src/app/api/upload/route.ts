import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
 try {
 const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Security: Validate file size (5MB limit)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File exceeds 5MB limit" }, { status: 413 });
    }

    // Security: Validate MIME types
    const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only PDF, JPEG, PNG, and WEBP are allowed." }, { status: 415 });
    }

 const bytes = await file.arrayBuffer();
 const buffer = Buffer.from(bytes);

 // Upload to Cloudinary using a stream
 const uploadResult = await new Promise((resolve, reject) => {
 const uploadStream = cloudinary.uploader.upload_stream(
 { folder: "ascendid_proofs" },
 (error, result) => {
 if (error) reject(error);
 else resolve(result);
 }
 );
 
 uploadStream.end(buffer);
 });

 return NextResponse.json({ 
 success: true, 
 url: (uploadResult as any).secure_url 
 });
 } catch (error) {
 console.error("Cloudinary upload error:", error);
 return NextResponse.json({ error: "Upload failed" }, { status: 500 });
 }
}
