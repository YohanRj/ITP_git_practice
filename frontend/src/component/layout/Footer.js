
import React,{Fragment} from 'react'

// import "../../com/fontAwesomeIcones"
import '../style/footer.css'



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook,faInstagram,faWhatsapp,faTwitter,faYoutube,faTiktok,faPinterest } from '@fortawesome/free-brands-svg-icons'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
    return (
        <Fragment>
            <footer>
            
            <div className="row">
                <div className="col">
                    <img src="/images/cupcakes-(1).png" className="logo"></img>
                </div>
                <div className="col">
                    <div className="Title">
                    <p>Help celebrate a special day or commemorate a significant occasion with a sweet treat from Cupcakes & Cakery.</p><p>
                        Whether you are searching for a special birthday cake, or simply looking for a sweet ending to an everyday meal, 
                        Cupcakes & Cakery is sure to have something freshly baked to suit your mood. 
                        </p></div>
                </div>
                <div className="col">
                    <h3>Contact Us <div className="underlineAnimation"><span></span></div></h3>
                    <p className="contact">983/A/4</p>
                    <p className="contact">Nagahamulla,</p>
                    <p className="contact">Thalangama South,</p>
                    <p className="contact">Battaramulla .</p>
                    <p className="email">cupcakesandcakery@gmail.com</p>
                    <h4 className="contact"><i className="fas fa-phone-alt"></i> +94 112 554 165</h4>
                </div>
                <div className="col">
                    <h3>Navigations <div className="underlineAnimation"><span></span></div></h3>
                    <ul className="ulHeader">
                        <li><a href="">Home</a></li>
                        <li><a href="">Menu</a></li>
                        <li><a href="">Reviwes</a></li>
                        <li><a href="">Terms & Conditions</a></li>
                        <li><a href="">Profile</a></li>
                    </ul>

                </div>
            </div>
           
            <div className="rowcopy">
                <div className="social-icons">
                    <FontAwesomeIcon icon={faFacebook} size="3x" fixedWidth ></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faInstagram} size="3x" fixedWidth></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faWhatsapp}size="3x" fixedWidth></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faTwitter} size="3x" fixedWidth></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faYoutube} size="3x" fixedWidth></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faTiktok} size="3x" fixedWidth></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faPinterest} size="3x" fixedWidth ></FontAwesomeIcon>
                </div>
            </div>
            <hr></hr>
            <p className="copyright">Nue Nimble Web Solutions <FontAwesomeIcon icon={faCopyright}/> 2021 - All Rights Reserved</p>
        </footer>
        </Fragment>
    )
}

export default Footer
 