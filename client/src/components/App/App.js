import React, { Component } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import './App.css';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };

        // this.handleInputChange = this.handleInputChange.bind(this);
        // this.submitToAuth = this.submitToAuth.bind(this);
    }

    // handleInputChange(event) {
    //     const value = event.target.value;
    //     const name = event.target.name;
    //
    //     this.setState({
    //         [name]: value,
    //     });
    // }

    // submitToAuth(event) {
    //     event.preventDefault();
    //     const history = this.props.history;
    //
    //     return fetch('/auth', {
    //         method: 'POST',
    //         body: JSON.stringify(this.state),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     }).then((res) => {
    //         if (res.status === 200) {
    //             res.json().then((data) => {
    //                 this.props.addUsername(data.username);
    //                 this.props.addEmail(data.email);
    //                 this.props.addID(data.id);
    //                 this.props.addAuthentication(true);
    //
    //                 history.push('/home');
    //             });
    //         } else if (res.status === 401) {
    //             this.props.addUsername('');
    //             this.props.addEmail('');
    //             this.props.addID('');
    //             this.props.addAuthentication(false);
    //
    //             toast.error('Your Username or Password are not correct. Try again', {
    //                 position: toast.POSITION.TOP_CENTER,
    //             });
    //         }
    //     });
    // }

    render() {
        return (
            <p>Home</p>
        );
    }
}
