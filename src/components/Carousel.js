import React from "react";
import RBCarousel from "react-bootstrap-carousel";
import { Row, Col, Button, ButtonGroup } from "./bootstrap-component";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

const styles = { height: 400, width: "100%" };
const icon_glass = <span className="fa fa-glass" />;
const icon_music = <span className="fa fa-music" />;

export default class Carousel extends React.PureComponent {
    constructor(props) {
        super(props);
        this.slider = React.createRef();
        this.state = {
            autoplay: true,
        };
    }
    _onSelect = (active, direction) => {
        // console.log(`active=${active} && direction=${direction}`);
    };
    _visiableOnSelect = (active) => {
        // console.log(`visiable onSelect active=${active}`);
    };
    _slideNext = () => {
        this.slider.current.slideNext();
    };
    _slidePrev = () => {
        this.slider.current.slidePrev();
    };
    _goToSlide = () => {
        this.slider.current.goToSlide(1);
    };
    _autoplay = () => {
        this.setState({ autoplay: !this.state.autoplay });
    };
    _changeIcon = () => {
        let { leftIcon, rightIcon } = this.state;
        leftIcon = leftIcon ? undefined : icon_glass;
        rightIcon = rightIcon ? undefined : icon_music;
        this.setState({ leftIcon, rightIcon });
    };
    render() {
        return (
            <div className="container-fluid">
                    <Col >
                        <RBCarousel
                            animation={true}
                            autoplay={this.state.autoplay}
                            slideshowSpeed={2000}
                            defaultActiveIndex={0}
                            leftIcon={this.state.leftIcon}
                            rightIcon={this.state.rightIcon}
                            onSelect={this._onSelect}
                            ref={this.slider}
                            version={4}
                        >
                            <div style={{ height: 300, width: "100%" }}>
                                <img
                                    style={{ width: "100%", height: "300px" }}
                                    src={this.props.img1}
                                />
                                <div className="carousel-caption"></div>
                            </div>
                            <div>
                                <img
                                    style={{ width: "100%", height: "300px" }}
                                    src={this.props.img2}
                                />
                                {/* <div className="carousel-caption"></div> */}
                            </div>
                            <div>
                                <img
                                    style={{ width: "100%", height: "300px" }}
                                    src={this.props.img3}
                                />
                                {/* <div className="carousel-caption"></div> */}
                            </div>
                        </RBCarousel>
                    </Col>
            </div>
        );
    }
}
