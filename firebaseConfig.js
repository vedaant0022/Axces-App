
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyDA4seYd9zx2gRjfTT5hYjGbk3xKNRyZ_4',
    appId: '1:367804998297:android:5937a2d29789ad8cdf0e08',
    messagingSenderId: 'Your Sender Id',
    projectId: 'aaxcess-app-new',
}

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app()
}

export default firebase;
