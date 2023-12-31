import React, { useState } from 'react'
import {
	MarkerF,
	GoogleMap,
	LoadScript,
    Autocomplete,
    CircleF,
} from '@react-google-maps/api'
import './Map.css'

import phoneIcon from '../assets/icons/phoneIcon.png'
import clothesIcon from '../assets/icons/clothesIcon.png'
import laptopIcon from '../assets/icons/laptopIcon.png'
import keyIcon from '../assets/icons/keyIcon.png'
import walletIcon from '../assets/icons/walletIcon.png'
import etcIcon from '../assets/icons/etcIcon.png'
import Compass from './Compass'
import Flex from '../shared/UI/Flex'

function MapComponent(props) {
	const [ libraries ] = useState(['places']);
	const [searchResult, setSearchResult] = useState('Result: none')
	const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

	const containerStyle = {
        width: '100%',
        height: '100%',
        position: 'relative',
    }

	const currentLocationOptions = {
		strokeColor: '#007ebd',
		strokeOpacity: 0.8,
		strokeWeight: 0.5,
		fillColor: '#007ebd',
		fillOpacity: 0.35,
	}

	const markerObj = {
		phone: phoneIcon,
		clothes: clothesIcon,
		laptop: laptopIcon,
		key: keyIcon,
		wallet: walletIcon,
		etc: etcIcon,
	}

	// creates an array of marker components
	// if the browseMode it will create a marker for each item
	let markerObjectArray = null
	if (props.browseMode && props?.itemArray && props?.itemArray.length !== 0) {
		markerObjectArray = props.itemArray.map((e) => 
			<MarkerF 
				position={e.coordinateObject}
				icon={markerObj[e?.type]}
				key={e.id} 
				onClick={() => {}}
			/>
		)
	}


	const radiusElement = (
		<CircleF
			center={props.coordinates}
			radius={props.radius}
			options={currentLocationOptions}
			key={"start_radius"}
		/>
	)

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
            props.centerMap(newCoordinates.lat, newCoordinates.lng)
        }
	}



	return (
		<div className='map-container'>
			<LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
                {
					// If the cardMode is true, the map is not clickable
					// and the autocomplete is not shown

					props.cardMode ? null : (
						<Flex style={{maxWidth: '300px'}}>
							<Autocomplete
								className='searchbar-autocomplete'
								onPlaceChanged={onPlaceChanged}
								onLoad={onLoad}
								>
								<input className='searchbar-autocomplete-field' type='text' />
							</Autocomplete>
							<Compass onClick={props.centerToCurrentPosition} />
						</Flex>
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
                        props.centerMap(e.latLng.lat(), e.latLng.lng());
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