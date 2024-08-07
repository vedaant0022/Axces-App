/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import FlashMessage from 'react-native-flash-message';

const Main = () => {
    return (
      <Provider store={store}>
        <App/>
        <FlashMessage/>
      </Provider>
    );
  };

AppRegistry.registerComponent(appName, () => Main);
