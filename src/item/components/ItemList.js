import React from 'react'
import ItemCard from './card/ItemCard'
import NoItems from './NoItems'
import './ItemList.css'
export default function ItemList(props) {

    if (props.items?.length === 0 || !props.items){
      return <NoItems />
    } else {
      return (
          <div className='item-list'>
            {props.items.map(e => <ItemCard key={e._id} item={e} />) }
          </div>
      )
    }

}
