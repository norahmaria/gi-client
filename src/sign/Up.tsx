import { useState } from 'react'
import { baseAvatar } from '../utils/imageToBase64'
import { Errors } from '../hooks/mutation/sign/useSignUp'
import useForm from '../hooks/useForm'
import useSignUp from '../hooks/mutation/sign/useSignUp'
import Input from '../components/Input'

// TODO: Add a bit more to the welcome card, it's a lil short - uneven content.

const Up = () => {
  const [ errors, setErrors ] = useState<null | Errors>(null)
  const signInForm = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: baseAvatar
  }

  const { mutate } = useSignUp(setErrors)
  const { form, setInput, sendForm } = useForm(setErrors, mutate, signInForm)

  return (
    <form className="up">
      <form className="form">
        <label tabIndex={0} className="avatar-label" htmlFor="avatar">
          Pick an avatar →
          <img style={{ cursor: 'pointer', maxHeight: '10vh' }} className="avatar display" src={form.avatar} alt="" />
        </label>
        <input 
          tabIndex={-1}
          style={{ 
            position: 'absolute', 
            left: '-30rem',
            top: '-30rem',
            opacity: '0'
          }} 
          type="file" 
          id="avatar" 
          name="avatar" 
          onChange={setInput}/>

        <Input error={errors?.username} name="username" value={form.username} label="Username" changeEvent={setInput}/>

        <Input error={errors?.email} name="email" value={form.email} label="E-mail" changeEvent={setInput}/>
        
        <Input error={errors?.password} name="password" value={form.password} label="Password" changeEvent={setInput}/>

        <Input error={errors?.confirmPassword} name="confirmPassword" value={form.confirmPassword} label="Confirm Password" changeEvent={setInput}/>

        <button disabled={errors !== null} onClick={(e) => {
          e.preventDefault()
          sendForm(e)
        }}>Sign Up</button>
      </form>

    </form>
  )
}

export default Up