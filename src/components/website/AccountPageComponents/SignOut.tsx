import { signOut } from 'next-auth/react'
import React from 'react'
import { useRouter } from "next/navigation";
const SignOut = () => {
  const router = useRouter();
  return (
    <div className="text-center mt-8">
    <button className="text-sm bg-secondary text-white py-2 px-8 rounded-md" onClick={()=>signOut()}>
      SIGN OUT
    </button>
    
  </div>
  )
}

export default SignOut