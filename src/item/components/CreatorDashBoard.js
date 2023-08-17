import React from 'react'
import Button from '../../shared/UI/Button'

export default function CreatorDashBoard(props) {
  return (
    <div>
          <Button>Edit</Button>
          <Button onClick={props.handleDelete}>Delete</Button>
    </div>
  )
}
