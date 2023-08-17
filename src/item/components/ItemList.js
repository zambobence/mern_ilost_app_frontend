import React from 'react'
import ItemCard from './ItemCard'
export default function ItemList(props) {

    if (props.items?.length === 0 || !props.items){
        return <div>No items found</div>
    }
    if (props.items?.length > 0){
        return props.items.map(e => <ItemCard key={e._id} item={e} />)
    }

  return (
    <div>ItemList</div>
  )
}
