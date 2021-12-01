import { useRef } from 'react'
import useOutsideClick from '../hooks/useOutsideClick'

type Types = {
  outsideClickException: string,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: React.FC<Types> = ({ children, outsideClickException, open, setOpen }) => {
  const container = useRef<HTMLDivElement>(null)

  useOutsideClick(container, outsideClickException, () => {
    setOpen(false)
  })

  return (
    <div className="modal" ref={container}>
      {children}
    </div>
  )
}

export default Modal