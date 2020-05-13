import React, { Component } from 'react'
import img1 from '../components/assets/i10.jpg'
import img2 from '../components/assets/ford.JPG'
import img3 from '../components/assets/maruti.JPG'
import img4 from '../components/assets/honda.JPG'
import img from '../components/assets/car.png'
import '../containers/body-style.css'
import Booking from './Booking'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
// import history from '../components/history'
import axios from 'axios'
import api from '../server/apiMiddleWare'
import { Ripple } from 'react-awesome-spinners'


export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [img1, img2, img3, img4],
            cars: []
        }
    }

    async getCars() {
        await axios
            .get(api.URL + "cars")
            .then((result) => {
                this.setState({
                    cars: result.data
                })
                // console.log("Dashhh", result.data)
            })
            .catch((error) => {
                console.log("Error in getting cars:", error)
            })
    }
    componentDidMount() {
        console.log("hiiii", this.props)
        this.getCars();
    }
    render() {
        return (
            <>
                {/* <Route
                    path='/book-now'
                    render={props => <Booking text="Hello, " {...props} />}
                /> */}
                <div>
                    <div className="col-md-11 container mb-4">
                        <h4 style={{ fontWeight: "600", marginTop: "50px" }}>Car for rent</h4>
                        <hr />
                    </div>
                    <div className="col-md-4 container" style={{ color: "#697C90" }}>
                        <h3 style={{ fontWeight: "bolder" }}><span style={{ marginRight: "150px" }}>Car Details</span>
                            <span>RENT PER DAY</span>
                        </h3>
                    </div>
                    {
                        this.state.cars.length === 0
                            ?
                            <div style={{ margin: "2% 50% 2% 50%" }}>
                                <Ripple
                                    size= {500}
                                />
                            </div>
                            :
                            this.state.cars.map((car, index) =>
                                (
                                    <div className="col-md-10 container">
                                        <div className="card" style={{ height: "100px" }}>
                                            <div className="row">
                                                <div className="col-md-3" style={{ marginRight: "20px" }}>
                                                    {/* this.state.images[index] */}
                                                    <img src={
                                                        car.model === 'Hyundai_Grand_i10'
                                                            ?
                                                            img1
                                                            :
                                                            (
                                                                car.model === 'Ford_EcoSport'
                                                                    ?
                                                                    img2
                                                                    :
                                                                    (
                                                                        car.model === 'Maruti_Suzuki_XL6'
                                                                            ?
                                                                            img3
                                                                            :
                                                                            (
                                                                                car.model === 'Honda_CR-V'
                                                                                    ?
                                                                                    img4
                                                                                    :
                                                                                    img
                                                                            )
                                                                    )
                                                            )
                                                    }
                                                        style={{ width: "250px", height: "100px" }}
                                                    />
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="card-b">
                                                        <h6 className="card-title">
                                                            {car.name}
                                                        </h6>
                                                        <p></p>
                                                        <p className="card-text" style={{ fontSize: "12px", fontWeight: 500 }}>
                                                            <i className="fas fa-eye-dropper">&nbsp; &nbsp;</i>
                                                            {car.color} &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;
                                        <i className="fas fa-couch">&nbsp; &nbsp;</i>
                                                            {car.seater} &nbsp; &nbsp;
                                    </p>
                                                    </div>
                                                </div>

                                                <div className="col-md-2" style={{ marginRight: "0px!important" }}>
                                                    <div className="card-b">
                                                        <h3>
                                                            <br />
                                                            <span style={{ fontWeight: "700", fontSize: "16px", }}>
                                                                &#8377; {car.rent}
                                                            </span>
                                                        </h3>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="card-b2">
                                                        <Link to={{
                                                            pathname: '/car-web/book-now',
                                                            state: car
                                                        }}>
                                                            {car.booked == true
                                                                ?
                                                                (<button type="button" className="btn btn-secondary dis"
                                                                    disabled
                                                                >
                                                                    Book Now</button>)
                                                                :
                                                                (<button type="button" className="btn btn-secondary"
                                                                >
                                                                    Book Now</button>)

                                                            }

                                                        </Link>
                                    &nbsp; &nbsp; &nbsp;
                                    <Link to={{
                                                            pathname: '/car-web/car-details',
                                                            state: car
                                                        }}>
                                                            <button type="button" className="btn btn-light">Details</button>
                                                        </Link>
                                                        {car.booked == true
                                                            ?
                                                            <span style={{ color: "red", fontSize: "10px" }}>Currently Unavailable!</span>
                                                            :
                                                            null
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )

                            )
                    }
                </div>
            </>
        )
    }
}
