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
import LoadingComponent from '../../shared/UI/LoadingComponent'
import useMap from '../../shared/hooks/use-map'
import Modal from '../../shared/UI/Modal'
import AuthCtx from '../../shared/context/auth-context'
import LostToggler from './LostToggler'
import Button from '../../shared/UI/Button'
import ImageUpload from '../../shared/UI/ImageUpload'
import useHttpClient from '../../shared/hooks/use-http'
import { useNavigate } from 'react-router-dom'
import dateParser from '../../shared/utils/date-parse'
import { type } from '@testing-library/user-event/dist/type'

export default function AddItemComponent(props) {

    const [lostValue, setLostValue] = useState(true)
    const {value: titleValue, hasError: titleHasError, inputChangeHandler: titleChangeHandler, inputBlurHandler: titleBlurHandler} = 
        useInput((title) => title.trim() !== "")
    const {value: lostDateValue, hasError: lostDateHasError, inputChangeHandler: lostDateChangeHandler, inputBlurHandler: lostDateBlurHandler} = 
        useInput((value) => dateParser(value))
    const {value: colorValue, hasError: colorHasError, selectChangeHandler: colorChangeHandler, reset: colorReset} = 
        useSelect(colorArray[0])
    const {value: typeValue, hasError: typeHasError, selectChangeHandler: typeChangeHandler, reset: typeReset} = 
        useSelect(typeArray[0])
    const [imageValue, setImageValue] = useState(null)

    const {isLoading, errorStatus, clearError, sendRequest} = useHttpClient()
    const {coordinates, radius, handleChangeCoordinates} = useMap()
    const {token} = useContext(AuthCtx)
    const navigate = useNavigate()


    const handleImageUpload = (image) => {
        setImageValue(image)
    }

    const toggleLost = () => {
        setLostValue(prevState => !prevState)
    }

    const centerToCurrentPosition = async () => {
        const coordinates = await getUserCoordinates()
        handleChangeCoordinates(coordinates.lat, coordinates.lng)
    }

    useEffect(() => {
        centerToCurrentPosition()
    }, [])

  const submitHandler = (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('title', 'titleValue')
    formData.append('lost', lostValue)
    formData.append('type', typeValue)
    formData.append('color', colorValue)
    formData.append('coordinates', JSON.stringify(coordinates))
    formData.append('image', imageValue)

    sendRequest(
        'http://localhost:5000/add-item',
        'POST',
        {'Authorization': `Bearer ${token}`},
        formData,
    )
    navigate('/browse')
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
                <Input
                    label={lostValue ? "Lost" : "Found"}
                    id="lostDate"
                    isValid={!lostDateHasError}
                    error="Please provide a valid date"
                    input={{
                        type: "date",
                        value: lostDateValue,
                        onChange: lostDateChangeHandler,
                        onBlur:  lostDateBlurHandler
                    }}
                />
                <ImageUpload
                    imageValue={imageValue}
                    handleImageUpload={handleImageUpload}
                />

                <Map
                    browseMode={false}
                    radius={Number(radius)}
                    coordinates={coordinates}
                    centerMap={handleChangeCoordinates}
                    centerToCurrentPosition={centerToCurrentPosition}
                    inputMode
                />
                <Button style={{marginTop: '1rem'}} type="submit">Submit</Button>
            </form>
        </Container>
    </>
  )
}
