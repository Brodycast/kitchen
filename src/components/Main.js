require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import firebase from 'firebase';


const config = {
  apiKey: 'AIzaSyC0S74m9BXbVPYRjOUZXmwZneecdFJuhCc',
  authDomain: 'brodycast.firebaseapp.com',
  databaseURL: 'https://brodycast.firebaseio.com',
  storageBucket: 'brodycast.appspot.com'
};
firebase.initializeApp(config);

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
            <div>
                {order}
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
