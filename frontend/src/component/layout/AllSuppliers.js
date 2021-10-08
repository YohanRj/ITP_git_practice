import React, { Fragment, useEffect } from 'react'
import '../../App.css'
import '../style/Pages_thiran.css'
import { Link } from 'react-router-dom';

import MetaData from './MetaData';
import Loader from './Loader';

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getSuppliers, deleteSupplier } from '../../actions/supplierActions'

import { Router, Route } from 'react-router-dom' //search
import Search2 from './Search2';         //search

import Swal from 'sweetalert2'
import { DELETE_SUPPLIERS_RESET } from '../../constants/supplierConstants';

export const AllSuppliers = ({match, history}) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, suppliers, error, totSuppliers, isDeleted } = useSelector(state => state.suppliers )

    const keyword2 = match.params.keyword2 //search

    useEffect(() => {
        if(error) {
            return alert.error(error)
        }

        if(isDeleted) {
            history.push("/all_suppliers");
            dispatch({type: DELETE_SUPPLIERS_RESET })
        }

        dispatch(getSuppliers(keyword2)); //from supplierActions //search
            
    }, [dispatch, alert, error, keyword2, isDeleted, history])


    const deleteSupplierHandler = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This operation cannot be undone",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            showConfirmButton: true,
            // confirmButtonText: 'Yes, Delete it!',
            // imageUrl: '../images/uovBaking.png',
            imageWidth: 300,
            imageHeight: 300,
        }).then((result) => {
            if (result.isConfirmed) {
            dispatch(deleteSupplier(id))
            Swal.fire(
                'Cancelled!',
                'Your Order has been Cancelled.',
                'success',
                
            )
            }
        })

    }

    // const deleteSupplierHandler = (id) => {
    //     dispatch(deleteSupplier(id))
        
    // }

    return(
        <Fragment className="container-fluid">
            {loading? <Loader /> : (
                //below code goes up when needed
                // <h1 style={{margin:"100px"}}> Loading Suppliers </h1>
                <Fragment>

                    <MetaData title={'All Suppliers'} />
                    
                    <div className="tableContainerThiran">
                        <ul className="responsive-table ulThiran">
                        <Route render={({history}) => <Search2 history={history} /> } />
                            <li className="table-header liThiran" >
                                <div className="col col-1">Supplier ID</div>
                                <div className="col col-2">Supplier Name</div>
                                <div className="col col-3">Supplier NIC</div>
                                <div className="col col-4">Supplier Account No</div>
                                <div className="col col-5">Supplier Gender</div>
                                <div className="col col-6">Supplier Contact No:</div>
                                <div className="col col-7">Supplier Email Address:</div>
                                <div className="col col-8">Action</div>
                            </li>

                            {suppliers && suppliers.map(suppliers => (                  
                            <li key={suppliers._id} className="table-row liThiran">
                                <div className="col col-1" data-label="Supplier ID">{suppliers._id}</div>
                                <div className="col col-2" data-label="Supplier Name">{suppliers.supplier_name}</div>
                                <div className="col col-2" data-label="Supplier NIC">{suppliers.supp_nic}</div>
                                <div className="col col-3" data-label="Supplier Account No:">{suppliers.acct_no}</div>
                                <div className="col col-4" data-label="Supplier Gender">{suppliers.supp_gender}</div>
                                <div className="col col-6" data-label="Supplier Contact No:">{suppliers.supp_contact_no}</div>
                                <div className="col col-7" data-label="Supplier Email Address:" >{suppliers.supp_email}</div>
                                <div className="col col-8" data-label="Date of Supply">
                                    <Link to={'/all_suppliers/after_deletion'}>
                                    
                                    <button className="deleteButtonThiran" onClick={() => deleteSupplierHandler(suppliers._id)}>DELETE</button>
                                    </Link>
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

<Router>
  <Route path="all_suppliers/after_deletion" component={AllSuppliers} exact />
</Router>