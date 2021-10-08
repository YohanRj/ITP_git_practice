import axios from 'axios';

import { 
    ALL_SUPPLIERS_REQUEST, 
    ALL_SUPPLIERS_SUCCESS, 
    ALL_SUPPLIERS_FAIL,
    CLEAR_ERRORS,
    UPDATE_SUPPLIERS_REQUEST,
    UPDATE_SUPPLIERS_SUCCESS,
    UPDATE_SUPPLIERS_FAIL,
    // UPDATE_SUPPLIERS_RESET
    DELETE_SUPPLIERS_REQUEST,
    DELETE_SUPPLIERS_SUCCESS,
    DELETE_SUPPLIERS_FAIL,
    NEW_SUPPLIERS_REQUEST,
    NEW_SUPPLIERS_SUCCESS,
    NEW_SUPPLIERS_FAIL,
    SINGLE_SUPPLIERS_REQUEST,
    SINGLE_SUPPLIERS_SUCCESS,
    SINGLE_SUPPLIERS_FAIL,
    // SINGLE_SUPPLIERS_RESET
    
} from '../constants/supplierConstants'


export const getSuppliers = (keyword='') => async (dispatch) => {
    try {
        dispatch({ type: ALL_SUPPLIERS_REQUEST })

        const { data } = await axios.get(`/api/v1/suppliers?keyword=${keyword}`)

        dispatch({
            type: ALL_SUPPLIERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_SUPPLIERS_FAIL,
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


//Update Supplier
export const updateSuppliers = (id, supplier) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SUPPLIERS_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/suppliers/update/:${id}`, supplier, config)

        dispatch({
            type: UPDATE_SUPPLIERS_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_SUPPLIERS_FAIL,
            payload: error.response.data.message
        })
    }
}


//Delete Supplier
export const deleteSupplier = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_SUPPLIERS_REQUEST })

        const { data } = await axios.delete(`/api/v1/suppliers/delete/${id}`)

        dispatch({
            type: DELETE_SUPPLIERS_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_SUPPLIERS_FAIL,
            payload: error.response.data.message
        })
    }
}


//Create Supplier
export const newSupplier = (supplierData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_SUPPLIERS_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/suppliers/new`, supplierData, config)

        dispatch({
            type: NEW_SUPPLIERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_SUPPLIERS_FAIL,
            payload: error.response.data.message
        })
    }
}


//Single Supplier
export const getSingleSupplier = (id) => async (dispatch) => {
    try{
        
        dispatch({ type: SINGLE_SUPPLIERS_REQUEST })
        
        
        const { data } = await axios.get(`/api/v1/suppliers/${id}`);
        // alert(JSON.stringify(data))
        
        dispatch({
            type: SINGLE_SUPPLIERS_SUCCESS,
            payload: data.Ssupplier
        })
        

    } catch(error) {
        // alert('Supplier details were not recieved');
        dispatch({
            type: SINGLE_SUPPLIERS_FAIL,
            payload: error.response.data.message
        })
    }
}