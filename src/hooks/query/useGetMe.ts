import { useQuery } from 'react-query'
import { useContext } from 'react'
import UserContext from '../../context/User'
import API from '../../app/API'

const getMe = async () => {
  return await (await API.get('/me')).data
}

const useGetMe = () => {
  const { setUser } = useContext(UserContext)

  return useQuery('user', getMe, {
    onSuccess: (user) => setUser(user),
    onError: () => setUser(null)
  })
}

export default useGetMe