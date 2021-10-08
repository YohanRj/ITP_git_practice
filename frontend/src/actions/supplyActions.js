import axios from 'axios';

import { 
    ALL_SUPPLIES_REQUEST, 
    ALL_SUPPLIES_SUCCESS, 
    ALL_SUPPLIES_FAIL,
    CLEAR_ERRORS,
    UPDATE_SUPPLIES_REQUEST,
    UPDATE_SUPPLIES_SUCCESS,
    UPDATE_SUPPLIES_FAIL,
    // UPDATE_SUPPLIES_RESET
    DELETE_SUPPLIES_REQUEST,
    DELETE_SUPPLIES_SUCCESS,
    DELETE_SUPPLIES_FAIL,
    NEW_SUPPLIES_REQUEST,
    NEW_SUPPLIES_SUCCESS,
    NEW_SUPPLIES_FAIL,
    // NEW_SUPPLIES_RESET

} from '../constants/supplyConstants'


export const getSupplies = (keyword='') => async (dispatch) => {
    try {
        dispatch({ type: ALL_SUPPLIES_REQUEST })

        const { data } = await axios.get(`/api/v1/supplies?keyword=${keyword}`)

        dispatch({
            type: ALL_SUPPLIES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_SUPPLIES_FAIL,
            payload: error.response.data.message
        })
    }
}

//Clearing of errors
export const clearErros =() => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}


//Update Supply Data
export const updateSupplies = (id, supplyData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SUPPLIES_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/supplies/update/:${id}`, supplyData, config)

        dispatch({
            type: UPDATE_SUPPLIES_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_SUPPLIES_FAIL,
            payload: error.response.data.message
        })
    }
}


//Delete Supply Data
export const deleteSupply = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_SUPPLIES_REQUEST })

        const { data } = await axios.delete(`/api/v1/supplies/delete/${id}`)

        dispatch({
            type: DELETE_SUPPLIES_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_SUPPLIES_FAIL,
            payload: error.response.data.message
        })
    }
}


//Create Supply Data
export const newSupply = (supplyData) => async (dispatch) => {
    alert(JSON.stringify(supplyData));
    try {
        dispatch({ type: NEW_SUPPLIES_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post(`/api/v1/supplies/new`, supplyData, config)

        dispatch({
            type: NEW_SUPPLIES_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_SUPPLIES_FAIL,
            payload: error.response.data.message
        })
    }
}