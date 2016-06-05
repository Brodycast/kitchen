import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyC0S74m9BXbVPYRjOUZXmwZneecdFJuhCc',
  authDomain: 'brodycast.firebaseapp.com',
  databaseURL: 'https://brodycast.firebaseio.com',
  storageBucket: 'brodycast.appspot.com'
};
firebase.initializeApp(config);

export default firebase;
