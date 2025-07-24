import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { signupFormSchema } from '../schemas/signup'

export const useSignupForm = () => {
  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: false,
    },
  })

  return { form }
}
