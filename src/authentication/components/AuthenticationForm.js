import React, { useState }  from 'react'
import Input from '../../shared/UI/Input'
import useInput from '../../shared/hooks/use-input'
import Button from '../../shared/UI/Button'
import Container from '../../shared/UI/Container'
import useHttpClient from '../../shared/hooks/use-http'
import AuthCtx from '../../shared/context/auth-context'
import LoadingComponent from '../../shared/UI/LoadingComponent'
import Modal from '../../shared/UI/Modal'
export default function AuthenticationForm(props) {

    const [loginMode, setLoginMode] = React.useState(true)
    const {isLoading, errorStatus, sendRequest, clearError} = useHttpClient()
    const {value: emailValue, hasError: emailHasError, inputChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler} = useInput((email) => email.includes('@'))
    const {value: passwordValue, hasError: passwordHasError, inputChangeHandler: passwordChangeHandler, inputBlurHandler: passwordBlurHandler} = useInput((password) => password.trim().length > 2)
    const {value: confirmPasswordValue, hasError: confirmPasswordHasError, inputChangeHandler: confirmPasswordChangeHandler, inputBlurHandler: confirmPasswordBlurHandler} = useInput((confirmPassword) => confirmPassword.trim().length > 2)

    const authCtx = React.useContext(AuthCtx)

    let loginFormValid = !emailHasError && !passwordHasError && !confirmPasswordHasError
    let registrationFormValid = !emailHasError && !passwordHasError === !confirmPasswordHasError

    const switchModeHandler = () => {
        setLoginMode((prevState) => !prevState)
    }

    const authenticationSubmitHandler = async (event) => {
        event.preventDefault()
        clearError()
        if (loginMode){
            try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/login`,
                "POST",
                {},
                {
                    email: emailValue,
                    password: passwordValue
                },
            )
                authCtx.login(responseData?.user.userId, responseData?.token)
            } catch(err){}
        } else {
            try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/signup`,
                "POST",
                {},
                {
                    email: emailValue,
                    password: passwordValue,
                    confirmPassword: confirmPasswordValue
                },
            )
            console.log(responseData)
            authCtx.login(responseData?.user.id, responseData?.token)
            } catch(err){
            }
        }
        }

    return (
        <>
        {isLoading && <LoadingComponent />}
        {!isLoading && errorStatus && <Modal error show={errorStatus} clearModal={clearError} content={errorStatus} />}
        <Container>
            <form className={`authentication-form center`} style={{width: 'fit-content'}} onSubmit={authenticationSubmitHandler}>
                <Input
                    label="Email"
                    id="email"
                    isValid={!emailHasError}
                    error="Email is not valid"
                    input={{type: "email", value: emailValue, onChange: emailChangeHandler, onBlur:  emailBlurHandler}} 
                    />
                <Input
                    label="Password"
                    id="password"
                    isValid={!passwordHasError}
                    error="Please provide a valid password"
                    input={{type: "password", value: passwordValue, onChange: passwordChangeHandler, onBlur:  passwordBlurHandler}} 
                />
                {loginMode ?  
                    <Button type="submit" disabled={!loginFormValid}>Login</Button>
                    :
                    <>
                        <Input
                        label="Confirm Password"
                        id="confirmPassword"
                        isValid={!confirmPasswordHasError}
                        error="Please provide a valid password confirmation."
                        input={{type: "password", value: confirmPasswordValue, onChange: confirmPasswordChangeHandler, onBlur:  confirmPasswordBlurHandler}} 
                        />
                        <Button type="submit" disabled={!registrationFormValid}>Register</Button>
                    </>
                }
            </form>
        <Button onClick={switchModeHandler} inverse>Switch to {loginMode ? "Registration" : "Login"}</Button>
    </Container>
    </>
)
}
