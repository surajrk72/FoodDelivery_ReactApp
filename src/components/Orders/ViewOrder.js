import axios from "axios";
import React,{Component} from "react";
import DisplayOrder from "./DisplayOrder";
const purl = 'http://localhost:8000/orders';

class ViewOrder extends Component{

    constructor(){
        super();
        window.scrollTo(0,0);
        this.state={
            orders:''
        }
    }

    render(){
        return(
            <>
               <DisplayOrder orderData = {this.state.orders}/> 
            </>
        )
    }

    componentDidMount(){
        axios.get(purl).then(res=>this.setState({orders:res.data}));
    }
}

export default ViewOrder;