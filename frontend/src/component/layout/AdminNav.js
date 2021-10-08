
import React,{Fragment} from 'react'

import '../style/admin_nav.css'
// import '../script/admin_nav'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { 
    faUserSecret,
    faThLarge,
    faBars,
    faUser,
    faUserTie,
    faTruckMoving,
    faFileInvoice,
    faWarehouse,
    faCommentDots,
    faStickyNote,
    faPrint,
    faSignOutAlt
                } from '@fortawesome/free-solid-svg-icons';

import { faOpera} from '@fortawesome/free-brands-svg-icons';

const Admin_nav = () => {
    return (
        <Fragment>
            
            
            <div className="sidebar">
            <div className="logoDetails">
                <div className="admin_logo">
                    
                <div className="i">
                    
                    <FontAwesomeIcon icon={faUserSecret}></FontAwesomeIcon></div>
               
                <div className="logo_name">Cupcakes & Cakery</div>
            </div>
            <i className="fas fa-arrow-right" id="btn" onclick="fuction()"></i>
            </div>
            <ul className="nav_links">
                <li>
                    <a href="#">
                    <div className="i">
                    <FontAwesomeIcon icon={faThLarge}></FontAwesomeIcon></div>
                 
                    <span className="link_name">DashBoard</span>
                    </a>
                <span className="tooltips">Dashboard</span>
                </li>
                <li>
                    <a href="#">
                    <div className="i">
                    <FontAwesomeIcon icon={faOpera}></FontAwesomeIcon></div>
                
                    <span className="link_name">Orders</span>
                    </a>
                   <span className="tooltips">Oders</span>
                </li>
                <li>
                    <a href="#">
                    <div className="i">
                    <FontAwesomeIcon icon={faBars}></FontAwesomeIcon></div>
              
                    <span className="link_name">Menu & Offer</span>
                    </a>
                    <span className="tooltips">Menu & Offers</span>
                </li>
                <li>
                    <a href="#">
                    <div className="i">
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon></div>
               
                    <span className="link_name">Customer</span>
                    </a>
                    <span className="tooltips">Customer</span>
                </li>
                <li>
                    <a href="#">
                    <div className="i">
                    <FontAwesomeIcon icon={faUserTie}></FontAwesomeIcon></div>
                
                    <span className="link_name">Employee</span>
                    </a>
                    <span className="tooltips">Employee</span>
                </li>
                <li>
                    <a href="#">
                    <div className="i">
                    <FontAwesomeIcon icon={faTruckMoving}></FontAwesomeIcon></div>
              
                    <span className="link_name">Delivery Management</span>
                    </a>
                    <span className="tooltips">Delivery Management</span>
                </li>
                <li>
                    <a href="#">
                    <div className="i">
                    <FontAwesomeIcon icon={faFileInvoice}></FontAwesomeIcon></div>
              
                    <span className="link_name">Finance Handling</span>
                    </a>
                    <span className="tooltips">Finance Handling</span>
                </li>
                <li>
                    <a href="#">
                    <div className="i">
                    <FontAwesomeIcon icon={faWarehouse}></FontAwesomeIcon></div>
               
                    <span className="link_name">Inventory Management</span>
                    </a>
                    <span className="tooltips">Inventory Management</span>
                </li>
                <li>
                    <a href="#">
                    <div className="i">
                    <FontAwesomeIcon icon={faCommentDots}></FontAwesomeIcon></div>
               
                    <span className="link_name">Feedbacks</span>
                    </a>
                    <span className="tooltips">Feedbacks</span>
                </li>
                <li>
                    <a href="#">
                    <div className="i">
                    <FontAwesomeIcon icon={faStickyNote}></FontAwesomeIcon></div>
              
                    <span className="link_name">Quotations</span>
                    </a>
                    <span className="tooltips">Quotations</span>
                </li>
                <li>
                    <a href="#">
                    <div className="i">
                    <FontAwesomeIcon icon={faPrint}></FontAwesomeIcon></div>
               
                    <span className="link_name">Report Generate</span>
                    </a>
                    <span className="tooltips">Report Generate</span>
                </li>
                <li className="sign_out" style={{background:"hotpink"}}>
                    <a href="#">
                    <div className="i">
                    <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon></div>
                    <span className="link_name">Sign Out</span>
                    </a>
                </li>
            </ul>
        </div>
        
        </Fragment>
    )
}

export default Admin_nav