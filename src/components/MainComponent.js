// Container Component, responsible for the state of the application
// not rendering views - no need import css

import React, { Component } from 'react';
import Header from './HeaderComponent.js';
import Home from './HomeComponent.js';
import Menu from './MenuComponent.js';
import DishDetail from './DishdetailComponent.js';
import Footer from './FooterComponent.js';
import { DISHES } from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  
  // Will invoke when the component is created
  constructor(props) {
    super(props);  // supply the props to the super class
    
    this.state = {  // stores properties the component can make use of
      dishes: DISHES,
    };
  }

  // return the corresponding view for the component 
  render() {
    
    const HomePage = () => {
      return (
        <Home />
      );
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} /> } />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
