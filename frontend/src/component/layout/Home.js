import React, { Fragment } from 'react'
import '../../App.css'
import '../style/Pages_thiran.css'

export const Home = () => {
    return (
        <Fragment>

            <sector>

            <div className="thiran_parallax1">
                <button> Inventory Management Home </button>
                <button> Register Supplier </button>
            </div>
            <div className="thiran_parallax2">
                <button> Order Management Home </button>
                <button> Place Order </button>
            </div>
            <div className="thiran_parallax3">
                <button> User Management Home </button>
                <button> Register User </button>
            </div>

            </sector>
        </Fragment>
    )
}