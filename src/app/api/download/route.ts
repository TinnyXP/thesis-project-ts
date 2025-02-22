import { NextResponse } from 'next/server';

const ALLOWED_DOMAINS = ['cdn.sanity.io'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// ตรวจสอบว่า URL มาจาก domain ที่อนุญาต
function isValidUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return ALLOWED_DOMAINS.includes(parsedUrl.hostname);
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get('url');
  const fileName = searchParams.get('filename');

  // ตรวจสอบ URL
  if (!fileUrl || !isValidUrl(fileUrl)) {
    return new NextResponse('ลิงก์ไม่ถูกต้องหรือไม่ได้รับอนุญาต', { status: 403 });
  }

  try {
    // ดาวน์โหลดไฟล์
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error('ไม่สามารถดาวน์โหลดไฟล์ได้');

    // ตรวจสอบประเภทไฟล์
    const contentType = response.headers.get('content-type');
    if (!contentType || !ALLOWED_TYPES.includes(contentType)) {
      throw new Error('ประเภทไฟล์ไม่ถูกต้อง');
    }

    // ตรวจสอบขนาดไฟล์
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_FILE_SIZE) {
      throw new Error('ขนาดไฟล์ใหญ่เกินไป');
    }

    // สร้าง response สำหรับดาวน์โหลด
    const blob = await response.blob();
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Content-Disposition', `attachment; filename="${fileName || 'image.jpg'}"`);
    
    return new NextResponse(blob, { headers, status: 200 });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดาวน์โหลด:', error);
    const message = error instanceof Error ? error.message : 'ข้อผิดพลาดที่ไม่ทราบสาเหตุ';
    return new NextResponse(message, { status: 500 });
  }
}