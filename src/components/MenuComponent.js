// Add a Menu Class Component
import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Menu extends Component {
  
  // Will invoke when the component is created
  constructor(props) {
    super(props); // supply the props to the super class
    
    this.state = { // stores properties the component can make use of
      selectedDish: null
    }
    console.log('Menu Component constructor is invoked');
  }

  componentDidMount() {
    console.log('Menu Component componentDidMount is invoked');
  }

  onDishSelect(dish) {
    this.setState({
      selectedDish: dish
    });
  }

  renderDish(dish) {
    if (dish != null) {
      return (
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    }
    else {
      return (
        <div></div>
      );
    }
  }

  // return the corresponding view for the component 
  render() {
    
    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
          <Card onClick={() => this.onDishSelect(dish)}>
              <CardImg width="100%" src={dish.image} alt={dish.name} />
              <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
              </CardImgOverlay>
          </Card>
        </div>
      );
    });

    console.log('Menu Component render is invoked');

    return (
      <div className="container">
        <div className="row">
          {menu}
        </div>
        <div className="row">
          {this.renderDish(this.state.selectedDish)}
        </div>
      </div>
    );
  }
}

export default Menu;