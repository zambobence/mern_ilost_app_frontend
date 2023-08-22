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

export default function EditUserComponent(props) {

    const {userId} = useParams()
    const [successStatus, setSuccessStatus] = useState(null)
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        phone: "",
    })

    const {value: firstNameValue, hasError: firstNameHasError, inputChangeHandler: firstNameChangeHandler, inputBlurHandler: firstNameBlurHandler, reset: firstNameReset, fetchedData: fetchedfirstName} = 
        useInput((value) => value.trim() === "")
    const {value: lastNameValue, hasError: lastNameHasError, inputChangeHandler: lastNameChangeHandler, inputBlurHandler: lastNameBlurHandler, reset: lastNameReset, fetchedData: fetchedLastName} = 
        useInput((value) => value.trim() === "")
    const {value: phoneValue, hasError: phoneHasError, inputChangeHandler: phoneChangeHandler, inputBlurHandler: phoneBlurHandler, reset: phoneReset, fetchedData: fetchedPhone} = 
        useInput((value) => value.trim() === "")

    const {isLoading, errorStatus, clearError, sendRequest} = useHttpClient()
    const {token} = useContext(AuthCtx)
    const navigate = useNavigate()

    const fetchUser = async () => {
        const loadedUser = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/user/${userId}`,
            'GET')
        setUserData(loadedUser?.user)
    }

    useEffect(() => {
        fetchUser()
    },[])


    const submitHandler = async (event) => {
        event.preventDefault()
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/user/${userId}`,
            "PATCH",
            {"Authorization": `Bearer ${token}`},
            {
                first_name: firstNameValue,
                last_name: lastNameValue,
                phone: phoneValue
            }
        )
        setSuccessStatus('User profile changed correctly.')
        setTimeout(() => {
            setSuccessStatus(null)
            navigate(`/user/${userId}`)
        }, 1500)
    }

    useEffect(() => {
        fetchedfirstName(userData.first_name || "")
        fetchedLastName(userData.last_name || "")
        fetchedPhone(userData.phone || "")

    },[userData])




    return (
        <>
        {!errorStatus && successStatus && !isLoading && <Modal success show={successStatus} content={successStatus}/>}
        {isLoading && <LoadingComponent />}
        {errorStatus && <Modal error show={errorStatus} clearModal={clearError} content={errorStatus} />}
        <Container>
            <form onSubmit={submitHandler}>
                <Input
                    label="First name"
                    id="firstName"
                    isValid={firstNameHasError}
                    error="First name is not valid"
                    input={{
                        type: "text",
                        value: firstNameValue,
                        onChange: firstNameChangeHandler,
                        onBlur:  firstNameBlurHandler
                    }}
                />
                <Input
                    label="Last name"
                    id="lastName"
                    isValid={lastNameHasError}
                    error="Last name is not valid"
                    input={{
                        type: "text",
                        value: lastNameValue,
                        onChange: lastNameChangeHandler,
                        onBlur:  lastNameBlurHandler
                    }}
                />
                <Input
                    label="Phone"
                    id="phone"
                    isValid={phoneHasError}
                    error="Phone number is not valid"
                    input={{
                        type: "text",
                        value: phoneValue,
                        onChange: phoneChangeHandler,
                        onBlur:  phoneBlurHandler
                    }}
                />
                <Button style={{marginTop: "1rem", width: 'fit-content'}} type="submit">Save changes</Button>
            </form>
        </Container>
    </>
    )
}
