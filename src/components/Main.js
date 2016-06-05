require('normalize.css/normalize.css');
require('styles/App.css');
require('flexboxgrid');

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
        let order = child.val();
        order.key = child.key;
        _orders.push(order);
      });
      this.setState({
        orders: _orders
      });
    });
  }

  handleFinishOrder(key) {
    console.log(key);
    let orderRef = firebase.database().ref(`order/${key}`);
    orderRef.update({ status: 'completed' });
  }

  componentDidMount() {
    this.listenForOrder(this.orderRef);
  }

  render() {
    return (
      <div className="index">
        <div className="row last-used">
          { this.state.orders
            .filter((order) => order.status === 'completed')
            .filter((order, index, orders) => index === orders.length -1)
            .map((order) => {
          return (
            <div className="row order"
              onClick={ this.handleFinishOrder.bind(this, order.key) }
              key={ order.key }>
              <div className="col-lg-1 col-lg-offset-2">
                <img src={ order.photo } alt={ order.description } />
              </div>
              <div className="col-lg-4">
                <div>PEDIDO ATUAL</div>
                <div className="description">{ order.description }</div>
                <div>PARA</div>
                <div className="usename">{ order.username }</div>
              </div>
              <div className="col-lg-1">
                <img src={ order.userphoto } alt={ order.username } />
              </div>
            </div>
          );
        }) }
        </div>
        { this.state.orders
          .filter((order) => order.status === 'ordered' )
          .map((order) => {
          return (
            <div className="row order"
              onClick={ this.handleFinishOrder.bind(this, order.key) }
              key={ order.key }>
              <div className="col-lg-1 col-lg-offset-2">
                <img src={ order.photo } alt={ order.description } />
              </div>
              <div className="col-lg-4">
                <span className="description">{ order.description }</span>
              </div>
              <div className="col-lg-2">
                <span className="usename">{ order.username }</span>
              </div>
              <div className="col-lg-1">
                <img className="userphoto" src={ order.userphoto } alt={ order.username } />
              </div>
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
