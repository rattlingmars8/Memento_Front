import { useUserContext } from '@/context/AuthProvider';
import React from 'react'

const Explore = () => {
  const { userData } = useUserContext();
  return (
    <div>{userData.user.username}</div>
  )
}

export default Explore