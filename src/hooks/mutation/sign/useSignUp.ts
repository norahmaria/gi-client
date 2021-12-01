import { useMutation } from 'react-query'
import { useContext } from 'react'
import type UserType from '../../../types/User'
import UserContext from '../../../context/User'
import API from '../../../app/API'

const signUp = async (user: UserType) => {
  return await (await API.post(`/sign/up`, { user })).data
}

export type Errors = {
  username?: string,
  password?: string,
  confirmPassword?: string,
  email?: string
}

const useSignUp = (setErrors: React.Dispatch<React.SetStateAction<Errors | null>>) => {
  const { setUser } = useContext(UserContext)

  return useMutation(signUp, {
    onSuccess: (user: UserType) => {
      setUser(user)
    },
    onError: ({ response: { data: { errors }} }: any) => {
      setErrors(errors)
    }
  })
}

export default useSignUp