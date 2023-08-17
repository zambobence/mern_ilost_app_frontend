import {useState} from 'react'

export default function useMap(startInput) {
    let startPosition
    if (startInput){
        startPosition = startInput
    } else {
        startPosition = {lat: 33, lng: 11}
    }

    const [coordinates, setCoordinates] = useState(startPosition)
    const [radius, setRadius] = useState(5000)
    const radiusChangeHandler = (event) => {
        event.preventDefault()
        setRadius(Number(event.target.value))
    }

    const handleChangeCoordinates = (lat, lng) => {
        setCoordinates({lat, lng})
    }
/*
    useEffect(() => {
        getUserCoordinates()
            .then((coordinates) => {
                setCoordinates(coordinates)
            })
    }, [])
*/

  return {coordinates, radius, radiusChangeHandler, handleChangeCoordinates,}
}
