import { useState } from 'react'
const DropDown = ({ options }: { options: string[] }) => {
  const [ isActive, setIsActive ] = useState(false)
  const [ selected, setSelected ] = useState('')

  return (
    <div className="select">
      <div className="title" onClick={() => setIsActive(!isActive)}>{selected || 'Pronouns'}</div>
      {isActive && (
        <div className="options">
          {options.map(option => (
            <div 
              className="option" 
              onClick={e => {
                setSelected(option)
                setIsActive(false)
              }}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropDown