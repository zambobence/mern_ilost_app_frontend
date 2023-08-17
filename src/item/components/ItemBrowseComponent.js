import React, { useState } from 'react'
import { colorArray, typeArray } from '../../data/select_input'
import Select from '../../shared/UI/Select'
import useSelect from '../../shared/hooks/use-select'
import Map from '../../map/Map'
import Container from '../../shared/UI/Container'
import { useEffect } from 'react'
import getUserCoordinates from '../../shared/utils/geo-location'
import useHttpClient from '../../shared/hooks/use-http'
import LoadingComponent from '../../shared/UI/LoadingComponent'
import useMap from '../../shared/hooks/use-map'
import Modal from '../../shared/UI/Modal'
import InputRange from '../../shared/UI/InputRange'

export default function ItemBrowseComponent(props) {

    const {value: colorValue, selectChangeHandler: colorChangeHandler, reset: colorReset} = 
        useSelect(colorArray[0])
    const {value: typeValue, selectChangeHandler: typeChangeHandler, reset: typeReset} = 
        useSelect(typeArray[0])

    const [lostValue, setLostValue] = useState(true)
    const {isLoading, errorStatus, clearError, sendRequest} = useHttpClient()
    const {coordinates, radius, radiusChangeHandler, handleChangeCoordinates} = useMap()

    // using it to store the retrieved items from the backend
    const [itemArray, setItemArray] = useState([])

    const fetchItems = async () => {
        const data = {
            radius: radius,
            coordinates: coordinates,
        }
        let url = 'http://localhost:5000/items?' + queryBuilder()
        const loadedItems = await sendRequest(url, 'POST', {}, data)
        props.handleLoadedItems(loadedItems?.items)
        setItemArray(loadedItems?.items)
    }

    useEffect(() => {
        const positionMap = async () => {
            const coordinates = await getUserCoordinates()
            handleChangeCoordinates(coordinates.lat, coordinates.lng)
        }
        positionMap()
    }, [])

    // Using the timeout the fetchfunction is only called
    // when the user stops changing the radius or any input

    useEffect(() => {
        const fetchTimeout = setTimeout(() => {
            fetchItems()
        }
        , 300)
        return () => {
            clearTimeout(fetchTimeout)
        }
    }, [coordinates, radius, lostValue, colorValue, typeValue])


const submitHandler = (event) => {
    event.preventDefault()
    const data = {
        radius: radius,
        coordinates: coordinates,
    }

    let url = 'http://localhost:5000/items?' + queryBuilder()
    sendRequest(url, 'POST', {}, data)
            .then((items) => {
            props.handleLoadedItems(items)
        })
}

  const queryBuilder = () => {
    let lostQuery = `lost=${lostValue}`
    let colorQuery = colorValue !=="Color" ? `&color=${colorValue}` : ""
    let typeQuery = typeValue !=="Type" ? `&type=${typeValue}` : ""

    return lostQuery + colorQuery + typeQuery
  }


    return (
        <>
            {isLoading && <LoadingComponent />}
            {errorStatus && <Modal show={errorStatus} clearModal={clearError} content={errorStatus} />}
            <Container>
                <form onSubmit={submitHandler}>
                    <Select
                        label="Color"
                        id="color"
                        isValid={true}
                        options={colorArray}
                        error="Please select a color"
                        onChange={colorChangeHandler}
                        value={colorValue}
                    />
                    <Select
                        label="Type"
                        id="type"
                        isValid={true}
                        options={typeArray}
                        error="Please select a type"
                        onChange={typeChangeHandler}
                        value={typeValue}
                    />
                    <InputRange value={radius} onChange={radiusChangeHandler} />
                    <Map
                        browseMode={true}
                        radius={Number(radius)}
                        coordinates={coordinates}
                        centerMapByClick={handleChangeCoordinates}
                        itemArray={itemArray}
                    />
                </form>
            </Container>
        </>
    )
}