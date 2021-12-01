import { useMutation } from 'react-query'
import type User from '../../../types/User'
import API from '../../../app/API'

type Types = {
  searchTerm: string,
  mutuals: boolean
}

const userSearch = async ({ searchTerm, mutuals }: Types) => await (await API.post(`/search/${mutuals ? 'mutuals' : 'general'}`, { searchTerm })).data

const useUserSearch = (setResults: React.Dispatch<React.SetStateAction<[] | User[]>>) => {
  return useMutation(userSearch, {
    onSuccess: (users) => {
      setResults(users as User[])
    }
  })
}

export default useUserSearch