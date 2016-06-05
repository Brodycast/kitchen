require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import firebase from '../database';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
    this.orderRef = firebase.database().ref('order');
  }

  listenForOrder(orderRef) {
    orderRef.on('value', (snap) => {
      let _orders = [];
      snap.forEach((child) => {
        _orders.push(child.val());
      });
      this.setState({
        orders: _orders
      });
    });
  }

  componentDidMount() {
    this.listenForOrder(this.orderRef);
  }

  render() {
    return (
      <div className="index">
        { this.state.orders.map(order => {
          return (
            <div className="order" key={ order.datetime }>
              <img src={ order.photo } alt={ order.description } />
              <span className="description">{ order.description }</span>
              <span className="usename">{ order.username }</span>
              <img src={ order.userphoto } alt={ order.username } />
              </div>
          );
        }) }
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
