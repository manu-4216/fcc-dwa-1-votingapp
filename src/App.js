var React = require('react');
var ReactDOM = require('react-dom');
var PollListContainer = require('./pollList/containers/PollListContainer');

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';


const App = () => (
  <MuiThemeProvider>
    <MyAwesomeReactComponent />
  </MuiThemeProvider>
);

const MyAwesomeReactComponent = () => (
  <RaisedButton label="Default" />
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);



/*
ReactDOM.render(
    <PollListContainer />,
	  document.getElementById('app')
);
*/