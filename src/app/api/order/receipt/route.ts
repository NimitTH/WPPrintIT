import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { orderId, items, total, user } = body;

        const fontPath = path.join(process.cwd(), 'public', 'font', 'Sarabun-Regular.ttf');
        
        const pdfStream = new PDFDocument({
            autoFirstPage: true,
            size: 'A4',
            font: fontPath 
        });
        
        if (fs.existsSync(fontPath)) {
            pdfStream.font(fontPath);
        } else {
            
            pdfStream.font('Courier');
        }

        const headers = new Headers();
        headers.set('Content-Type', 'application/pdf');
        headers.set('Content-Disposition', `attachment; filename=receipt-${orderId}.pdf`);

        pdfStream.text('WPPrintIT', { align: 'center', });
        pdfStream.text('ใบเสร็จ / Receipt', { align: 'center', });
        pdfStream.moveDown();

        pdfStream.text(`Order ID: ${orderId}`);
        pdfStream.text(`ผู้สั่งซื้อ: ${user.name}`);
        pdfStream.text(`อีเมล: ${user.email}`);
        pdfStream.text(`เบอร์โทรศัพท์: ${user.phone}`);
        pdfStream.text(`ที่อยู่: ${user.address}`);
        pdfStream.text(`วันที่: ${new Date().toLocaleDateString()}`, { align: 'right' });
        pdfStream.moveDown();

        pdfStream.text('รายการสินค้าที่สั่งซื้อ', { align: 'center', });

        const tableStartX = 50;
        const tableEndX = 550;

        const productNameColumn = 60;
        const priceColumn = 300;
        const quantityColumn = 470;
        let currentY = pdfStream.y;

        const lineHeight = 20;

        currentY += lineHeight;

        pdfStream.text('ชื่อสินค้า', productNameColumn, currentY);
        pdfStream.text('ราคา', priceColumn, currentY, { align: 'center'});
        pdfStream.text('จำนวน', quantityColumn, currentY, { align: 'right' });
        

        currentY += lineHeight;

        pdfStream.moveTo(tableStartX, currentY)
            .lineTo(tableEndX, currentY)
            .stroke();

        

        currentY += 5;

        items.forEach((item: any) => {
            pdfStream.text(item.productName, productNameColumn, currentY);
            pdfStream.text(`฿${item.price.toFixed(2)}`, 280, currentY, { align: 'center' });
            pdfStream.text(item.quantity.toString(), quantityColumn, currentY, { align: 'right' });
            pdfStream.moveDown();

            currentY += lineHeight;
        });

        currentY += lineHeight;

        
        pdfStream.text(
            `รวมทั้งหมด: ${new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(total)}`,
            priceColumn,
            currentY,
            { align: 'right', underline: true }
        );
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
