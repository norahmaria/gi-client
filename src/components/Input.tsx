import type { ChangeEvent } from 'react'
import { ReactComponent as AngryIcon } from '../assets/emoji/Cry.svg' 

type Types = {
  name: string,
  value: string,
  label: string,
  changeEvent: (e: ChangeEvent<HTMLInputElement>) => Promise<void>,
  error?: string
}

const Input = ({ name, value, label, changeEvent, error }: Types) => {
  const type = name.toLowerCase().includes('password') ? 'password' : 'text'
  
  return (
    <div className="input">
      <label>
        {error && error !== undefined ? (
          <><AngryIcon />{error}</>
        ): label}
      </label>
      <input 
        autoComplete="off"
        type={type} 
        name={name}
        id={name}
        value={value}
        placeholder={label}
        onChange={changeEvent} />
    </div>
  )
}

export default Input