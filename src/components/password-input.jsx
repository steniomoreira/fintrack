import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { forwardRef, useState } from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'

const PasswordInput = forwardRef(({ ...props }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  return (
    <div className="relative">
      <Input
        type={isPasswordVisible ? 'text' : 'password'}
        {...props}
        ref={ref}
      />
      <Button
        variant="ghost"
        type="button"
        className="absolute bottom-0 right-0 top-0 my-auto mr-1 h-8 w-8 text-muted-foreground"
        onClick={() => setIsPasswordVisible((prev) => !prev)}
      >
        {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
      </Button>
    </div>
  )
})

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
