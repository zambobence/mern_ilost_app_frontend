import React from 'react'
import { useReducer } from 'react'


const useSelect = (defaultValue) => {

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
                    value: defaultValue,
                    isTouched: false
                };
            default:
                return state
        }
    }
    





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

const fetchedData = (newVal) => {
    dispatch({type: "FETCH", val: newVal})
}


    return {
        value: selectState.value,
        isValid,
        hasError,
        selectChangeHandler,
        fetchedData,
        reset
    }


}
export default useSelect