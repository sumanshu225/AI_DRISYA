import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Authenticate = () => {

  const history = useHistory()

  useEffect(() => {
    history.push('/Signup')
  }, [])
  

  return (
    <>
    </>
  )
}

export default Authenticate