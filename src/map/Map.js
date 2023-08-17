import React, { useState } from 'react'
import {
	MarkerF,
	GoogleMap,
	LoadScript,
    Autocomplete,
    CircleF,
} from '@react-google-maps/api'

import './Map.css'

function MapComponent(props) {
 	const [ libraries ] = useState(['places']);
	const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
	console.log(apiKey)
    const containerStyle = {
        width: '100%',
        height: '100%',
        position: 'relative',
    }

	// creates an array of marker components
	// if the browseMode it will create a marker for each item
	let markerObjectArray = null
	if (props.browseMode && props?.itemArray.length !== 0) {
		markerObjectArray = props.itemArray.map((e) => <MarkerF position={e.coordinateObject} key={e.id} onClick={() => {}}/>)
	}


	const currentLocationOptions = {
		strokeColor: '#007ebd',
		strokeOpacity: 0.8,
		strokeWeight: 0.5,
		fillColor: '#007ebd',
		fillOpacity: 0.35,
	}

	const radiusElement = (
		<CircleF
			center={props.coordinates}
			radius={props.radius}
			options={currentLocationOptions}
			key={"start_radius"}
		/>
	)

    const [searchResult, setSearchResult] = useState('Result: none')

    const onLoad = (autocomplete) => {
		setSearchResult(autocomplete)
	}

	const onPlaceChanged = () => {
		if (searchResult !== null) {
			// Fetches the places api of google to get places data
			const place = searchResult?.getPlace()
            const newCoordinates = {
                lat: place.geometry.location.lat(),
				lng: place.geometry.location.lng(),
            }
			// it centers the map to the new coordinates
            props.centerMapByClick(newCoordinates.lat, newCoordinates.lng)
        }
	}



	return (
		<div className='map-container'>
			<LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
                {
					// If the cardMode is true, the map is not clickable
					// and the autocomplete is not shown

					props.cardMode ? null : (
						<Autocomplete
							className='searchbar-autocomplete'
							onPlaceChanged={onPlaceChanged}
							onLoad={onLoad}
						>
							<input className='searchbar-autocomplete-field' type='text' />
						</Autocomplete>
					)
				}
                <GoogleMap
					mapContainer={'mymap'}
					mapContainerStyle={containerStyle}
					options={{
						mapTypeControl: false,
						streetViewControl: false,
						zoomControl: false,
						fullscreenControl: false,
					}}
					center={props.coordinates}
					zoom={12}
					onClick={props.cardMode ? undefined : (e) => {
                        props.centerMapByClick(e.latLng.lat(), e.latLng.lng());
                    }}
				>
					{props.browseMode ? radiusElement : null }
					<MarkerF position={props.coordinates} key={"start_marker"}/>
					{markerObjectArray}
				</GoogleMap>
			</LoadScript>
		</div>
    )
}

export default MapComponent