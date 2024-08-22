import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import GoogleIcon from '../icons/google-icon'

interface GoogleSignInButtonProps {
  children: React.ReactNode
  callbackUrl: string
}
const GoogleSignInButton = ({
  children,
  callbackUrl
}: GoogleSignInButtonProps) => {

  const loginWithGoogle = async () => {
    await signIn("google", { callbackUrl })
  }

  return (
    <Button onClick={loginWithGoogle} className="bg-gray-100 rounded-lg gap-2 w-full flex justify-center h-14 items-center text-slate-700 hover:text-white">
        <GoogleIcon />
      {children}
    </Button>
  )
}

export default GoogleSignInButton