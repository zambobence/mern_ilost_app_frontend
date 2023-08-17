import React, { useState }  from 'react'
import Input from '../../shared/UI/Input'
import useInput from '../../shared/hooks/use-input'
import Button from '../../shared/UI/Button'
import Container from '../../shared/UI/Container'
export default function AuthenticationForm(props) {

    const [loginMode, setLoginMode] = React.useState(true)

    const {value: emailValue, hasError: emailHasError, inputChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler} = useInput((email) => !email.includes('@'))
    const {value: passwordValue, hasError: passwordHasError, inputChangeHandler: passwordChangeHandler, inputBlurHandler: passwordBlurHandler} = useInput((email) => !email.includes('@'))
    const {value: confirmPasswordValue, hasError: confirmPasswordHasError, inputChangeHandler: confirmPasswordChangeHandler, inputBlurHandler: confirmPasswordBlurHandler} = useInput((email) => !email.includes('@'))

    let loginFormValid = !emailHasError && !passwordHasError && !confirmPasswordHasError
    let registrationFormValid = !emailHasError && !passwordHasError === !confirmPasswordHasError

    const switchModeHandler = () => {
        setLoginMode((prevState) => !prevState)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        if (loginFormValid) {
            console.log("Login form valid")
        } else if (registrationFormValid) {
            console.log("Registration form valid")
        }
    }

    return (
        <Container>
            <form className={`form ${props.className}`} onSubmit={submitHandler}>
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
                <Input
                    label="Confirm Password"
                    id="confirmPassword"
                    isValid={!confirmPasswordHasError}
                    error="Please provide a valid password confirmation."
                    input={{type: "confirmPassword", value: confirmPasswordValue, onChange: confirmPasswordChangeHandler, onBlur:  confirmPasswordBlurHandler}} 
                />
                {loginFormValid ? <p>Form valid</p> : <p>Form invalid</p>}
                {loginFormValid 
                    ? <Button type="submit" disabled={!loginFormValid}>Login</Button>
                    : <Button type="submit" disabled={!registrationFormValid}>Register</Button>
                }
            </form>
        <Button onClick={switchModeHandler}>Switch to {loginMode ? "Registration" : "Login"}</Button>
    </Container>
)
}
