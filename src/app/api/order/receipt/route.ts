import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { orderId, items, total, user } = body;

        const fontPath = path.join(process.cwd(), 'public', 'font', 'Sarabun-Regular.ttf');
        // Create PDF with explicit font configuration
        const pdfStream = new PDFDocument({
            autoFirstPage: true,
            size: 'A4',
            font: fontPath // Prevent automatic font loading
        });
        // Load and use custom font only after PDF creation
        if (fs.existsSync(fontPath)) {
            pdfStream.font(fontPath);
        } else {
            // Fallback to built-in font if custom font not found
            pdfStream.font('Courier');
        }


        const headers = new Headers();
        headers.set('Content-Type', 'application/pdf');
        headers.set('Content-Disposition', `attachment; filename=receipt-${orderId}.pdf`);

        pdfStream.text('ใบเสร็จ / Receipt', { align: 'center' });
        pdfStream.moveDown();
        
        pdfStream.text(`Order ID: ${orderId}`);
        pdfStream.text(`Customer: ${user.name}`);
        pdfStream.text(`Email: ${user.email}`);
        pdfStream.moveDown();
        pdfStream.text('รายการสินค้า / Items:', { align: 'center' });
        items.forEach((item: any, index: number) => {
            pdfStream.text(`${index + 1}. ${item.productName} - ${item.quantity} x ฿${item.price}`, { align: 'left' });
        });
        pdfStream.moveDown();
        pdfStream.text(`รวมทั้งหมด / Total: ฿${total}`, { align: 'right' });
        pdfStream.end();

        const pdf = await new Promise<Buffer>((resolve, reject) => {
            const buffers: Buffer[] = [];
            pdfStream.on('data', (chunk) => buffers.push(chunk));
            pdfStream.on('end', () => resolve(Buffer.concat(buffers)));
            pdfStream.on('error', reject);
        });

        return new NextResponse(pdf, { headers });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return NextResponse.json({ error: 'An error occurred while generating PDF' }, { status: 500 });
    }
}
