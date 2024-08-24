import Image from 'next/image';
import React from 'react'

const EarningSide = () => {

    return (
        <div className="p-6">
            <div className="flex items-center mb-6">

                <h1 className="text-2xl font-semibold">Earnings</h1>
            </div>

            <div className="flex flex-col items-center">
               
                   <Image src='/assets/Account/earn.png' height={200} width={200} alt='logo' />
               
                <p className="text-center text-sm font-semibold">Earnings Not Available</p>
            </div>


            </div>
            );
}

            export default EarningSide