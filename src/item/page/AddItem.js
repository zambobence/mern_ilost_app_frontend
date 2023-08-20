import React, {useContext, useState} from 'react'
import AuthCtx from '../../shared/context/auth-context'
import AddItemComponent from '../components/AddItemComponent'

export default function AddItem() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorStatus, setErrorStatus] = useState(null)
  const {token} = useContext(AuthCtx)
  const clearError = () => {
    setErrorStatus(null)
  }

 
  return (
    <div>
        <AddItemComponent isLoading={isLoading} errorStatus={errorStatus} clearError={clearError} />
    </div>
  )
}
