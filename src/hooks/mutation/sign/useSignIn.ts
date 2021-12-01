import { useMutation } from 'react-query'
import { useContext } from 'react'
import type UserType from '../../../types/User'
import UserContext from '../../../context/User'
import API from '../../../app/API'

const signIn = async (user: UserType) => {
  return await (await API.post(`/sign/in`, { user })).data
}

export type Errors = {
  username?: string,
  password?: string
}

const useSignIn = (setErrors: React.Dispatch<React.SetStateAction<Errors | null>>) => {
  const { setUser } = useContext(UserContext)

  return useMutation(signIn, {
    onSuccess: (user: UserType) => {
      setUser(user)
    },
    onError: ({ response: { data: { errors }} }: any) => {
      setErrors(errors)
    }
  })
}

export default useSignIn