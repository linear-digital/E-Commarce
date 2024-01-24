import Image from 'next/image';
import React from 'react';
import toast from 'react-hot-toast';

const Bkash = () => {
    const number = '01824692955';
    const copyNumber = async () => {
        await navigator.clipboard.writeText(number);
        toast.success("Copied")
    }
    return (
        <div className='text-stone-900 p-2 mt-2 flex flex-col items-start'>
            <h2 className='text-primary font-semibold underline'>Bkash personal</h2>
            <h2
                className='mt-2'
                onClick={copyNumber}>
                Account: <mark>{number}</mark>
            </h2>
            <Image 
            className=' mt-2'
            src={'/images/qr-bkash.png'} width={150} height={150} alt={""}/>
        </div>
    );
};

export default Bkash;