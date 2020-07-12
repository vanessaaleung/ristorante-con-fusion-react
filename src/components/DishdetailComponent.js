// Display details of a selected dish
import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
  constructor(props) {
    super(props);

  }

  renderDish(dish) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }

  renderComments(comments) {
    if (comments != null) {
      const comment = comments.map((comment) => {
        return (
          <div>
            <li key={comment.id}>{comment.comment}</li>
            <p>--{comment.author}, {new Date(comment.date).toDateString()}</p>
          </div>
          
        )
      })
      return (
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          <ul className="list-unstyled">{comment}</ul>
        </div>
      );
    }
    else {
      return (
        <div></div>
      );
    }
  }

  render() {
    if (this.props.dish != null) {
      return (
        <div className="row">
          {this.renderDish(this.props.dish)}
          {this.renderComments(this.props.dish.comments)}
        </div>
      );
    }
    else {
      return (
        <div></div>
      );
    }
    
  }
}

export default DishDetail;
