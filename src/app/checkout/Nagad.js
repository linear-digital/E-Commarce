
import React from 'react';
import toast from 'react-hot-toast';

const Bkash = () => {
    const number = '01824692955';
    const copyNumber = async () => {
        await navigator.clipboard.writeText(number);
        toast.success("Copied")
    }
    return (
        <div className='text-stone-900 p-2 mt-2'>
            <h1 className='text-primary font-semibold underline'>Nagad personal</h1>
            <h2
                className='mt-2'
                onClick={copyNumber}>
                Account: <mark>{number}</mark>
            </h2>
        </div>
    );
};

export default Bkash;