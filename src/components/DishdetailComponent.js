// Display details of a selected dish
// Representational Component - Do not store state, no constructor

import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
          Modal, ModalHeader, ModalBody, Button, Label, Col, Row } from 'reactstrap';
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len); 
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({ dish }) {
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

function RenderComments({ comments }) {
  if (comments != null) {
    const comment = comments.map((comment) => {
      return (
        <div>
          <li key={comment.id}>{comment.comment}</li>
          <p>--{comment.author},&nbsp;
                {new Intl.DateTimeFormat('en-US', 
                                        { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)) )}</p>
        </div>
        
      )
    })
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">{comment}</ul>
        <CommmentForm />
      </div>
    );
  }
  else {
    return (
      <div></div>
    );
  }
}

class CommmentForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      isModalOpen: false
    };
    
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));

    // close the modal closing the alert
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
}

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-info" onClick={this.toggleModal}><span className="fa fa-pencil"></span>&nbsp;&nbsp;Submit Comment</button>
        
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                  <Label htmlFor="rating" md={12}>Rating</Label>
                  <Col md={12}>
                    <Control.select model=".rating" id="rating" name="rating" className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                    </Control.select>
                  </Col>
              </Row>
              <Row className="form-group">
                  <Label htmlFor="author" md={12}>Your Name</Label>
                  <Col md={12}>
                      <Control.text model=".author" id="author" className="form-control"
                              name="author" placeholder="Your Name"
                              validators={{
                                  required, 
                                  minLength: minLength(3),
                                  maxLength: maxLength(15)
                              }} />
                      <Errors className="text-danger" model=".author"
                              show="touched"
                              messages={{
                                  required: 'Required ',
                                  minLength: 'Must be greater than 2 characters ',
                                  maxLength: 'Must be 15 characters or less'
                              }}
                          />
                  </Col>
              </Row>
              <Row className="form-group">
                  <Label htmlFor="comment" md={12}>Comment</Label>
                  <Col md={12}>
                      <Control.textarea model=".comment" id="comment" 
                              className="form-control"
                              name="comment" rows="6"
                                />
                  </Col>
              </Row>
              <Row className="form-group">
                  <Col md={{size: 10}}>
                      <Button type="submit" color="primary">Submit</Button>
                  </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

const DishDetail = (props) => {
  
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  }
  else {
    return (
      <div></div>
    );
  }
  
}

export default DishDetail;
