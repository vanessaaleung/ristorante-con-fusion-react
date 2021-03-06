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
import { postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators'; // obtain action object
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// map redux store's state into props, make available to component
const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
};

// dispatch the action
const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => 
        dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => 
        dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchComments: () => { dispatch(fetchComments()) },
  fetchPromos: () => { dispatch(fetchPromos()) },
  fetchLeaders: () => { dispatch(fetchLeaders()) }
});

class Main extends Component {

  // fetch info and load to the redux store
  componentDidMount() {
    this.props.fetchDishes(); 
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
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
              promotion={this.props.promotions.promotions.filter(
                (promo) => promo.featured )[0] }
              promosLoading={this.props.promotions.isLoading}
              promosErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter(
                (leader) => leader.featured )[0] }
              leadersLoading={this.props.leaders.isLoading}
              leadersErrMess={this.props.leaders.errMess}
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
                    comments={this.props.comments.comments.filter(
                            (comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
          /> 
      );
    }

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} /> } />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}
                                                                  isLoading={this.props.leaders.isLoading}
                                                                  errMess={this.props.leaders.errMess} />} />
              <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}
                                                                        postFeedback={this.props.postFeedback} /> } />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

// withRouter: connect component to React Router
// connect(): generates a wrapper "container" component that subscribes to the store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
