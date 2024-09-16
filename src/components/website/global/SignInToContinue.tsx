import { Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function SignInToContinue() {
    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <div
                    style={{ top: "-104px" }}
                    className="text-center flex flex-col justify-center items-center  relative"
                >
                    <div className="mb-6">
                        <Image
                            src="/assets/home/empty-cart.svg"
                            alt="Empty Cart"
                            width={350}
                            height={350}
                            className="mx-auto"
                        />
                    </div>

                    <span className="text-2xl font-semibold text-gray-800 Capitalize">
                        Please login to view your cart
                    </span>

                    <Link href={'/signin'}>
                        <Button className='bg-primary-gradient text-white font-bold uppercase w-[350px] p-6 my-3'>
                            Click here to login
                        </Button>
                    </Link>
                    <span className="mt-2 text-gray-600">
                        Shopping is waiting for you to login
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SignInToContinue