const getUserCoordinates = async () => {
    let pos
    try {
        pos = await fetchLocationAPI()
    } catch(err){
        console.log(err)
    }
	return { lat: pos.coords.latitude, lng: pos.coords.longitude }
}

function fetchLocationAPI() {
	return new Promise(function (resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	})
}

export default getUserCoordinates