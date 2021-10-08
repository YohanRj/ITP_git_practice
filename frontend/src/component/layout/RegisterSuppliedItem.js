import React, { Fragment, useState, useEffect } from 'react'
import '../../App.css'
import '../style/Pages_thiran.css'

import MetaData from './MetaData';
import Swal from 'sweetalert2'

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { newSuppliedItems, clearErros } from '../../actions/suppliedItemActions'
import { NEW_SUPPLIEDITEMS_RESET } from '../../constants/suppliedItemConstants'


export const RegisterSuppliedItem = ({ history }) => {

    
        const [name, setSItemName] = useState('');
        const [price, setSItemPrice] = useState(0);
        const [description, setSItemDescription] = useState('');
        const [suppID, setSuppID] = useState('');
        const [suppItemID, setSItemID] = useState('');
        const [quantity, setQuantity] = useState(0);
        const [date, setDate] = useState('');

    
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.new_supplied_items);

    useEffect(() => {

        if(error) {
            alert.error(error);
            dispatch(clearErros());
        }

        if(success) {
            history.push('/all_supplied_items');
            alert.success('Item created successfully');
            dispatch({ type: NEW_SUPPLIEDITEMS_RESET })
        }
        
    }, [dispatch, alert, error, success, history])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = {
        's_item_name': name,
        's_item_price': price,
        's_item_description': description,
        'supplier_id': suppID,
        'supply_items_id': suppItemID,
        's_qty': quantity,
        'sup_date': date
        }
        
        dispatch(newSuppliedItems(formData))
    }

    const onChange = e => {
 
        newSuppliedItems ({...newSuppliedItems, [e.target.name]: e.target.value})
 
    }

    return (
        <Fragment className="container-fluid">
            <MetaData title={'Register Supplied Item'} />
            <div className="container_body">
                
            
                <div className="left">
                    <div class="header">
                        <h2 className="animation a1">Supplied Item Registration</h2>
                        <h4 className="animation a2">Register supplied item using relevant information</h4>
                </div>
                    
                    {/* Start of form */}
                        <form onSubmit={submitHandler}>
                        <div className="form">
                            <input type="text" className="form-field animation a3" placeholder="Item Name"  required name="name" pattern="[A-Za-z]+" onChange={(e) => setSItemName(e.target.value)} />
                            <input type="text" className="form-field animation a3" placeholder="Item Price"  required name="price"  onChange={(e) => setSItemPrice(e.target.value)} />
                            <input type="text" className="form-field animation a3" placeholder="Item Description"  required name="description"    onChange={(e) => setSItemDescription(e.target.value)} />
                            <input type="text" className="form-field animation a3" placeholder="Supplier ID" pattern="[S-S]{1}[0-9]{4}" required name="suppID"    onChange={(e) => setSuppID(e.target.value)} />
                            <input type="text" className="form-field animation a3" placeholder="Supplied Items ID" pattern="[T-T]{1}[0-9]{4}" required name="suppItemID"    onChange={(e) => setSItemID(e.target.value)} />
                            <input type="number" className="form-field animation a3" placeholder="Quantity" required name="quantity"    onChange={(e) => setQuantity(e.target.value)} />
                            <input type="date" className="form-field animation a3" required name="date"   onChange={(e) => setDate(e.target.value)} />
                            <button> SUBMIT </button>
                            {/* <FieldFeedbacks for="name">
                                <FieldFeedback when="valueMissing" />
                                <FieldFeedback when="patternMismatch">Should contain letters only</FieldFeedback>
                            </FieldFeedbacks> */}
                        </div>
                        </form>
                    
                </div>
                <div className="right_suppItemReg"></div>
            </div>
        </Fragment>
    )
}