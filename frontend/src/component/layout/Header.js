import React,{ Fragment } from 'react'


import '../style/header.css'

import { Route } from 'react-router-dom' //search
import Search from './Search';           //search

const Header = () => {
    return (
        <Fragment>
            
            <div className="container">
                <div className="navbar">
                    <nav>
                        <ul>
                            <li><a href="">HOME</a></li>
                            <li><a href="">MENU</a></li>
                            <img src="/images/cupcakes-(2).gif" className="logoheader"></img>
                            <li><a href="">REVIEWS</a></li>
                            <li><a href="">PROFILE</a></li>
                        </ul>
                        {/* <ul>
                            <Route render={({history}) => <Search history={history} /> } />
                        </ul> */}
                    </nav>    
                </div>
            </div>
        </Fragment>
    )
}

export default Header
 