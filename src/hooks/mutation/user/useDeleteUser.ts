import { useMutation } from 'react-query'
import { useContext } from 'react'
import UserContext from '../../../context/User'
import API from '../../../app/API'

const updateUser = async () => {
  return await (await API.delete(`/me/delete`)).data
}

const useUpdateUser = () => {
  const { setUser } = useContext(UserContext)

  return useMutation(updateUser, {
    onSuccess: () => {
      setUser(null)
    }
  })
}

export default useUpdateUser