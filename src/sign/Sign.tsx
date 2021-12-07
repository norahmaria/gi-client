import { useState, useEffect} from 'react'

import In from './In'
import Up from './Up'

import './Sign.scss'

const Sign = () => {
  const [signUp, setSignUp] = useState(false)
  const [isSafari, setIsSafari] = useState(window.navigator.userAgent.indexOf('Safari') !== -1)

  useEffect(() => {
    setIsSafari(() => {
      const safariCheck = window.navigator.userAgent.indexOf('Safari') !== -1
      return safariCheck
    })
  }, [window.navigator])

  return (
    <div className="sign">
      <h1>Gi.</h1>

      {isSafari && "On Safari? For this site to work properly go to Preferenes -> Privacy and turn off Prevent cross-site tracking"}

      { signUp ? <Up /> : <In /> }

      <button className="switch-sign" onClick={() => setSignUp(value => !value)}>
        {signUp ? (
          <>Already have an account? <b>Sign In.</b></>
        ) : (
          <>Need an account? <b>Get one!</b></>
        )}
      </button>
    </div>
  )
}

export default Sign