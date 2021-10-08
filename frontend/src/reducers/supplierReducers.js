import { ALL_SUPPLIERS_REQUEST, 
    ALL_SUPPLIERS_SUCCESS, 
    ALL_SUPPLIERS_FAIL,
    CLEAR_ERRORS,
    UPDATE_SUPPLIERS_REQUEST,
    UPDATE_SUPPLIERS_SUCCESS,
    UPDATE_SUPPLIERS_FAIL,
    UPDATE_SUPPLIERS_RESET,
    DELETE_SUPPLIERS_REQUEST,
    DELETE_SUPPLIERS_SUCCESS,
    DELETE_SUPPLIERS_FAIL,
    DELETE_SUPPLIERS_RESET,
    NEW_SUPPLIERS_REQUEST,
    NEW_SUPPLIERS_SUCCESS,
    NEW_SUPPLIERS_FAIL,
    NEW_SUPPLIERS_RESET,
    SINGLE_SUPPLIERS_REQUEST,
    SINGLE_SUPPLIERS_SUCCESS,
    SINGLE_SUPPLIERS_FAIL

} from '../constants/supplierConstants'

export const supplierReducers = (state = { suppliers:[] }, action) => {
switch(action.type) {
   case ALL_SUPPLIERS_REQUEST:
       return {
           loading: true,
           suppliers: []
       }
   case ALL_SUPPLIERS_SUCCESS:
       return {
           loading: false,
           suppliers: action.payload.suppliers,
           Total_Supplier_Count: action.payload.totSuppliers
       }
   case ALL_SUPPLIERS_FAIL:
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


export const changeSupplierReducers = (state = { }, action) => {
switch(action.type) {
   case CLEAR_ERRORS:
       return {
           ...state,
           error: null
       }
   case DELETE_SUPPLIERS_REQUEST:
       return {
           ...state,
           loading: true
       }
   case DELETE_SUPPLIERS_SUCCESS:
       return {
           ...state,
           loading: false,
           isDeleted: action.payload
       }
   case DELETE_SUPPLIERS_FAIL:
       return {
           ...state,
           error: action.payload
       }
   case DELETE_SUPPLIERS_RESET:
       return {
           ...state,
           isDeleted: false
       }
   case UPDATE_SUPPLIERS_REQUEST:
       return {
           ...state,
           loading: true
       }
   case UPDATE_SUPPLIERS_SUCCESS:
       return {
           ...state,
           loading: false,
           isUpdated: action.payload
       }
   case UPDATE_SUPPLIERS_FAIL:
       return {
            ...state,
            // loading:false,
            error: action.payload
       }
   case UPDATE_SUPPLIERS_RESET:
       return {
           ...state,
           isUpdated: false
       }
   default:
       return state;
}
}

export const newSupplierReducers = (state = { suppliers:{} }, action) => {
    switch(action.type) {
        case NEW_SUPPLIERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_SUPPLIERS_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                suppliers: action.payload.suppliers
            }
        case NEW_SUPPLIERS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case NEW_SUPPLIERS_RESET:
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


export const singleSupplierReducers = (state = { Ssupplier:{} }, action) => {
    switch(action.type) {
       case SINGLE_SUPPLIERS_REQUEST:
           return {
               ...state,
               loading: true
           }
       case SINGLE_SUPPLIERS_SUCCESS:
           return {
                // ...state,
                loading: false,
                supplier: action.payload
                
           }
       case SINGLE_SUPPLIERS_FAIL:
           return {
                ...state,
                // loading: false,
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