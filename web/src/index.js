import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from 'components/App/AppContainer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppContainer />, document.getElementById('root'));
registerServiceWorker();
