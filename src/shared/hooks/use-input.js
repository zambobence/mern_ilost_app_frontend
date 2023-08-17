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
        default:
            return state;
    }
}

const useInput = (validator) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: "",
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

    const reset = () => {
        dispatch({ type: "CHANGE", val: "" });
    };

    return {
        value: inputState.value,
        hasError,
        inputChangeHandler,
        inputBlurHandler,
        reset,
    };
}

export default useInput;