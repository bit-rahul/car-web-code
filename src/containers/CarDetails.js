import React, { Component } from 'react'
import './body-style.css'
import Carousel from '../components/Carousel'
import img1 from '../components/assets/i10-n.JPG'
import img2 from '../components/assets/i10-1.jpg'
import img3 from '../components/assets/i10-2.jpg'
import demo from '../components/assets/demo.jpg'
import demo2 from '../components/assets/demo2.jpg'
import demo3 from '../components/assets/demo3.png'
import Header from '../components/header'
import Footer from '../components/Footer'
import {Ripple} from 'react-awesome-spinners'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import api from '../server/apiMiddleWare'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  
export default class CarDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            snackmsg: false,
            msg: "",
            car_details: {},
            booking_details: {
            }
        }
        this.toggle = this.toggle.bind(this)
        this.getCarDetails = this.getCarDetails.bind(this)
    }

    async deleteBooking(){
        let id = this.state.car_details._id
        let formData = {}
        formData.booked = false
        formData.booking_details = {
            name: "",
            phone: "",
            issue_date: "",
            return_date: ""
        }
        await axios
        .put(api.URL + "cars/" + id, formData)
        .then((res) => {
            console.log("After Submit", res);
            this.setState({
                modal: false
            })
            this.getCarDetails()
        })
        .catch((err) =>{
            console.log("Error on Deletion:", err)
            this.setState({
                snackmsg: true,
                msg: err
            })
        })
    }

    async getCarDetails() {
        console.log("HII")
        let model = this.props.location.state.model;
        await axios
            .get(api.URL + "car-details?model=" + model)
            .then((res) => {
                console.log("Result", res.data)
                let booking_details = this.state.booking_details
                booking_details.name = res.data.booking_details.name
                booking_details.phone = res.data.booking_details.phone
                booking_details.issue_date = res.data.booking_details.issue_date
                booking_details.return_date = res.data.booking_details.return_date
                this.setState({
                    car_details: res.data,
                    booking_details
                })
                // console.log("Car Details", this.state.car_details.booking_details.name)
            })
            .catch((err) => {
                console.log("Error:", err)
            })
    }

    componentDidMount() {
        this.getCarDetails();
    }

    toggle(e){
        let modal = this.state.modal
        this.setState({
          modal: !modal
        });
    }

    handleClose() {
        this.setState({ snackmsg: false })
    };
      
    render() {
        return (
            <>
            <Snackbar open={this.state.snackmsg} autoHideDuration={2000} onClose={this.handleClose.bind(this)}>
                    <Alert onClose={this.handleClose.bind(this)} severity="error">
                        An error occurred while booking. Please try again later! 
                    </Alert>
                </Snackbar>
                <Header />
                <Modal
                    show={this.state.modal}
                    onHide={this.toggle}
                    animation={true}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-sm">
                            <span style = {{fontWeight: "600"}}>
                        Are you sure you want to delete the booking?
                            </span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div style={{float:"right"}}>
                    <button type="button" className="btn btn-secondary" onClick={this.toggle}>
                                            No
                    </button>
                    &nbsp; &nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.deleteBooking.bind(this)}>
                                            Yes
                    </button>
                    </div>
                    </Modal.Body>
                </Modal>
                {
                    this.state.car_details.name
                    ?
                    (
                        <div>
                    <div className="col-md-9 container mb-4">
                        <div className="card" style={{ height: "300px" }}>
                            <div className="row">
                                <div className="col-md-7 p-0">
                                    {
                                        this.state.car_details.model === 'Hyundai_Grand_i10'
                                            ?
                                            (<Carousel
                                                img1={img1}
                                                img2={img2}
                                                img3={img3}
                                            />)
                                            :
                                            <Carousel
                                                img1={demo}
                                                img2={demo2}
                                                img3={demo3}
                                            />
                                    }
                                </div>
                                <div className="col-md-5 px-3">
                                    <div className="card-block px-6">
                                        <h1 className="head">
                                            {this.state.car_details.name}
                                        </h1>
                                        <br />
                                        <p className="card-text" style={{ fontSize: "12px", fontWeight: 500 }}>
                                            <i className="fas fa-eye-dropper">&nbsp; &nbsp;</i>
                                            {this.state.car_details.color} &nbsp; &nbsp; &nbsp; &nbsp;
                                        <i className="fas fa-couch">&nbsp; &nbsp;</i>
                                            {this.state.car_details.seater} &nbsp; &nbsp; &nbsp; &nbsp;
                                    </p>
                                        <br />
                                        <p className="card-text">
                                            <span style={{ color: "#222832", fontSize: "16px" }}>Rent per Day: &nbsp; &nbsp;</span>
                                            <span style={{ color: "#222832", fontSize: "22px" }}>&#8377; {this.state.car_details.rent}</span>
                                        </p>
                                        <br />
                                        <Link to={{
                                                    pathname: '/car-web/book-now',
                                                    state: this.state.car_details
                                                }}>
                                        {this.state.car_details.booked == true
                                            ?
                                            (<button type="button" className="btn btn-secondary btn-lg dis"
                                                disabled
                                            >
                                                Book Now</button>)
                                            :
                                            (<button type="button" className="btn btn-secondary btn-lg"
                                            >
                                                Book Now</button>)

                                        }
                                        </Link>
                                        {this.state.car_details.booked == true
                                            ?
                                            (<span style={{ color: "#FC5264" }}>&nbsp; &nbsp; &nbsp;Currently unavailable!</span>)
                                            :
                                            null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 mb-4">
                            <h4 style={{ color: "#697C90", fontWeight: "600", marginTop: "50px" }}>Car Details</h4>
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
                                    {this.state.car_details.booked == false
                                        ?
                                        <span className = "badge badge-success"
                                        style = {{ padding: "10px", fontWeight: "500" }}
                                    >Available &nbsp;
        
                                    <i className="fas fa-check"></i></span>
                                            :
                                            <span className = "badge badge-secondary"
                                style = {{ padding: "10px", fontWeight: "500", backgroundColor: "#959795" }}
                            >Not Available &nbsp;

                            <i className="fas fa-times"></i></span>}
                        </h3>
                        </p>
                        <p>
                            Vehicle Number: {this.state.car_details.vehicle_number}
                        </p>
                        <p>
                            {this.state.car_details.fuel_type} Car
                        </p>
                        <p>
                            {this.state.car_details.about}
                        </p>
                        <p>
                            {this.state.car_details.description}
                            </p>
                    </div>
                    <br />
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
                                <td>{this.state.booking_details.name}</td>
                                <td>{this.state.booking_details.phone}</td>
                                <td>{this.state.booking_details.issue_date === "" ? 
                                <span style ={{fontWeight: 600}}>No Booking Yet!</span> : this.state.booking_details.issue_date}</td>
                                <td>{this.state.booking_details.return_date}</td>
                                <Link to={{
                                                    pathname: '/car-web/book-now',
                                                    state: this.state.car_details
                                                }}>
                                                    {
                                                        this.state.car_details.booked == false
                                                        ?
                                                        <button type="button" className="btn btn-secondary" disabled>
                                            Edit
                                </button>
                                :
                                <button type="button" className="btn btn-secondary">
                                            Edit
                                </button>


                                                    }
                                
                                </Link>
                                &nbsp; &nbsp;
                                {this.state.car_details.booked == false
                                    ?
                                    (
                                        <button type="button" className="btn btn-danger" disabled>
                                            Delete
                                        </button>
                                    )
                                    :
                                    <button type="button" className="btn btn-danger" onClick={this.toggle}>
                                            Delete
                                    </button>

                                }
                            </tr>
                            
                            
                        </table>
                    </div>
                    <hr
                        style={{
                            height: "0.000  1px"
                        }} />

                </div>
            </div>
            
                    )
                    :
                    <div style={{ margin: "2% 50% 0% 50%" }}>
                                <Ripple
                                    size= {500}
                                />
                            </div>
                }
                
            <Footer />
        </>
        )
    }
}
