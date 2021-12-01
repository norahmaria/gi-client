import type User from '../../types/User'
import { useMutation } from 'react-query'
import API from '../../app/API'

const getProfile = async (username: string) => await (await API.post(`/user/profile`, { username })).data

const useGetProfile = (setProfile: React.Dispatch<React.SetStateAction<User | null>>) => {
  return useMutation(getProfile, {
    onSuccess: (profile) => {
      setProfile(prev => profile as User)
    }
  })
}

export default useGetProfile