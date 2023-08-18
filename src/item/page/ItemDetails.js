import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useHttpClient from '../../shared/hooks/use-http'
import LoadingComponent from '../../shared/UI/LoadingComponent'
import Modal from '../../shared/UI/Modal'
import ItemImage from '../components/ItemImage'
import Container from '../../shared/UI/Container'
import CreatorDashBoard from '../components/CreatorDashBoard'
import Map from '../../map/Map'
import AuthCtx from '../../shared/context/auth-context'
import CardContent from '../components/CardContent'
import Grid from '../../shared/UI/Grid'

export default function ItemDetails() {
    const {userId} = useContext(AuthCtx)
    const {itemId} = useParams()
    const [itemData, setItemData] = useState({})
    const {isLoading, errorStatus, clearError, sendRequest} = useHttpClient()
    const navigate = useNavigate()

    useEffect(() => {
          const fetchItem = async () => {
            const loadedItem = await sendRequest('https://mern-ilost-backend.onrender.com/item/' + itemId)
            setItemData(loadedItem?.item)
        }
        fetchItem()
    },[])

    const deleteItem = async () => {
        await sendRequest('https://mern-ilost-backend.onrender.com/item/' + itemId, 'DELETE')
        navigate('/browse-item')
    }

    let isCreator = false
    isCreator = itemData?.creator === userId

  return (
    <>
        {isLoading && <LoadingComponent />}
        {errorStatus && <Modal show={errorStatus} clearModal={clearError} content={errorStatus} />}
        <Container>
            <Grid>
                <div className='col'>
                    <ItemImage src={itemData.imageUrl} alt={itemData.title}/>
                    <CardContent item={itemData} />
                    {isCreator ? <CreatorDashBoard
                        handleDelete={deleteItem} /> : null}
                </div>
                <Map cardMode coordinates={itemData.coordinateObject}/>
            </Grid>
        </Container>
    </>
  )
}
