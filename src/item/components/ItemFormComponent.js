import React, { useContext, useState } from 'react'
import useInput from '../../shared/hooks/use-input'
import Input from '../../shared/UI/Input'
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
import AuthCtx from '../../shared/context/auth-context'
import LostToggler from './LostToggler'
import Button from '../../shared/UI/Button'

export default function ItemFormComponent() {

    const [lostValue, setLostValue] = useState(true)
    const {value: titleValue, hasError: titleHasError, inputChangeHandler: titleChangeHandler, inputBlurHandler: titleBlurHandler} = 
        useInput((title) => title.trim() !== "")
    const {value: colorValue, hasError: colorHasError, selectChangeHandler: colorChangeHandler, reset: colorReset} = 
        useSelect(colorArray[0])
    const {value: typeValue, hasError: typeHasError, selectChangeHandler: typeChangeHandler, reset: typeReset} = 
        useSelect(typeArray[0])

    const {isLoading, errorStatus, clearError, sendRequest} = useHttpClient()
    const {coordinates, radius, handleChangeCoordinates} = useMap()
    const {token} = useContext(AuthCtx)

    const toggleLost = () => {
        setLostValue(prevState => !prevState)
    }

    useEffect(() => {
        getUserCoordinates()
        .then((coordinates) => {
            handleChangeCoordinates(coordinates.lat, coordinates.lng)
        })
    }, [])

  const submitHandler = (event) => {
    event.preventDefault()
    const data = {
        lost: true,
        title: titleValue,
        type: typeValue,
        color: colorValue,
        timeLost: new Date(),
        coordinates: coordinates,
        creator: '64dba9c3381746f82d40948e'
    }
    sendRequest('http://localhost:5000/add-item', 'POST', {'Authorization': `Bearer ${token}`}, data)
}


    return (
    <>
        {isLoading && <LoadingComponent />}
        {errorStatus && <Modal show={errorStatus} clearModal={clearError} content={errorStatus} />}
        <Container>
            <form onSubmit={submitHandler}>
                <LostToggler lost={lostValue} toggleLost={toggleLost} />
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
                <Select
                    label="Color"
                    id="color"
                    isValid={!colorHasError}
                    options={colorArray}
                    error="Please select a color"
                    onChange={colorChangeHandler}
                    value={colorValue}
                    />
                <Select
                    label="Type"
                    id="type"
                    isValid={!typeHasError}
                    options={typeArray}
                    error="Please select a type"
                    onChange={typeChangeHandler}
                    value={typeValue}
                />
                <Map
                    browseMode={false}
                    radius={Number(radius)}
                    coordinates={coordinates}
                    handleClick={handleChangeCoordinates}
                    inputMode
                />
                <Button style={{marginTop: '1rem'}} type="submit">Submit</Button>
            </form>
        </Container>
    </>
  )
}
