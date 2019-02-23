/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

/**
 * Internal dependencies
 */
import './store';
import InputScreen from './input-screen';
import AuthorMapping from './author-mapping';
import ImportComplete from './import-complete';

class App extends PureComponent {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={ InputScreen } />
					<Route path="/map" component={ AuthorMapping } />
					<Route path="/complete" component={ ImportComplete } />
				</Switch>
			</Router>
		);
	}
}

export default App;
