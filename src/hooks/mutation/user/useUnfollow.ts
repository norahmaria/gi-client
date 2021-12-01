import { useContext } from 'react'
import { useMutation } from 'react-query'
import UserContext from '../../../context/User'
import type User from '../../../types/User'
import API from '../../../app/API'

const unfollow = async (id: string): Promise<User> => await (await API.post(`/user/unfollow`, { id })).data as User

const useUnfollow = () => {
  const { setUser } = useContext(UserContext)
  
  return useMutation(unfollow, {
    onSuccess: (user) => {
      setUser(user)
    }
  })
}

export default useUnfollow