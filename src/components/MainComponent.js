// Container Component, responsible for the state of the application
// not rendering views - no need import css

import React, { Component } from 'react';
import Header from './HeaderComponent.js';
import Home from './HomeComponent.js';
import Menu from './MenuComponent.js';
import DishDetail from './DishdetailComponent.js';
import About from './AboutComponent.js';
import Contact from './ContactComponent.js';
import Footer from './FooterComponent.js';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; // connect component with redux store

// map redux store's state into props, make available to component
const mapStateToProps = state => {  // state: from redux store
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}

class Main extends Component {

  // return the corresponding view for the component 
  render() {
    
    // functional component
    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.filter(
                (dish) => dish.featured )[0] }
              promotion={this.props.promotions.filter(
                (promo) => promo.featured )[0] }
              leader={this.props.leaders.filter(
                (leader) => leader.featured )[0] }
          />
      );
    }

    const DishWithId = ({ match }) => {
      return (
        // parseInt(string, base): convert string to integer
        <DishDetail dish={this.props.dishes.filter(
                            (dish) => dish.id === parseInt(match.params.dishId, 10))[0] } 
                    comments={this.props.comments.filter(
                            (comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          /> 
      );
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} /> } />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

// withRouter: connect component to React Router
// connect(): generates a wrapper "container" component that subscribes to the store
export default withRouter(connect(mapStateToProps)(Main));
