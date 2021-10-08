import { ALL_SUPPLIES_REQUEST, 
    ALL_SUPPLIES_SUCCESS, 
    ALL_SUPPLIES_FAIL,
    CLEAR_ERRORS,
    UPDATE_SUPPLIES_REQUEST,
    UPDATE_SUPPLIES_SUCCESS,
    UPDATE_SUPPLIES_FAIL,
    UPDATE_SUPPLIES_RESET,
    DELETE_SUPPLIES_REQUEST,
    DELETE_SUPPLIES_SUCCESS,
    DELETE_SUPPLIES_FAIL,
    DELETE_SUPPLIES_RESET,
    NEW_SUPPLIES_REQUEST,
    NEW_SUPPLIES_SUCCESS,
    NEW_SUPPLIES_FAIL,
    NEW_SUPPLIES_RESET

} from '../constants/supplyConstants'

export const supplyReducers = (state = { supplies:[] }, action) => {
switch(action.type) {
   case ALL_SUPPLIES_REQUEST:
       return {
           loading: true,
           supplies: []
       }
   case ALL_SUPPLIES_SUCCESS:
       return {
           loading: false,
           supplies: action.payload.supplies,
           Total_Supply_Count: action.payload.totSupplies
       }
   case ALL_SUPPLIES_FAIL:
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


export const changeSupplyReducers = (state = { supplies:[] }, action) => {
switch(action.type) {
   case CLEAR_ERRORS:
       return {
           ...state,
           error: null
       }
   case DELETE_SUPPLIES_REQUEST:
       return {
           ...state,
           loading: true
       }
   case DELETE_SUPPLIES_SUCCESS:
       return {
           ...state,
           loading: false,
           isDeleted: action.payload
       }
   case DELETE_SUPPLIES_FAIL:
       return {
           ...state,
           error: action.payload
       }
   case DELETE_SUPPLIES_RESET:
       return {
           ...state,
           isDeleted: false
       }
   case UPDATE_SUPPLIES_REQUEST:
       return {
           ...state,
           loading: true
       }
   case UPDATE_SUPPLIES_SUCCESS:
       return {
           ...state,
           loading: false,
           isUpdated: action.payload
       }
   case UPDATE_SUPPLIES_FAIL:
       return {
            ...state,
            error: action.payload
       }
   case UPDATE_SUPPLIES_RESET:
       return {
           ...state,
           isUpdated: false
       }
   default:
       return state;
}
}

export const newSupplyReducers = (state = { supplies:{} }, action) => {
    switch(action.type) {
        case NEW_SUPPLIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_SUPPLIES_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                supplies: action.payload.supplies
            }
        case NEW_SUPPLIES_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case NEW_SUPPLIES_RESET:
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