import React, { useState } from 'react'

const VoucherSide = () => {
    const [selectedTab, setSelectedTab] = useState('collected');

    const tabs = [
        { name: 'Collected', id: 'collected' }
    ];

    return (
        <div className="p-6">
            <div className="flex items-center mb-6">

                <h1 className="text-2xl font-semibold">Voucher</h1>
            </div>

            <div className="flex space-x-2 mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`py-2 px-4 rounded-full font-semibold ${selectedTab === tab.id
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>
         <span className='font-semibold text-ms'>Nothing Here!</span>
        </div>
    );
}

export default VoucherSide