import { useState } from 'react'
import { ReactComponent as SmileIcon } from '../assets/emoji/Smile.svg'
import useForm from '../hooks/useForm'
import useSignIn from '../hooks/mutation/sign/useSignIn'
import Input from '../components/Input'
import type { Errors } from '../hooks/mutation/sign/useSignIn'

const In = () => {
  const [ errors, setErrors ] = useState<null | Errors>(null)
  const signInForm = {
    username: '',
    password: ''
  }

  const { mutate } = useSignIn(setErrors)
  const { form, setInput, sendForm } = useForm(setErrors, mutate, signInForm)

  return (
    <div className="in">
      <div className="welcome">
        <h2>Welcome back</h2> <SmileIcon />
      </div>

      <form className="form" onSubmit={sendForm}>

        <Input error={errors?.username} name="username" value={form.username} label="Username" changeEvent={setInput}/>

        <Input error={errors?.password} name="password" value={form.password} label="Password" changeEvent={setInput}/>

        <button disabled={errors !== null} type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default In