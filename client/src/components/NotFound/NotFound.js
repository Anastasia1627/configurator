import React, { Component } from 'react';
import './NotFound.css';
import image from './not_found.png';

export default class Notfound extends Component {
    render() {
        return (
            <div className="Notfound_div">
                <h1 className="Notfound_header">
                    The requested URL was not found on this server.
                </h1>
                <img className="Notfound_img" src={image} alt="" />
                <a className="Notfound_home" href="/">Go to the home page</a>
            </div>
        );
    }
}
