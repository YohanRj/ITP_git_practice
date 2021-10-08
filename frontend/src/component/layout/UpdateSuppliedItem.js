import React, { Fragment, useState, useEffect } from 'react'
import '../../App.css'
import '../style/Pages_thiran.css'

import MetaData from './MetaData';
import { useDispatch, useSelector } from 'react-redux'
import { updateSuppliedItems, getSingleSuppliedItem, clearErros } from '../../actions/suppliedItemActions'
import { useAlert } from 'react-alert';
import { UPDATE_SUPPLIEDITEMS_RESET } from '../../constants/suppliedItemConstants'

export const UpdateSuppliedItem = ( { match, history }) => {

    const [name, setSItemName] = useState('');
    const [price, setSItemPrice] = useState(0);
    const [description, setSItemDescription] = useState('');
    const [suppID, setSuppID] = useState('');
    const [suppItemID, setSItemID] = useState('');
    const [quantity, setQuantity] = useState();
    const [date, setDate] = useState('');
    
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, suppItem } = useSelector(state => state.single_supplied_item );
    // const {s_item_name, s_item_price, s_item_description, supplier_id, supply_items_id, s_qty, sup_date} = suppItem;
    const {  error:updateError, isUpdated } = useSelector(state => state.change_supplied_items );

    const suppliedItemID = match.params.id;

    useEffect(() => {

        //If the supplied item exists but the supplied item's id does not match, show the error
        //(Just in case that the id of the supplied item has changed)
        
        // if(suppItem && suppItem._id !== suppliedItemID) {
        //     dispatch(getSingleSuppliedItem(suppliedItemID)); //pass in the id of the required supplied item
        // } else {
            
        //     setSItemName(suppItem.s_item_name);
        //     setSItemPrice(suppItem.price);
        //     setSItemDescription(suppItem.description);
        //     setSuppID(suppItem.suppID);
        //     setSItemID(suppItem.suppliedItemID);
        //     setQuantity(suppItem.quantity);
        //     setDate(suppItem.date);

            
        // }


        if(suppItem) {
            setSItemName(suppItem.s_item_name);
            setSItemPrice(suppItem.s_item_price);
            setSItemDescription(suppItem.s_item_description);
            setSuppID(suppItem.supplier_id);
            setSItemID(suppItem.supply_items_id);
            setQuantity(suppItem.s_qty);
            setDate(suppItem.sup_date);
            // alert("Data set");
            alert("Data set")
        }
        // else {
        //     alert('Data not set')
        // }

        if(error) {
            alert.error(error)
            dispatch(clearErros())
        }

        if(updateError) {
            alert.error(updateError);
            dispatch(clearErros())
        }

        if(isUpdated) {
            history.push('../../all_supplied_items');
            alert.success('Supplied Item Updated Successfully')
            dispatch({type: UPDATE_SUPPLIEDITEMS_RESET})
        }

        // [dispatch, alert, error, isUpdated]
        dispatch(getSingleSuppliedItem(match.params.id)); //from suppliedItemActions

    // }, [dispatch, alert, error, isUpdated, history, updateError, suppItem, suppliedItemID, match.params.id])

    }, [dispatch, history, match.params.id])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('s_item_name', name);
        formData.set('s_item_price', price);
        formData.set('s_item_description', description);
        formData.set('supplier_id', suppID);
        formData.set('supply_items_id', suppItemID);
        formData.set('s_qty', quantity);
        formData.set('sup_date', date);

        // const formData = {
        //     's_item_name': name,
        //     's_item_price': price,
        //     's_item_description': description,
        //     'supplier_id': suppID,
        //     'supply_items_id': suppItemID,
        //     's_qty': quantity,
        //     'sup_date': date
        //     }

        dispatch(updateSuppliedItems(suppliedItemID, formData))
    }

    

    return (
        <Fragment className="container-fluid">
            <MetaData title={'Update Supplied Item'} />
            <div className="container_body">
                <div className="left">
                    <div class="header">
                        <h2 className="animation a1">Update Supplied Item</h2>
                        <h4 className="animation a2">Update supplied item information</h4>
                    </div>
                    
{/* 
                    <div className="form">
                        <input type="text" className="form-field animation a3" value={name} placeholder="Item Name" />
                        <input type="text" className="form-field animation a3" value={price} placeholder="Item Price" />
                        <input type="text" className="form-field animation a3" value={description} placeholder="Item Description" />
                        <input type="text" className="form-field animation a3" value={suppID} placeholder="Supplier ID" />
                        <input type="text" className="form-field animation a3" value={suppItemID} placeholder="Supplied Items ID" />
                        <input type="number" className="form-field animation a3" value={quantity} placeholder="Quantity" />
                        <input type="date" className="form-field animation a3" value={date}  />
                        <button
                            id="update_button"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            UPDATE
                        </button>
                    </div> */}

                    <form onSubmit={submitHandler} >
                    <div className="form">
                        <input type="text" className="form-field animation a3" value={setSItemName} placeholder="Item Name" />
                        <input type="text" className="form-field animation a3" value={setSItemPrice} placeholder="Item Price" />
                        <input type="text" className="form-field animation a3" value={setSItemDescription} placeholder="Item Description" />
                        <input type="text" className="form-field animation a3" value={setSuppID} placeholder="Supplier ID" />
                        <input type="text" className="form-field animation a3" value={setSItemID} placeholder="Supplied Items ID" />
                        <input type="number" className="form-field animation a3" value={setQuantity} placeholder="Quantity" />
                        <input type="date" className="form-field animation a3" value={setDate}  />
                        <button
                            id="update_button"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            UPDATE
                        </button>
                    </div>
                    </form>
                </div>
                <div className="right_suppItemReg"></div>
            </div>
        </Fragment>
    )
}