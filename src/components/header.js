import React from 'react';
import img from './assets/logo.PNG';

function Header() {
    return (
        <div className="text-center" style={{marginBottom: "100px"}}>
            <img
                src={img}
                width="15%"
                height="15%"
                className="img-header"
                style={{border: "0px!important"}}
            />
        </div>
    );
}

export default Header;

