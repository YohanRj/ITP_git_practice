import { ALL_SUPPLIEDITEMS_REQUEST, 
         ALL_SUPPLIEDITEMS_SUCCESS, 
         ALL_SUPPLIEDITEMS_FAIL,
         CLEAR_ERRORS,
         UPDATE_SUPPLIEDITEMS_REQUEST,
         UPDATE_SUPPLIEDITEMS_SUCCESS,
         UPDATE_SUPPLIEDITEMS_FAIL,
         UPDATE_SUPPLIEDITEMS_RESET,
         DELETE_SUPPLIEDITEMS_REQUEST,
         DELETE_SUPPLIEDITEMS_SUCCESS,
         DELETE_SUPPLIEDITEMS_FAIL,
         DELETE_SUPPLIEDITEMS_RESET,
         NEW_SUPPLIEDITEMS_REQUEST,
         NEW_SUPPLIEDITEMS_SUCCESS,
         NEW_SUPPLIEDITEMS_FAIL,
         NEW_SUPPLIEDITEMS_RESET,
         SINGLE_SUPPLIEDITEM_REQUEST,
         SINGLE_SUPPLIEDITEM_SUCCESS,
         SINGLE_SUPPLIEDITEM_FAIL
    // SINGLE_SUPPLIEDITEM_RESET
         
} from '../constants/suppliedItemConstants'

export const suppliedItemReducers = (state = { supplied_items:[] }, action) => {
    switch(action.type) {
        case ALL_SUPPLIEDITEMS_REQUEST:
            return {
                loading: true,
                supplied_items: []
            }
        case ALL_SUPPLIEDITEMS_SUCCESS:
            return {
                loading: false,
                supplied_items: action.payload.supplied_item,
                Total_Item_Count: action.payload.totItemCount
            }
        case ALL_SUPPLIEDITEMS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}


export const changeSuppliedItemReducers = (state = { supplied_items:[] }, action) => {
    switch(action.type) {
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case DELETE_SUPPLIEDITEMS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_SUPPLIEDITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case DELETE_SUPPLIEDITEMS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case DELETE_SUPPLIEDITEMS_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_SUPPLIEDITEMS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_SUPPLIEDITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case UPDATE_SUPPLIEDITEMS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case UPDATE_SUPPLIEDITEMS_RESET:
            return {
                ...state,
                isUpdated: false
            }
        default:
            return state;
    }
}

export const newSuppliedItemReducers = (state = { supplied_items:{} }, action) => {
    switch(action.type) {
        case NEW_SUPPLIEDITEMS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_SUPPLIEDITEMS_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                supplied_items: action.payload.supplied_items
            }
        case NEW_SUPPLIEDITEMS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case NEW_SUPPLIEDITEMS_RESET:
            return {
                ...state,
                success: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const singleSuppliedItemReducers = (state = { }, action) => {
    switch(action.type) {
        case SINGLE_SUPPLIEDITEM_REQUEST:
            return {
                loading: true,
                single_supplied_item:[]
                // supplied_items: []
            }
        case SINGLE_SUPPLIEDITEM_SUCCESS:
            return {
                loading: false,
                single_supplied_item: action.payload,
                // supplied_items: action.payload.supplied_item,
                // Total_Item_Count: action.payload.totItemCount
            }
        case SINGLE_SUPPLIEDITEM_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}