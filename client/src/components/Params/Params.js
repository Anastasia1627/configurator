import React, { Component } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import './Params.css';


export default class Params extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     username: '',
        //     password: '',
        // };
        //
        // this.handleInputChange = this.handleInputChange.bind(this);
        this.show = this.show.bind(this);
    }
    // handleInputChange(event) {
    //     const value = event.target.value;
    //     const name = event.target.name;
    //
    //     this.setState({
    //         [name]: value,
    //     });
    // }

    show(){
        const parameters = require('./parameters');

        parameters.params.forEach(param => {
            console.log(param.path);
        })

    }


    render() {
        return (
            <button onClick={this.show}>Show Params</button>
        );
    }
}
