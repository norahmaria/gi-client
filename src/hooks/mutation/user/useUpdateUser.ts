import { useMutation } from 'react-query'
import { useContext } from 'react'
import UserContext from '../../../context/User'
import API from '../../../app/API'

const updateUser = async (avatar: string) => {
  return await (await API.patch(`/me/edit`, { avatar })).data
}

const useUpdateUser = () => {
  const { setUser } = useContext(UserContext)

  return useMutation(updateUser, {
    onSuccess: (user) => {
      setUser(user)
    }
  })
}

export default useUpdateUser