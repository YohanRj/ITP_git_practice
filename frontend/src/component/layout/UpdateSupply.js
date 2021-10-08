import React, { Fragment } from 'react'
import '../../App.css'
import '../style/Pages_thiran.css'
import MetaData from './MetaData';


export const UpdateSupply = () => {
    return (
        <Fragment>
            <MetaData title={'Update Supply'} />
            <div className="container_body">
                <div className="left">
                    <div class="header">
                        <h2 className="animation a1">Update Supply</h2>
                        <h4 className="animation a2">Update supply information</h4>
                    </div>
                    
                    {/* Start of form */}
                    <div className="form">
                        <input type="text" className="form-field animation a3" placeholder="Supplier ID" />
                        <input type="date" className="form-field animation a3" placeholder="Date" />
                        <input type="text" className="form-field animation a3" placeholder="Items Code" />
                        <input type="number" className="form-field animation a3" placeholder="Quantity" />
                        <button onClick="alert()"> SUBMIT </button>
                    </div>
                    {/* End of form */}
                    </div>
                <div className="right_supplyReg"></div>
            </div>
        </Fragment>
    )
}