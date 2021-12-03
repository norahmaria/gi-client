import type { UseMutateFunction } from 'react-query'
import { useState, ChangeEvent, FormEvent } from 'react'
import { imageToBase64, baseAvatar } from '../utils/imageToBase64'
import { useNavigate } from 'react-router-dom'

type UseFormFn = (
  setErrors: React.Dispatch<React.SetStateAction<any | null>>,
  callback: UseMutateFunction<any, unknown, any, unknown>,
  initial: any, 
  options?: { 
    clear?: boolean, 
    redirect?: string 
  }) => any

const useForm: UseFormFn = (setErrors, callback, initial, options) => {
  const [form, setForm] = useState(initial)
  const navigate = useNavigate()

  const setInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const files = e.target.files
    let input: any = value

    if (files && files[0]) {
      input = name === 'avatar' ? 
        await imageToBase64(files[0], true) || baseAvatar : 
        await imageToBase64(files[0], false)
    } else if (name === 'avatar') {
      input = baseAvatar
    }

    setForm({...form, [name]: input})
    setErrors((prev: any) => {
      const mutable = {...prev}

      if (!Object.keys(mutable)[0]) {
        return null
      } else if (mutable && mutable[name]) {
        delete prev[name]
      }

      return mutable
    })
  }

  const sendForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    callback(form)

    if (options) {
      const { clear, redirect } = options

      if (clear) setForm(initial)
      if (redirect) navigate(redirect)
    }
  }

  return { form, setInput, sendForm }
}

export default useForm