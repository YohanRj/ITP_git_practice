import React, { Fragment, useState, useEffect } from 'react'
import '../../App.css'
import '../style/Pages_thiran.css'

import MetaData from './MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { newSupplier, clearErros } from '../../actions/supplierActions'
import { NEW_SUPPLIERS_RESET } from '../../constants/supplierConstants'

export const RegisterSupplier = ({history}) => {

    const [name, setSName] = useState('');
    const [nic, setSNIC] = useState('');
    const [contact, setSContact] = useState('');
    const [email, setSEmail] = useState('');
    const [gender, setSGender] = useState('');
    const [account, setSAcct] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newSuppliers);

    useEffect(() => {

        if(error) {
            alert.error(error);
            dispatch(clearErros());
        }

        if(success) {
            history.push('/all_suppliers');
            alert.success('Item created successfully');
            dispatch({ type: NEW_SUPPLIERS_RESET })
        }
        
    }, [dispatch, alert, error, success, history])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = {
        'supplier_name': name,
        'supp_nic': nic,
        'supp_contact_no': contact,
        'supp_email': email,
        'supp_gender': gender,
        'acct_no': account
        }
        
        dispatch(newSupplier(formData))
    }

    const onChange = e => {
 
        newSupplier ({...newSupplier, [e.target.name]: e.target.value})
 
    }


    return (
        <Fragment>
            <MetaData title={'Register Supplier'} />
            <div className="container_body">
                <div className="left">
                    <div class="header">
                        <h2 className="animation a1">Supplier Registration</h2>
                        <h4 className="animation a2">Register supplier using his/her personal details</h4>
                    </div>
                    
                    {/* Start of form */}
                    <form onSubmit={submitHandler}>
                    <div className="form">
                        <input type="text" className="form-field animation a3" placeholder="Supplier Name" onChange={(e) => setSName(e.target.value)} />
                        <input type="text" className="form-field animation a3" placeholder="NIC Number" onChange={(e) => setSNIC(e.target.value)} />
                        <input type="text" className="form-field animation a3" placeholder="Account Number" onChange={(e) => setSAcct(e.target.value)} />
                        <input type="text" className="form-field animation a3" placeholder="Contact Number" onChange={(e) => setSContact(e.target.value)} />
                        <input type="email" className="form-field animation a3" placeholder="Email Address" onChange={(e) => setSEmail(e.target.value)} />
                        <div className="registerSuppDiv1">
                            <label> Gender </label>
                            <div className="registerSuppDiv2">
                                <label> Male </label>
                                <input type="radio" name="gender" style={{marginRight:"20px"}} className="form-field animation a3" onChange={(e) => setSGender('Male')} />
                                <label> Female </label>
                                <input type="radio" name="gender" className="form-field animation a3" onChange={(e) => setSGender('Female')} />
                            </div>
                        </div>
                        <button> SUBMIT </button>
                    </div>
                    </form>
                    {/* End of form */}
                    </div>
                    <div className="right_suppReg"></div>
                </div>
        </Fragment>
    )
}