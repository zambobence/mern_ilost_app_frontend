import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useHttpClient from '../../shared/hooks/use-http'
import LoadingComponent from '../../shared/UI/LoadingComponent'
import Modal from '../../shared/UI/Modal'
import ItemImage from '../components/ItemImage'
import Container from '../../shared/UI/Container'
import CreatorDashBoard from '../components/CreatorDashBoard'
import Map from '../../map/Map'

export default function ItemDetails() {
    const {itemId} = useParams()
    const [itemData, setItemData] = useState({})
    const {isLoading, errorStatus, clearError, sendRequest} = useHttpClient()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(itemId)
        const fetchItem = async () => {
            const loadedItem = await sendRequest('http://localhost:5000/item/' + itemId)
            setItemData(loadedItem?.item)
        }
        fetchItem()
    },[])

    const deleteItem = async () => {
        await sendRequest('http://localhost:5000/item/' + itemId, 'DELETE')
        navigate('/browse-item')
    }

    let isCreator = false
    isCreator = itemData.creator === '64dba9c3381746f82d40948e'

  return (
    <>
        {isLoading && <LoadingComponent />}
        {errorStatus && <Modal show={errorStatus} clearModal={clearError} content={errorStatus} />}
        <Container>
            <ItemImage src={itemData.imageUrl} alt={itemData.title}/>
            <h1>{itemData.title}</h1>
            <h2>{itemData.type}</h2>
            <h2>{itemData.color}</h2>
            <h2>{itemData.timeLost}</h2>
            <h2>{itemData.lost}</h2>
            <h2>{itemData.creator}</h2>
            {isCreator ? <CreatorDashBoard
                handleDelete={deleteItem} /> : null}
            <Map cardMode coordinates={itemData.coordinateObject}/>
        </Container>
    </>
  )
}
