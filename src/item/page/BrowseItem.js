import React, {useState} from 'react'
import Container from '../../shared/UI/Container'
import ItemBrowseComponent from '../components/ItemBrowseComponent'
import ItemList from '../components/ItemList'

export default function BrowseItem() {
    const [loadedItems, setLoadedItems] = useState([])

    const handleLoadedItems = (items) => {
        console.log(items)
        setLoadedItems(items)
    }

  return (
    <Container>
        <ItemBrowseComponent handleLoadedItems={handleLoadedItems} />
        <ItemList items={loadedItems} />
    </Container>
  )
}
