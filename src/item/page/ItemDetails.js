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
import CardContent from '../components/card/CardContent'
import Grid from '../../shared/UI/Grid'
import CreatorData from '../components/CreatorData'

export default function ItemDetails() {
    const {token, userId} = useContext(AuthCtx)
    const {itemId} = useParams()
    const [itemData, setItemData] = useState({})
    const {isLoading, errorStatus, clearError, sendRequest} = useHttpClient()
    const navigate = useNavigate()

    useEffect(() => {
          const fetchItem = async () => {
            const loadedItem = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/item/${itemId}`)
            setItemData(loadedItem?.item)
        }
        fetchItem()
    },[])

    const deleteItem = async () => {
        await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/item/${itemId}`, 'DELETE', {'Authorization': `Bearer ${token}`})
        navigate('/browse-item')
    }

    let isCreator = false
    const creatorId = itemData?.creator?.id
    if (!creatorId){
        isCreator = false
    }
    isCreator = itemData?.creator?._id === userId

  return (
    <>
        {isLoading && <LoadingComponent />}
        {errorStatus && <Modal error show={errorStatus} clearModal={clearError} content={errorStatus} />}
        <Container>
            <Grid>
                <div className='col'>
                    <ItemImage src={itemData.imageUrl} alt={itemData.title}/>
                    <CardContent item={itemData} />
                    {userId && <CreatorData data={itemData.creator} />}
                    {isCreator ? <CreatorDashBoard
                        handleDelete={deleteItem} /> : null}
                </div>

                <Map cardMode coordinates={itemData.coordinateObject}/>

            </Grid>
        </Container>
    </>
  )
}
