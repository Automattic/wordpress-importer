/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import './store';
import InputScreen from './input-screen';
import AuthorMapping from './author-mapping';
import ImportComplete from './import-complete';
import StepRedirect from './step-redirect';

class App extends PureComponent {
	render() {
		console.log( this.props.importStep );
		const step = this.props.importStep

		return (
			<Router>
				<Switch>
					<div>
						<Link to="/">/</Link><br />
						<Link to="/map">/map</Link><br />
						<Link to="/complete">/complete</Link><br />
						<Route exact path="/" component={ InputScreen } />
						<Route path="/map" render={ props => console.log( step >= 2, "/map" ) || step >= 2 ? <AuthorMapping { ...props }/> : <Redirect to="/" /> } />
						<Route path="/complete" render={ props => console.log( step >= 3, "/complete" ) || step >= 3 ? <ImportComplete { ...props }/> : <Redirect to="/map" /> } />
						<Redirect from="*" to="/" />
					</div>
				</Switch>
			</Router>
		);
	}
}

// export default App;

export default withSelect(
	select => ( {
		importStep: select( 'wordpress-importer' ).getImportStep(),
	} )
)( App );