import { Navigate } from 'react-router'

import { useAuthContext } from '@/context/auth'

const HomePage = () => {
  const { user, isInitializing } = useAuthContext()

  if (isInitializing) return null

  if (!user) {
    return <Navigate to={'/login'} />
  }

  return <h1>{user.first_name}</h1>
}

export default HomePage
