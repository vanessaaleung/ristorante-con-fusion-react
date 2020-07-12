// Container Component
// not rendering views - no need import css
// responsible for everything related to the state off the application

import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent.js';
import DishDetail from './DishdetailComponent.js';
import { DISHES } from '../shared/dishes';

class Main extends Component {
  
  // Will invoke when the component is created
  constructor(props) {
    super(props);  // supply the props to the super class
    
    this.state = {  // stores properties the component can make use of
      dishes: DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dishId) {
    this.setState({
      selectedDish: dishId
    });
  }

  // return the corresponding view for the component 
  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes}
              onClick={(dishId) => this.onDishSelect(dishId)}/>
        <DishDetail 
            dish={this.state.dishes.filter(
                (dish) => dish.id === this.state.selectedDish )[0] } // [0]: select the first in the array
        />
      </div>
    );
  }
}

export default Main;
