import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { suppliedItemReducers, changeSuppliedItemReducers, newSuppliedItemReducers, singleSuppliedItemReducers } from './reducers/suppliedItemReducers'

import { changeSupplierReducers, supplierReducers, newSupplierReducers, singleSupplierReducers } from './reducers/supplierReducers'

import { supplyReducers, changeSupplyReducers, newSupplyReducers } from './reducers/supplyReducers'

const reducer = combineReducers({
    supplied_items: suppliedItemReducers,
    change_supplied_items: changeSuppliedItemReducers,
    new_supplied_items: newSuppliedItemReducers,
    single_supplied_item: singleSuppliedItemReducers,

    suppliers: supplierReducers,
    change_suppliers: changeSupplierReducers,
    newSuppliers: newSupplierReducers,
    supplierDetails: singleSupplierReducers,

    supplies: supplyReducers,
    change_supplies: changeSupplyReducers,
    newSupplies: newSupplyReducers
})

let initialState = {}

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;