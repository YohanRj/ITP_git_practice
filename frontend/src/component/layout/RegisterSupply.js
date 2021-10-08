import React, { Fragment, useState, useEffect } from 'react'
import '../../App.css'
import '../style/Pages_thiran.css'

import MetaData from './MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { newSupply, clearErros } from '../../actions/supplyActions'
import { NEW_SUPPLIES_RESET } from '../../constants/supplyConstants'

export const RegisterSupply = ({ history }) => {
    
    const [supplierID, setSupplierID] = useState('');
    const [itemID, setSuppItemID] = useState('');
    
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newSupplies );

    useEffect(() => {

        if(error) {
            alert.error(error);
            dispatch(clearErros());
        }

        if(success) {
            history.push('/all_supplies');
            alert.success('Item created successfully');
            dispatch({ type: NEW_SUPPLIES_RESET })
        }
        
    }, [dispatch, alert, error, success, history])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = {
        'supplier_id': supplierID,
        'supply_item_id': itemID
        }
        
        dispatch(newSupply(formData))
    }

    const onChange = e => {

        newSupply ({...newSupply, [e.target.name]: e.target.value})

    }

    return (
        <Fragment>
            <MetaData title={'Register Supply'} />
            <div className="container_body">
                <div className="left">
                    <div class="header">
                        <h2 className="animation a1">Supply Registration</h2>
                        <h4 className="animation a2">Register supply using information related to the supply</h4>
                    </div>
                    
                    {/* Start of form */}
                    <form onSubmit={submitHandler}>
                    <div className="form">
                        {/* <input type="date" className="form-field animation a3" placeholder="Date" onChange={(e) => setSuppItemID(e.target.value)} /> */}

                        <input type="text" className="form-field animation a3" placeholder="Items Code" onChange={(e) => setSuppItemID(e.target.value)} />
                        <input type="text" className="form-field animation a3" placeholder="Supplier ID" onChange={(e) => setSupplierID(e.target.value)} />

                        {/* <input type="number" className="form-field animation a3" placeholder="Quantity" onChange={(e) => setSItemName(e.target.value)} /> */}

                        <button> SUBMIT </button>
                    </div>
                    </form>
                    {/* End of form */}
                    </div>
                <div className="right_supplyReg"></div>
            </div>
        </Fragment>
    )
}