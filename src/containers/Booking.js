import { createMuiTheme } from '@material-ui/core/styles';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Form } from 'react-final-form';
import bg1 from '../components/assets/bg1.JPG'
import img from '../components/assets/logo.PNG'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import modalbg from '../components/assets/modalbg.JPG'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar'
import {
    TextField,
    Checkboxes,
    Radios,
    Select,
    DatePicker,
    TimePicker,
} from 'mui-rff';
import {
    Typography,
    Paper,
    Grid,
    Button,
    CssBaseline,
    MenuItem,
} from '@material-ui/core';
// Picker
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios'
import api from '../server/apiMiddleWare'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

let initial = {}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#5F6061",
        }
    },
    typography: {
        fontWeight: "600!important",
    }
});

export default class Booking extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            snackmsg: false,
            modal: false,
            formData: {
                booked: false,
                booking_details: {
                }
            },
            id: this.props.history.location.state.id
        }
    }

    tryr() {
        console.log("hiiii")
    }
    toggle = () => {
        let val = !this.state.modal
        this.setState({
            modal: val
        });
    }
    setInitial(){
        console.log("getting props", this.props)
        let booking = {}
        booking = this.props.location.state.booking_details
        initial.name = booking.name
        initial.phone = booking.phone
        console.log("Booking", booking)        
    }
    componentDidMount(){
        this.setInitial();
    }
    handleClose() {
        this.setState({ snackmsg: false })
    };
    onSubmit = async values => {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(300);
        var dater = values.return_date.getDate();
        var monthr = values.return_date.getMonth() + 1;
        var yearr = values.return_date.getFullYear();
        var rdateStr = dater + "/" + monthr + "/" + yearr;

        var datei = values.issue_date.getDate();
        var monthi = values.issue_date.getMonth() + 1;
        var yeari = values.issue_date.getFullYear();
        var idateStr = datei + "/" + monthi + "/" + yeari;


        // rDate = rDate.slice(0,12);
        values.return_date = rdateStr
        values.issue_date = idateStr
        // window.alert(JSON.stringify(values, 0, 2));

        console.log("FormData", values)

        let formData = this.state.formData;

        formData.booked = true;
        formData.booking_details = values

        let id = this.props.location.state._id
        await axios
        .put(api.URL + "cars/" + id, formData)
        .then((res) => {
            console.log("After Submit", res);
            this.setState({
                modal: true,
                formData
            })
        })
        .catch((err) =>{
            console.log("Error on Submission:", err)
            this.setState({
                snackmsg: true
            })
        })
        // console.log("SubmitData", this.state.formData)
    };

    handleChange = (e, values) => {
        let params = [e.target.name]
        values.params = e.target.value
    };

    render() {
        // this.setInitial()
        console.log(this.props)

        const validate = values => {
            const errors = {};
            if (!values.name) {
                errors.name = 'Required: Please enter your Full Name!';
            }
            if (!values.phone) {
                errors.phone = 'Required: Please enter your Mobile Number!';
            }
            if (!values.issue_date) {
                errors.issue_date = 'Required';
            }
            if (!values.return_date) {
                errors.return_date = 'Required';
            }
            if (values.return_date < values.issue_date) {
                errors.return_date = "Return Date can't be less than Issue Date!"
            }

            return errors;
        };

        const formFields = [
            {
                size: 6,
                field: (
                    <TextField
                        label="Name"
                        name="name"
                        margin="none"
                        defaultValue={this.state.name}
                        required={true}
                        InputLabelProps={{
                            style: {
                                fontWeight: 600
                            }
                        }}
                    />
                ),
            },
            {
                size: 6,
                field: (
                    <TextField
                        label="Contact Number"
                        name="phone"
                        margin="none"
                        required={true}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                        inputProps={{
                            maxLength: 10,
                            minLength: 10
                        }}
                        min={10}
                        InputLabelProps={{
                            style: {
                                fontWeight: 600
                            }
                        }}
                    />
                ),
            },
            {
                size: 6,
                field: (
                    <DatePicker
                        name="issue_date"
                        margin="normal"
                        label="Issue Date"
                        required={true}
                        dateFunsUtils={DateFnsUtils}
                        InputLabelProps={{
                            style: {
                                fontWeight: 600
                            }
                        }}
                    />
                ),
            },
            {
                size: 6,
                field: (
                    <DatePicker
                        name="return_date"
                        margin="normal"
                        label="Return Date"
                        required={true}
                        dateFunsUtils={DateFnsUtils}
                        InputLabelProps={{
                            style: {
                                fontWeight: 600
                            }
                        }}
                    />
                ),
            },
        ];

        return (
            <ThemeProvider theme={theme}>
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered>
                        <MDBModalBody>
                            <div className="row">
                                <img src={modalbg}
                                    width="40%"
                                ></img>
                                <div className="card-b" style={{ margin: "20px", }}>
                                    <div style={{ marginBottom: "10px" }}>
                                        <h4 style={{ fontWeight: "600", marginBottom: "20px" }}>
                                            Booking Confirmed !
                                    </h4>
                                        <span style={{ fontSize: "12px" }}>
                                            You have booked&nbsp; &nbsp;
                                        </span>
                                        <span style={{ fontSize: "12px", fontWeight: 600 }}>
                                            {this.props.history.location.state.name}&nbsp; &nbsp;
                                        </span>
                                        <br />
                                        <span style={{ fontSize: "12px" }}>
                                            for the duration&nbsp; &nbsp; &nbsp;
                                        </span>
                                        <span style={{ fontSize: "12px", fontWeight: 600, }}>
                                            {this.state.formData.booking_details.issue_date}&nbsp;- &nbsp;
                                        {this.state.formData.booking_details.return_date}
                                        </span>
                                    </div>
                                    <Link to={{
                                        pathname: '/car-web/',
                                        id: this.state.id
                                    }}>
                                        <button type="button" className="btn btn-light"
                                            style={{
                                                float: "right",
                                            }}>
                                            <span style={{ fontWeight: 600 }}>
                                                Continue
                                </span>
                                        </button>
                                    </Link>

                                </div>

                            </div>
                        </MDBModalBody>
                        {/* <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                            <MDBBtn color="primary">Save changes</MDBBtn>
                        </MDBModalFooter> */}
                    </MDBModal>
                </MDBContainer>
                <Snackbar open={this.state.snackmsg} autoHideDuration={2000} onClose={this.handleClose.bind(this)}>
                    <Alert onClose={this.handleClose.bind(this)} severity="error">
                        An error occurred while booking. Please try again later! 
                    </Alert>
                </Snackbar>

                <div className="page-container">
                    <div className="row">
                        <img src={bg1} width="36.8%"></img>
                        <div className="col-md-7" style={{ marginTop: "70px" }}>
                            <div className="row" style={{ padding: "20px" }}>
                                <div className="col-md-10">
                                    <h2 style={{ fontWeight: 600, fontSize: "20px" }}>
                                        Booking Details
                                </h2>
                                </div>
                                <div className="col-md-2">
                                    <img
                                        src={img}
                                        width="110%"
                                        style={{ border: "0px!important" }}
                                    />
                                </div>
                            </div>
                            <Form
                                initialValues= {{
                                    name: initial.name,
                                    phone: initial.phone
                                }}
                                onSubmit={this.onSubmit}
                                validate={validate}
                                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                                    <form onSubmit={handleSubmit} noValidate>
                                        <Grid container alignItems="flex-start" spacing={2}>
                                            {formFields.map((item, idx) => (
                                                <Grid item xs={item.size} key={idx}>
                                                    {item.field}
                                                </Grid>
                                            ))}
                                            <Grid
                                                justify="space-between"
                                                container
                                            >
                                                <Grid item style={{ marginTop: 16 }}>
                                                    <Link to='/car-web/'>
                                                        <Button variant="outlined" color="primary"
                                                            style={{
                                                                borderRadius: "20x",
                                                                border: "none"
                                                            }}>
                                                            Back
                                            </Button>
                                                    </Link>
                                                </Grid>
                                                <Grid item style={{ marginTop: 16 }}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        type="submit"
                                                        disabled={submitting}
                                                        style={{
                                                            padding: "10px 30px 10px 30px",
                                                            borderRadius: "2px"
                                                        }}
                                                    >
                                                        Book Car
                                            </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </form>
                                )}
                            />
                        </div>
                    </div>
                </div>

            </ThemeProvider>
        )
    }
}