import React from 'react'
import Button from '../../shared/UI/Button'
import { Link, useParams } from 'react-router-dom'

export default function CreatorDashBoard(props) {
  const {itemId} = useParams()
  const itemUrl = '/edit-item/' + itemId
  console.log(itemUrl)
  return (
    <div>
        <Button onClick={props.handleDelete}>Delete</Button>
        <p></p>
        <Link to={`/edit-item/${itemId}`} className={'btn inverse'} style={{marginTop: "1rem", width: 'fit-content'}}>Edit Item</Link>
    </div>
  )
}
