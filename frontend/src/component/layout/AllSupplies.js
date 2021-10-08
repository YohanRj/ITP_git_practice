import React, { Fragment, useEffect } from 'react'
import '../../App.css'
import '../style/Pages_thiran.css'

import MetaData from './MetaData';
import Loader from './Loader';
import Admin_nav from './AdminNav';

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getSupplies, deleteSupply } from '../../actions/supplyActions'

import { Route } from 'react-router-dom' //search
import Search3 from './Search3';          //search

export const AllSupplies = ({match, history}) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, supplies, error, totSupplies } = useSelector(state => state.supplies )

    const keyword3 = match.params.keyword3 //search

    useEffect(() => {
        if(error) {
            return alert.error(error)
        }

        dispatch(getSupplies(keyword3)); //from supplierActions //search
        // dispatch(getSuppliedItems(keyword)); //search

    }, [dispatch, alert, error, keyword3]) //'keyword' should be included for search function


    const deleteSupplyHandler = (id) => {
        dispatch(deleteSupply(id))
    }

    return(
        <Fragment className="container-fluid">
            {loading? <Loader /> : (
                //below code goes up when needed
                // <h1 style={{margin:"100px"}}> Loading Supplied Items </h1>
                <Fragment>

                    <MetaData title={'All Supplies'} />
                    <Admin_nav> </Admin_nav>
                    <div className="tableContainerThiran" style={{marginBottom:"500px"}}>
                        <ul className="responsive-table ulThiran">
                            {/* <input type="search" placeholder="input keyword" style={{marginLeft:'85%'}} /> */}
                            <Route render={({history}) => <Search3 history={history} /> } />
                            <li className="table-header liThiran" >
                                <div className="col col-1">Supply ID</div>
                                <div className="col col-2">Supplier ID</div>
                                <div className="col col-3">Supplied Item ID</div>
                                <div className="col col-4">Action</div>
                            </li>

                            {supplies && supplies.map(supplies => (                  
                            <li key={supplies._id} className="table-row liThiran">
                                <div className="col col-1" data-label="Supply ID">{supplies._id}</div>
                                <div className="col col-2" data-label="Supplier ID">{supplies.supplier_id}</div>
                                <div className="col col-2" data-label="Supplied Item ID">{supplies.supply_item_id}</div>
                                <div className="col col-3" data-label="Supplier Account No:">{supplies.acct_no}
                                    <button className="deleteButtonThiran" onClick={() => deleteSupplyHandler(supplies._id)}>DELETE</button>
                                    <button className="updateButtonThiran">UPDATE</button>
                                </div>
                            </li>
                            ))}

                        </ul>
                    </div>



                </Fragment>
            )}
        </Fragment>
    )

}