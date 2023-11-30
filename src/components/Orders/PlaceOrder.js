import React, { Component } from "react";
import './PlaceOrder.css';

const url = 'http://3.17.216.66:4000/menuItem';
const purl = 'http://localhost:8000/orders';
class PlaceOrder extends Component {


    constructor(props) {
        super(props)
        window.scrollTo(0,0);
        this.state = {
            id: Math.floor(Math.random() * 10000),
            hotel_name: this.props.match.params.restoName,
            name: 'suraj',
            email: 'surajrkurer@gmail.com',
            cost: 0,
            phone: 8861624909,
            address: 'gokak 591307',
            menuItem: ''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    placeOrder = () => {
        let obj = this.state;
        obj.menuItem = sessionStorage.getItem('menu');
        console.log(obj);
        fetch(purl, {
            method: "POST",
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(this.props.history.push('/viewBooking'))
    }

    renderItem = (data) => {
        if (data) {
            return data.map(item => {
                return (
                    <div className="orderItem" key={item.menu_id}>
                        <img src={item.menu_image} alt={item.menu_name} />
                        <h3>{item.menu_name}</h3>
                        <h4> Rs.{item.menu_price}</h4>
                    </div>
                )
            })
        }
    }

    render() {
        return (
            <>
                <div className="container" style={{ marginTop: '2%' }}>
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h1>Your order for Restaurant {this.state.hotel_name}</h1>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                <input type="hidden" name="cost" value={this.state.cost} />
                                <input type="hidden" name="id" value={this.state.id} />
                                <input type="hidden" name="hotel_name" value={this.state.hotel_name} />
                                <div className="form-group col-md-6">
                                    <label>Name</label>
                                    <input className="form-control" name="name" value={this.state.name} onChange={this.handleChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Name</label>
                                    <input className="form-control" name="email" value={this.state.email} onChange={this.handleChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Name</label>
                                    <input className="form-control" name="phone" value={this.state.phone} onChange={this.handleChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Name</label>
                                    <input className="form-control" name="address" value={this.state.address} onChange={this.handleChange} />
                                </div>
                                {this.renderItem(this.state.menuItem)}
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2>Total Price is Rs.{this.state.cost}</h2>
                                    </div>
                                </div>
                                <button className="btn btn-success" onClick={this.placeOrder}>
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }

    //api calling
    componentDidMount() {
        let menuItems = sessionStorage.getItem('menu');
        let orderId = [];
        menuItems.split(',').map(item => {
            orderId.push(parseInt(item));
            return 'ok';
        })
        fetch(url, {
            method: "POST",
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderId)
        })
            .then(res => res.json())
            .then(data => {
                let totalPrice = 0;
                data.map(item => {
                    totalPrice += parseFloat(item.menu_price);
                    return 'ok';
                })
                this.setState({ cost: totalPrice, menuItem: data })
                console.log(data, this.state.cost);
            })
    }
}

export default PlaceOrder;