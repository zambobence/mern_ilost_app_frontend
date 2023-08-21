import React, { useState } from 'react'
import { LoadScript, Autocomplete } from '@react-google-maps/api'
const apiKey = process.env.REACT_APP_API_KEY

export default function SearchBar() {
	const [searchResult, setSearchResult] = useState('Result: none')
    const [ libraries ] = useState(['places']);

	const onLoad = (autocomplete) => {
		setSearchResult(autocomplete)
	}

	const onPlaceChanged = () => {
		if (searchResult !== null) {
			// Fetches the places api of google to get places data
			const place = searchResult.getPlace()
        }
	}

	return (
		<div className='searchbar-container'>
			<h1>Searchbar</h1>
            <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
				<Autocomplete
					className='searchbar-autocomplete'
					onPlaceChanged={onPlaceChanged}
					onLoad={onLoad}
				>
					<input className='searchbar-autocomplete-field' type='text' />
				</Autocomplete>
			</LoadScript>

		</div>
	)
}
