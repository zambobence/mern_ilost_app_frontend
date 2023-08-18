import React from 'react'
import './LoadingComponent.css'
import BackDrop from './BackDrop'
import LoadingCircle from './LoadingCircle'
export default function LoadingComponent() {
  return (
    <>
    <BackDrop show={true} />
    <div className={`loading-component`}>
        <h1>Loading...</h1>
        <LoadingCircle />
    </div>
    
    </>
  )
}
