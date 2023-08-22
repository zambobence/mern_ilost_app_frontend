import React, { useContext, useState } from 'react'
import useInput from '../../shared/hooks/use-input'
import Input from '../../shared/UI/Input'
import Container from '../../shared/UI/Container'
import { useEffect } from 'react'
import LoadingComponent from '../../shared/UI/LoadingComponent'
import Map from '../../map/Map'
import Modal from '../../shared/UI/Modal'
import AuthCtx from '../../shared/context/auth-context'
import Button from '../../shared/UI/Button'
import useHttpClient from '../../shared/hooks/use-http'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditItemComponent(props) {

    const {itemId} = useParams()
    const [successStatus, setSuccessStatus] = useState(null)
    const [itemData, setItemData] = useState({
        title: ""
    })

    const {value: titleValue, hasError: titleHasError, inputChangeHandler: titleChangeHandler, inputBlurHandler: titleBlurHandler, reset: titleReset, fetchedData: fetchedTitle} = 
        useInput((value) => value.trim() !== "")


    const {isLoading, errorStatus, clearError, sendRequest} = useHttpClient()
    const {token} = useContext(AuthCtx)
    const navigate = useNavigate()

    const fetchItem = async () => {
        const loadedItem = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/item/${itemId}`,
            'GET')
            setItemData(loadedItem?.item)
    }

    useEffect(() => {
        fetchItem()
    },[])


    const submitHandler = async (event) => {
        event.preventDefault()
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/item/${itemId}`,
            "PATCH",
            {"Authorization": `Bearer ${token}`},
            {
                title: titleValue,
            }
        )
        setSuccessStatus('Item changed correcty')
        setTimeout(() => {
            setSuccessStatus(null)
            navigate(`/item/${itemId}`)
        }, 2000)
    }

    useEffect(() => {
        fetchedTitle(itemData.title)
    },[itemData.title])




    return (
        <>
        {successStatus && <Modal success show={successStatus} content={successStatus}/>}
        {isLoading && <LoadingComponent />}
        {errorStatus && <Modal error show={errorStatus} clearModal={clearError} content={errorStatus} />}
        <Container>
            <form onSubmit={submitHandler}>
                <Input
                    label="Title"
                    id="title"
                    isValid={!titleHasError}
                    error="Title is not valid"
                    input={{
                        type: "title",
                        value: titleValue,
                        onChange: titleChangeHandler,
                        onBlur:  titleBlurHandler
                    }}
                />
                <Map cardMode coordinates={itemData.coordinateObject}/>

                <Button style={{marginTop: '1rem'}} type="submit">Save changes</Button>
            </form>
        </Container>
    </>
    )
}
