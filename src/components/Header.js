import React from "react";
import './Header.css';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <header>
                <div id="brand">
                    DEVELOPER FUNNEL &nbsp; <Link to='/' className="btn btn-default" onClick={()=>window.scrollTo(0,0)}>Home</Link>
                </div>
                <div id="social">
                    <Link to='/' className="btn btn-success">
                        <span className="glyphicon glyphicon-log-in"></span>Log in
                    </Link>  &nbsp;

                    <Link to='/' className="btn btn-danger">
                        <span className="glyphicon glyphicon-user"></span>Log out
                    </Link>

                </div>
            </header>
        </>
    )
}

export default Header;