import { createMuiTheme } from '@material-ui/core/styles';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Form } from 'react-final-form';
import bg1 from '../components/assets/bg1.JPG'
import img from '../components/assets/logo.PNG'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import modalbg from '../components/assets/modalbg.JPG'
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


const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required: Please enter your Full Name!';
    }
    if (!values.contact) {
        errors.contact = 'Required: Please enter your Mobile Number!';
    }
    if (!values.issueDate) {
        errors.issueDate = 'Required';
    }
    if (!values.returnDate) {
        errors.returnDate = 'Required';
    }
    if (values.returnDate < values.issueDate) {
        errors.returnDate = "Return Date can't be less than Issue Date!"
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
                name="contact"
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
                name="issueDate"
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
                name="returnDate"
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

export default class Booking extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            formData: {},
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
    onSubmit = async values => {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(300);
        var dater = values.returnDate.getDate();
        var monthr = values.returnDate.getMonth() + 1;
        var yearr = values.returnDate.getFullYear();
        var rdateStr = dater + "/" + monthr + "/" + yearr;

        var datei = values.issueDate.getDate();
        var monthi = values.issueDate.getMonth() + 1;
        var yeari = values.issueDate.getFullYear();
        var idateStr = datei + "/" + monthi + "/" + yeari;


        // rDate = rDate.slice(0,12);
        values.returnDate = rdateStr
        values.issueDate = idateStr
        // window.alert(JSON.stringify(values, 0, 2));

        this.setState({
            modal: true,
            formData: values
        })
    };
    render() {
        console.log(this.props)
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
                                            {console.log("daaa", this.state.formData)}
                                            {this.state.formData.issueDate}&nbsp;- &nbsp;
                                        {this.state.formData.returnDate}
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