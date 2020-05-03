import React, { Component } from 'react'
import './body-style.css'
import Carousel from '../components/Carousel'
import img1 from '../components/assets/i10-n.JPG'
import img2 from '../components/assets/i10-1.jpg'
import img3 from '../components/assets/i10-2.jpg'
import Header from '../components/header'
import Footer from '../components/Footer'

export default class CarDetails extends Component {
    render() {
        return (
            <>
            <Header/>

            <div>
                <div className="col-md-9 container mb-8">
                    <div className="card" style={{ height: "300px" }}>
                        <div className="row">
                            <div className="col-md-7 p-0">
                                <Carousel
                                    img1={img1}
                                    img2={img2}
                                    img3={img3}
                                />
                            </div>
                            <div className="col-md-5 px-3">
                                <div className="card-block px-6">
                                    <h1 className="head">
                                        Hyundai Grand i10
                                    </h1>
                                    <br />
                                    <p className="card-text" style={{ fontSize: "12px", fontWeight: 500 }}>
                                        <i className="fas fa-eye-dropper">&nbsp; &nbsp;</i>
                                        White &nbsp; &nbsp; &nbsp; &nbsp;
                                        <i className="fas fa-couch">&nbsp; &nbsp;</i>
                                        4 Seater &nbsp; &nbsp; &nbsp; &nbsp;
                                    </p>
                                    <br />
                                    <p className="card-text">
                                        <span style={{ color: "#222832", fontSize: "16px" }}>Rent per Day: &nbsp; &nbsp;</span>
                                        <span style={{ color: "#222832", fontSize: "22px" }}>&#8377; 350</span>
                                    </p>
                                    <br />
                                    <button type="button" className="btn btn-secondary btn-lg" disabled>Book Now</button>
                                    <span style={{ color: "#FC5264" }}>&nbsp; &nbsp; &nbsp;Currently unavailable!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 mb-4">
                        <h4 style={{ color: "#697C90", fontWeight: "600", marginTop: "50px"}}>Car Details</h4>
                        <hr style={{
                            height: "1.2px",
                            backgroundColor: "#697C90",
                            border: "none"
                        }}
                        />
                        <p>

                            </p>
                        <p>
                        <h3>
                            <span className="badge badge-secondary"
                                style={{ padding: "10px", fontWeight: "500", backgroundColor: "#959795" }}
                            >Not Available &nbsp;
                            
                            <i className="fas fa-times"></i></span>
                        </h3>
                        </p>
                        <p>
                        Vehicle Number: 18 D 4356
                        </p>
                        <p>
                        Petrol Car
                        </p>
                        <p>
                        1.2 Kappa Dual VTVT BS6 Petrol Engine
                        </p>
                        <p>
                        Hyundai GRAND i10 NIOS comes with Wonder Warranty options of upto 5 years Std. Customer can choose any warranty option as per his driving requirement at the time of new vehicle delivery.
                        From a strong body structure to Standard Dual airbags and ABS with EBD, maximum care has been taken to integrate a plethora of safety features.
                    </p>
                    </div>
                    <br/>
                    <div className="mt-4 mb-4">
                        <h4 style={{ color: "#697C90", fontWeight: "600" }}>Current Booking</h4>
                        <hr style={{
                            height: "1.2px",
                            backgroundColor: "#697C90",
                            border: "none"
                        }}
                        />
                        <table className="table table-borderless">
                            <thead>
                            <tr>
                                <th scope="col">NAME</th>
                                <th scope="col">PHONE NUMBER</th>
                                <th scope="col">ISSUE DATE</th>
                                <th scope="col">RETURN DATE</th>
                            </tr>
                            </thead>
                            <tr>
                                <td>John Doe</td>
                                <td>+91-7905654483</td>
                                <td>25th Jan '20</td>
                                <td>28th Jan '20</td>
                            </tr>
                        </table>
                    </div>
                    <hr
                    style={{
                        height: "0.000  1px"
                    }}/>

                </div>
            </div>
            <Footer/>
        </>
        )
    }
}
