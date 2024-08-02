import React from 'react'
import {ArrowLeft} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
interface BackBtnProps {
    myText?: {
      images: string;
      title: string;
      url: string;
    };
  }


  const BackBtn: React.FC<BackBtnProps> = ({ myText }) => {
  return (
    <div className=' w-full flex flex-row items-center gap-3 ' >
<Link href='/help-center'>
<ArrowLeft/>
</Link>
<Image className='w-14' src={myText?.images ||''} height={100} width={100} alt='the icon' />
    <span className="text-2xl font-bold text-center   ">{myText?.title}</span>
    </div>
  )
}

export default BackBtn