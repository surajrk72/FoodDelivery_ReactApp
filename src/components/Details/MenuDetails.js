import React, { Component } from "react";

class MenuDetails extends Component {

    oderId =[];

    placeOrder = (data) => {
        this.oderId.push(data);
        this.props.finalOrder(this.oderId);
       
    }

    removeOrder = (data) => {
        if(this.oderId.indexOf(data) > -1){
            this.oderId.splice(this.oderId.indexOf(data),1);
            this.props.finalOrder(this.oderId);
        }
    }

    renderCart = (orders) => {
        if(orders){
            return orders.map((item,index)=>{
                return(
                    <b  key={index}> {item} &nbsp;</b>
                )
            })
        }
    }

    renderMenu = ({ menudata }) => {
        if (menudata) {
            return menudata.sort((item1, item2) => {
                return item1.menu_id - item2.menu_id;
            }).map(item => {
                return (
                    <div key={item.menu_id}>
                        <div className="row">
                            <div className="col-md-7">
                                <b>{`${item.menu_id})`}</b> &nbsp;
                                <img src={item.menu_image} width='80px' height='80px' />
                                &nbsp;
                                {item.menu_name} &nbsp;
                                Rs.{item.menu_price}

                            </div>
                            <div className="col-md-4">
                                <button style={{ marginRight: "3px" }} className="btn btn-success"
                                onClick={()=>{this.placeOrder(item.menu_id)}}>
                                    <span className="glyphicon glyphicon-plus"></span>
                                </button>
                                <button style={{ marginRight: "3px" }} className="btn btn-danger"
                                 onClick={()=>{this.removeOrder(item.menu_id)}}>
                                    <span className="glyphicon glyphicon-minus"></span>
                                </button>
                            </div>

                        </div>
                    </div>
                )
            })
        }
    }

    render() {
        // console.log('menudetails',this.state.menuDetails);
        return (
            <div>
                <div className="col-md-12 bg-success">
                    <h2>Item Added</h2>
                    <h3>Item number{this.renderCart(this.oderId)} added</h3>
                </div>
                <div className="col-md-12 bg-info">
                    {this.renderMenu(this.props)}
                </div>
            </div>
        )
    }


}

export default MenuDetails;