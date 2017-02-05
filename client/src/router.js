import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import PhotoDisplay from './js/components/PhotoDisplay';

// Components
import App from './js/components/App';

const Routes = () => {
  return <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={PhotoDisplay} />
    </Route>
  </Router>;
};

export default Routes;
