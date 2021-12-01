import { useState } from 'react'

import In from './In'
import Up from './Up'

import './Sign.scss'

const Sign = () => {
  const [signUp, setSignUp] = useState(false)

  return (
    <div className="sign">
      <h1>Gi.</h1>

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