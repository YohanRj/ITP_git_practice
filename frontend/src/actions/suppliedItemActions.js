import axios from 'axios';

import { 
    ALL_SUPPLIEDITEMS_REQUEST, 
    ALL_SUPPLIEDITEMS_SUCCESS, 
    ALL_SUPPLIEDITEMS_FAIL,
    CLEAR_ERRORS,
    UPDATE_SUPPLIEDITEMS_REQUEST,
    UPDATE_SUPPLIEDITEMS_SUCCESS,
    UPDATE_SUPPLIEDITEMS_FAIL,
    // UPDATE_SUPPLIEDITEMS_RESET
    DELETE_SUPPLIEDITEMS_REQUEST,
    DELETE_SUPPLIEDITEMS_SUCCESS,
    DELETE_SUPPLIEDITEMS_FAIL,
    NEW_SUPPLIEDITEMS_REQUEST,
    NEW_SUPPLIEDITEMS_SUCCESS,
    NEW_SUPPLIEDITEMS_FAIL,
    // NEW_SUPPLIEDITEMS_RESET,
    SINGLE_SUPPLIEDITEM_REQUEST,
    SINGLE_SUPPLIEDITEM_SUCCESS,
    SINGLE_SUPPLIEDITEM_FAIL
    // SINGLE_SUPPLIEDITEM_RESET



} from '../constants/suppliedItemConstants'


export const getSuppliedItems = (keyword = '', currentPage = 1) => async (dispatch) => {
    try {
        dispatch({ type: ALL_SUPPLIEDITEMS_REQUEST })

        const { data } = await axios.get(`/api/v1/suppliedItems?keyword=${keyword}&page=${currentPage}`)

        dispatch({
            type: ALL_SUPPLIEDITEMS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_SUPPLIEDITEMS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getSingleSuppliedItem = (id) => async (dispatch) => {

    try{
        dispatch({ type: SINGLE_SUPPLIEDITEM_REQUEST })

        const { data } = await axios.get(`/api/v1/suppliedItems/${id}`)
        // alert(JSON.stringify(data))

        dispatch({

            type: SINGLE_SUPPLIEDITEM_SUCCESS,
            payload: data.single_supplied_item

        })

    } catch (error) {

        dispatch({
            type: SINGLE_SUPPLIEDITEM_FAIL,
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



//Update Supplied Item
export const updateSuppliedItems = (id, suppliedItemData) => async (dispatch) => {
    
    try {
        dispatch({ type: UPDATE_SUPPLIEDITEMS_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/suppliedItems/update/:${id}`, suppliedItemData, config)

        dispatch({
            type: UPDATE_SUPPLIEDITEMS_SUCCESS,
            payload: data.success
            // payload: suppliedItemData.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_SUPPLIEDITEMS_FAIL,
            payload: error.response.data.message
        })
    }
}


//Delete Supplied Item
export const deleteProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_SUPPLIEDITEMS_REQUEST })

        const { data } = await axios.delete(`/api/v1/suppliedItems/delete/${id}`)

        dispatch({
            type: DELETE_SUPPLIEDITEMS_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_SUPPLIEDITEMS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newSuppliedItems = (suppliedItemData) => async (dispatch) => {
    alert(JSON.stringify(suppliedItemData));
    try{
        dispatch({type: NEW_SUPPLIEDITEMS_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'string'
            }
        };

        const { data } = await axios.post(`/api/v1/suppliedItems/new`, suppliedItemData, config)

        dispatch({
            type: NEW_SUPPLIEDITEMS_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: NEW_SUPPLIEDITEMS_FAIL,
            payload: error.response.data.message
        })
    }
}