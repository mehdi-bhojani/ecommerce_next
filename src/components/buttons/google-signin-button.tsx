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
    <Button onClick={loginWithGoogle} className="text-white font-bold bg-primary-gradient uppercase w-full flex gap-5 p-3">
        <GoogleIcon />
      {children}
    </Button>
  )
}

export default GoogleSignInButton