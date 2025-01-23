import React from 'react';
export default function SuspendedPage() {
    return (
        <div className='flex flex-col gap-2 justify-center items-center h-screen'>
            <p className='text-red-500 text-2xl font-bold'>
                บัญชีของคุณถูกระงับการใช้งาน
            </p>
            <p>กรุณาติดต่อผู้ดูแลระบบเพื่อขอข้อมูลเพิ่มเติม</p>
        </div>
    )
}

