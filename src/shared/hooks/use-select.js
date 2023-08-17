import React from 'react'
import { useReducer } from 'react'

const selectReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.val,
                isTouched: true
            }
        case "RESET":
            return {
                ...state,
                value: "",
                isTouched: false
            }
        default:
            return state
    }
}

const useSelect = (defaultValue) => {
    const [selectState, dispatch] = useReducer(selectReducer, {
        value: defaultValue, 
        isTouched: false
    })
    
    const isValid = selectState.value !== defaultValue
    const hasError = !isValid && selectState.isTouched


const selectChangeHandler = (event) => {
    event.preventDefault()
    dispatch({type: "CHANGE", val: event.target.value})
}

const reset = () => {
    dispatch({type: "RESET"})
}

    return {
        value: selectState.value,
        isValid,
        hasError,
        selectChangeHandler,
        reset
    }


}
export default useSelect