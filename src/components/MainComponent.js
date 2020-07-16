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
import { addComment, fetchDishes } from '../redux/ActionCreators'; // obtain action object
import { actions } from 'react-redux-form';

// map redux store's state into props, make available to component
const mapStateToProps = state => {  // state: from redux store
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
};

// dispatch the action
const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => 
        dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) }
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes(); // fetch dishes and load to the redux store
  }

  // return the corresponding view for the component 
  render() {
    
    // functional component
    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.dishes.filter(
                (dish) => dish.featured )[0] }
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
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
        <DishDetail dish={this.props.dishes.dishes.filter(
                            (dish) => dish.id === parseInt(match.params.dishId, 10))[0] } 
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.filter(
                            (comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    addComment={this.props.addComment}
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
          <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} /> } />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

// withRouter: connect component to React Router
// connect(): generates a wrapper "container" component that subscribes to the store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
