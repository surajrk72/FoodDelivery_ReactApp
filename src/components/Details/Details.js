import React, { Component } from "react";
import './Details.css';
import axios from "axios";
import {Link} from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MenuDetails from './MenuDetails';
const { REACT_APP_BASE_URL } = process.env;


class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: '',
            mealId:sessionStorage.getItem('mealId')?sessionStorage.getItem('mealId'):1,
            menuDetails:'',
            userItem:''
        }
    }


    proceed = ()=>{
        sessionStorage.setItem('menu',this.state.userItem);
        this.props.history.push(`/placeOrder/${this.state.details.restaurant_name}`);
    }

    addToCart = (data) =>{
        this.setState({userItem:data});
    }

    render() {
        let {details} = this.state;
        return (
            <>
                <div className='main'>
                    <div className='tileImage'>
                        <div className='imageClass'>
                            <img src={details.restaurant_thumb} alt="" />
                        </div>
                    </div>
                    <div className="tileContent">
                        <div className="content">
                            <h1>{details.restaurant_name}</h1>
                            <span id="cfeedback">231 Customers Rating Average</span>
                            <h3>Old Price <del>Rs. 450</del></h3>
                            <h3>Offer Price Rs. {details.cost}</h3>
                            <h3>Best Taste of Fresh Chai with Samosa At your Door or DineIn</h3>
                            <div>
                                <div className="icons">
                                    <img src="https://i.ibb.co/wJvrhYg/veg.png" alt="" />
                                </div>
                                <div className="icons">
                                    <img src="https://i.ibb.co/mD3jpgc/sentizied.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Tabs>
                        <TabList>
                            <Tab>About</Tab>
                            <Tab>Contact</Tab>
                        </TabList>

                        <TabPanel>
                            <h2>{details.restaurant_name}</h2>
                            <p>{details.restaurant_name}  is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </p>
                        </TabPanel>
                        <TabPanel>
                            <h2>{details.address}</h2>
                            <h3>Contact: {details.contact_number}</h3>
                        </TabPanel>
                    </Tabs>
                    <Link to={`/listing/${this.state.mealId}`} onClick={()=>window.scrollTo(0,0)} className="btn btn-danger">
                        Back
                    </Link> &nbsp;
                    <button className='btn btn-success' onClick={this.proceed}>
                        Proceed
                    </button>
                    <div className='col-md-12'>
                        <center><h2>Menu</h2></center>
                        {/* we are sending menudetails to print and taking selected menu items  */}
                        <MenuDetails menudata={this.state.menuDetails}
                        finalOrder={(data) => this.addToCart(data)}/>
                    </div>
                </div>
            </>
        )


    }

    // componentDidMount(){
    //     let id = this.props.location.search.split('=')[1];
    //     console.log(id);
    //     axios.get(`${REACT_APP_BASE_URL}details/${id}`)
    //     .then(res=> {
    //         this.setState({details:res.data});
    //     })
    // }

    async componentDidMount() {
        let id = this.props.location.search.split('=')[1];
        let fetch = await axios.get(`${REACT_APP_BASE_URL}details/${id}`);
        let menu = await axios.get(`${REACT_APP_BASE_URL}menu/${id}`);
        this.setState({ details: fetch.data[0] });
        this.setState({menuDetails:menu.data});


    }
}
export default Details;