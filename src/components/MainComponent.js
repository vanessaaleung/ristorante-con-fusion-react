// Container Component, responsible for the state of the application
// not rendering views - no need import css

import React, { Component } from 'react';
import Header from './HeaderComponent.js';
import Home from './HomeComponent.js';
import Menu from './MenuComponent.js';
import DishDetail from './DishdetailComponent.js';
import Contact from './ContactComponent.js';
import Footer from './FooterComponent.js';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  
  // Will invoke when the component is created
  constructor(props) {
    super(props);  // supply the props to the super class
    
    this.state = {  // stores properties the component can make use of
      dishes: DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS
    };
  }

  // return the corresponding view for the component 
  render() {
    
    // functional component
    const HomePage = () => {
      return (
        <Home dish={this.state.dishes.filter(
                (dish) => dish.featured )[0] }
              promotion={this.state.promotions.filter(
                (promo) => promo.featured )[0] }
              leader={this.state.leaders.filter(
                (leader) => leader.featured )[0] }
              />
      );
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} /> } />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
