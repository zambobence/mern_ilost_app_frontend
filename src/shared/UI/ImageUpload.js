import React, {useRef, useState, useEffect} from 'react'
import './ImageUpload.css'
const ImageUpload = (props) => {

    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] = useState()
    const [isValid, setIsValid] = useState(false)

    // establishes connection with the dom node of the input
    const filePickerRef = useRef()

    // generates and forwards the file 
    const pickedHandler = (event) => {
        let pickedFile
        let fileIsValid = isValid

        console.log(event.target.value)
        if (event.target.files || event.target.files.length === 1){
            pickedFile = event.target.files[0]
            setFile(pickedFile)
            setIsValid(true)
            fileIsValid = true
        } else {
            setIsValid(false)
        }
        props.handleImageUpload(pickedFile)
    }

    useEffect(() => {
        if (!file){
            return
        }
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)

    }, [file])

    // opens the file picker
    const pickImgHandler = () => {
        filePickerRef.current.click()
    }

  return (
    <>
        <div className='input-controller'>
            <label htmlFor='image-picker'>Upload image</label>
            <input
                type='file' 
                id="input-controller" 
                accept='.jpg,.png,.jpeg'
                onChange={pickedHandler} 
                ref={filePickerRef}
                style={{display: 'none'}}
            />
        </div>
        {previewUrl ?
        <div className='img-preview'>
            <img src={previewUrl} alt="preview" />
        </div>
        : <p>Please provide an image</p>}
        <span className={'btn'} style={{maxWidth: "fit-content", margin: ".5rem 0"}} onClick={pickImgHandler}>Upload image</span>
    </>
  )
}

export default ImageUpload