import React from 'react'
import ItemCard from './ItemCard'
import './ItemList.css'
import NoItems from './NoItems'
export default function ItemList(props) {

    if (props.items?.length === 0 || !props.items){
        return <NoItems />

    }
    if (props.items?.length > 0){
        return (
        <div className='item-list'>
          {props.items.map(e => <ItemCard key={e._id} item={e} />) }
        </div>)
    }

  return (
    <div>ItemList</div>
  )
}
