import axios from "axios";
import React, { Component } from "react";
const {REACT_APP_FILTER_URL} = process.env;
class CuisineFilter extends Component {


    cusineFilter = (event) =>{
        let mealId = this.props.mealId;
        let cuisineId = event.target.value;
        let cusineUrl = '';
        if(cuisineId==''){
            cusineUrl = `${REACT_APP_FILTER_URL}${mealId}`;
            
        }else{
            cusineUrl = `${REACT_APP_FILTER_URL}${mealId}?cuisine=${cuisineId}`;
           
        }
        axios.get(cusineUrl)
        .then( res => this.props.restPerCusine(res.data))
    }

    render() {
        return (
            <>
                <div className="container" style={{ marginLeft: "15%" }}>
                    <h5>Cuisine Filter</h5>
                </div>


                <div className="container" style={{ marginLeft: "15%" }} onChange={this.cusineFilter}>

                    <label className="radio">
                        <input defaultChecked type="radio" name="cuisine" value= '' />All
                    </label>

                    <label className="radio">
                        <input type="radio" name="cuisine" value="1" />North Indian
                    </label>

                    <label className="radio">
                        <input type="radio" name="cuisine" value="2" />South Indian
                    </label>

                    <label className="radio">
                        <input type="radio" name="cuisine" value="3" />Chinese
                    </label>

                    <label className="radio">
                        <input type="radio" name="cuisine" value="4" />Fast Food
                    </label>

                    <label className="radio">
                        <input type="radio" name="cuisine" value="5" />Street Food
                    </label>
                </div>
            </>
        )
    }
}
export default CuisineFilter;