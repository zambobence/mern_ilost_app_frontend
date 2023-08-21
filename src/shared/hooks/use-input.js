import { useState, useReducer } from "react";

const inputReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.val,
            };
        case "TOUCH":
            return {
                ...state,
                isTouched: true
            };
        case "RESET": 
            return {
                value: "",
                isTouched: false
            };
        case "FETCH":
            return {
                ...state,
                value: action.val
            }

        default:
            return state;
    }
}

const useInput = (validator, initialValue) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: initialValue || "",
        isTouched: false,
    });

    const isValid = validator(inputState.value);
    const hasError = !isValid && inputState.isTouched

    const inputChangeHandler = (event) => {
        dispatch({ type: "CHANGE", val: event.target.value });
    };

    const inputBlurHandler = () => {
        dispatch({ type: "TOUCH" });
    };

    const fetchedData = (newVal) => {
        console.log(newVal)
        dispatch({type: "FETCH", val: newVal})
    }

    const reset = () => {
        dispatch({ type: "RESET"});
    };

    return {
        value: inputState.value,
        hasError,
        inputChangeHandler,
        inputBlurHandler,
        fetchedData,
        reset
    };
}

export default useInput;