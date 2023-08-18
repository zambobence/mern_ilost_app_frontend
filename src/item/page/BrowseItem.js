import React, {useState} from 'react'
import Container from '../../shared/UI/Container'
import ItemBrowseComponent from '../components/ItemBrowseComponent'
import ItemList from '../components/ItemList'
import './BrowseItem.css'
import Grid from '../../shared/UI/Grid'
export default function BrowseItem() {
  const [loadedItems, setLoadedItems] = useState([])

  const handleLoadedItems = (items) => {
    if (items && items.length === 0) return setLoadedItems([])
      setLoadedItems(items)
  }

  return (
    <Container>
          <Grid>
            <ItemBrowseComponent handleLoadedItems={handleLoadedItems} />
            <ItemList items={loadedItems} />
          </Grid>

    </Container>
  )
}
