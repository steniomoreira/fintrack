import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'

const PasswordInput = ({ placeholder = 'Digite sua senha' }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  return (
    <div className="relative">
      <Input
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder={placeholder}
      />
      <Button
        variant="ghost"
        className="absolute bottom-0 right-0 top-0 my-auto mr-1 h-8 w-8 text-muted-foreground"
        onClick={() => setIsPasswordVisible((prev) => !prev)}
      >
        {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
      </Button>
    </div>
  )
}

export default PasswordInput
